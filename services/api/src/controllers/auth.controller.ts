import type { Request, Response } from "express";
import { prisma } from "../db/prisma";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/token";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const passwordHash = await argon2.hash(password);

    const user = await prisma.user.create({
      data: { firstName, lastName, email, password: passwordHash },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
      },
    });

    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({
        error: "Email already exists",
      });
    }
    console.error(error);
    return res.status(500).json({
      error: "Register failed",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(400).json({
        error: "Wrong credentials",
      });
    }

    const isValidPassword = await argon2.verify(user.password, password);
    if (!isValidPassword) {
      return res.status(400).json({
        error: "Wrong credentials",
      });
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Login failed",
    });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  try {
    const incomingToken = req.cookies?.refreshToken;
    if (!incomingToken) {
      return res.status(401).json({
        error: "Refresh token missing",
      });
    }

    const decoded = jwt.verify(
      incomingToken,
      process.env.REFRESH_TOKEN_SECRET as string,
    ) as jwt.JwtPayload;

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user || user.refreshToken !== incomingToken) {
      return res.status(401).json({
        error: "Invalid or expired refresh token",
      });
    }

    const accessToken = generateAccessToken(user.id);
    return res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    return res.status(401).json({
      error: "Invalid or expired refresh token",
    });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    await prisma.user.update({
      where: { id: req.user!.id },
      data: { refreshToken: null },
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Logout failed",
    });
  }
};

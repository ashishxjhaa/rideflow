import argon2 from "argon2";
import type { Request, Response } from "express";
import { prisma } from "../db/prisma";
import { generateAccessToken, generateRefreshToken } from "../utils/token";

export const registerCaptain = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      vehicleType,
      color,
      plate,
      seatCapacity,
    } = req.body;

    const passwordHash = await argon2.hash(password);

    const captain = await prisma.captain.create({
      data: {
        firstName,
        lastName,
        email,
        password: passwordHash,
        vehicleType,
        color,
        plate,
        seatCapacity,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        vehicleType: true,
        color: true,
        plate: true,
        seatCapacity: true,
      },
    });

    return res.status(201).json({
      success: true,
      data: captain,
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

export const loginCaptain = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const captain = await prisma.captain.findUnique({
      where: { email },
    });
    if (!captain) {
      return res.status(400).json({
        error: "Wrong credentials",
      });
    }

    const isValidPassword = await argon2.verify(captain.password, password);
    if (!isValidPassword) {
      return res.status(400).json({
        error: "Wrong credentials",
      });
    }

    const accessToken = generateAccessToken(captain.id, "CAPTAIN");
    const refreshToken = generateRefreshToken(captain.id, "CAPTAIN");

    await prisma.captain.update({
      where: { id: captain.id },
      data: { refreshToken },
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
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

export const getCaptainProfile = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      success: true,
      data: req.user?.account,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch captain profile",
    });
  }
};

import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../db/prisma";
import { generateAccessToken } from "../utils/token";

export const refresh = async (req: Request, res: Response) => {
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

    const account =
      decoded.role === "USER"
        ? await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, refreshToken: true },
          })
        : await prisma.captain.findUnique({
            where: { id: decoded.id },
            select: { id: true, refreshToken: true },
          });

    if (!account || account.refreshToken !== incomingToken) {
      return res.status(401).json({
        error: "Invalid or expired refresh token",
      });
    }

    const accessToken = generateAccessToken(account.id, decoded.role);

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

export const logout = async (req: Request, res: Response) => {
  try {
    if (req.user!.role === "USER") {
      await prisma.user.update({
        where: { id: req.user!.id },
        data: { refreshToken: null },
      });
    } else {
      await prisma.captain.update({
        where: { id: req.user!.id },
        data: { refreshToken: null },
      });
    }

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

import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../db/prisma";
import { captainSelect, userSelect } from "../utils/select";

export const verifyJWT = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      error: "Unauthorized request",
    });
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
    ) as jwt.JwtPayload;

    const account =
      decodedToken.role === "USER"
        ? await prisma.user.findUnique({
            where: { id: decodedToken.id },
            select: userSelect,
          })
        : await prisma.captain.findUnique({
            where: { id: decodedToken.id },
            select: captainSelect,
          });

    if (!account) {
      return res.status(401).json({
        error: "Invalid Access Token",
      });
    }

    req.user = {
      id: account.id,
      role: decodedToken.role,
      account,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid or expired access token",
    });
  }
};

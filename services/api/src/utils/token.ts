import type { Role } from "@rideflow/types";
import jwt, { type SignOptions } from "jsonwebtoken";

export const generateAccessToken = (id: string, role: Role) => {
  return jwt.sign(
    {
      id,
      role,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY as SignOptions["expiresIn"],
    },
  );
};

export const generateRefreshToken = (id: string, role: Role) => {
  return jwt.sign(
    {
      id,
      role,
    },
    process.env.REFRESH_TOKEN_SECRET as string,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY as SignOptions["expiresIn"],
    },
  );
};

import type { Request, Response } from "express";

export const getUserProfile = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch user profile",
    });
  }
};

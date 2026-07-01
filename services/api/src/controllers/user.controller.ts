import type { Request, Response } from "express";

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch user profile",
    });
  }
};

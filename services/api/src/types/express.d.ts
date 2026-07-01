declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        firstName: string;
        lastName: string | null;
        email: string;
        createdAt: Date;
      };
    }
  }
}
export {};

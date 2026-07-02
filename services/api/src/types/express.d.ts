import type { Prisma } from "@prisma/client";
import type { userSelect, captainSelect } from "../utils/select";

type SafeUser = Prisma.UserGetPayload<{ select: typeof userSelect }>;
type SafeCaptain = Prisma.CaptainGetPayload<{ select: typeof captainSelect }>;

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: "USER" | "CAPTAIN";
        account: SafeUser | SafeCaptain;
      };
    }
  }
}
export {};

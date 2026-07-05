import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route";
import captainRouter from "./routes/captain.route";
import sessionRouter from "./routes/session.route";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTED_URL,
    credentials: true,
  }),
);
app.use(cookieParser());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/captains", captainRouter);
app.use("/api/v1/session", sessionRouter);

export default app;

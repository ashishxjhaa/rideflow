import { z } from "zod";

const emailSchema = z.email("Email is required").trim().toLowerCase().max(255);

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(72);

const firstNameSchema = z
  .string()
  .trim()
  .min(1, "First name is required")
  .max(50);

const lastNameSchema = z.string().trim().max(50).optional();

export const registerUserSchema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const loginUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registerCaptainSchema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,

  email: emailSchema,
  password: passwordSchema,

  vehicleType: z.enum(["CAR", "MOTORCYCLE", "AUTO"], {
    error: "Vehicle type is required",
  }),

  color: z.string().trim().min(3, "Vehicle color is required").max(30),

  plate: z.string().trim().min(1, "Vehicle plate is required").max(20),

  seatCapacity: z
    .number()
    .int()
    .min(1, "Seat capacity must be at least 1")
    .max(8, "Seat capacity is invalid"),
});

export const loginCaptainSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

-- CreateEnum
CREATE TYPE "CaptainStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('CAR', 'MOTORCYCLE', 'AUTO');

-- CreateTable
CREATE TABLE "Captain" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" "CaptainStatus" NOT NULL DEFAULT 'INACTIVE',
    "vehicleType" "VehicleType" NOT NULL,
    "color" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "seatCapacity" INTEGER NOT NULL,
    "socketId" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Captain_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Captain_email_key" ON "Captain"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Captain_plate_key" ON "Captain"("plate");

-- CreateIndex
CREATE INDEX "Captain_status_idx" ON "Captain"("status");

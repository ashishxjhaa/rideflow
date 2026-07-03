"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { registerCaptainSchema } from "@rideflow/validation";

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [color, setColor] = useState("");
  const [plate, setPlate] = useState("");
  const [seatCapacity, setSeatCapacity] = useState(1);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = registerCaptainSchema.safeParse({
      firstName,
      lastName,
      email,
      password,
      vehicleType,
      color,
      plate,
      seatCapacity: Number(seatCapacity),
    });

    if (!result.success) {
      console.log(result.error.flatten().fieldErrors);
      return;
    }

    // api calls using axios
    // await axios.post("/api/v1/captains/register", result.data);

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleType("");
    setColor("");
    setPlate("");
    setSeatCapacity(1);
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <Image
          src="https://static.vecteezy.com/system/resources/previews/027/127/501/non_2x/uber-logo-uber-icon-transparent-free-png.png"
          alt="Uber Logo"
          height={100}
          width={100}
          className="w-16 mb-8.5"
        />
        <form onSubmit={handleSubmit}>
          <h3 className="text-lg font-medium mb-1.5">What's your name</h3>
          <div className="flex gap-2">
            <Input
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              required
              type="text"
              className="bg-[#eee] mb-5 h-10"
              placeholder="first name"
            />
            <Input
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              required
              type="text"
              className="bg-[#eee] mb-5 h-10"
              placeholder="last name"
            />
          </div>

          <h3 className="text-lg font-medium mb-1.5">What's your email</h3>
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            type="email"
            className="bg-[#eee] mb-5 h-10"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-1.5">Enter Password</h3>
          <Input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            type="password"
            className="bg-[#eee] mb-5 h-10"
            placeholder="password"
          />

          <h3 className="text-lg font-medium mb-1.5">Select vehicle type</h3>
          <Select
            value={vehicleType}
            onValueChange={(value) => setVehicleType(value)}
            required
          >
            <SelectTrigger className="bg-[#eee] mb-5 h-10 w-full">
              <SelectValue placeholder="Select vehicle" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="CAR">Car</SelectItem>
              <SelectItem value="MOTORCYCLE">Motorcycle</SelectItem>
              <SelectItem value="AUTO">Auto</SelectItem>
            </SelectContent>
          </Select>

          <h3 className="text-lg font-medium mb-1.5">Colour of vehicle</h3>
          <Input
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
            required
            type="text"
            className="bg-[#eee] mb-5 h-10"
            placeholder="white, black"
          />

          <h3 className="text-lg font-medium mb-1.5">Enter license plate</h3>
          <Input
            value={plate}
            onChange={(e) => {
              setPlate(e.target.value);
            }}
            required
            type="text"
            className="bg-[#eee] mb-5 h-10"
            placeholder="DL 01 AB 1234"
          />

          <h3 className="text-lg font-medium mb-1.5">Enter seat capacity</h3>
          <Input
            value={seatCapacity}
            onChange={(e) => {
              setSeatCapacity(Number(e.target.value));
            }}
            min={1}
            max={8}
            required
            type="number"
            className="bg-[#eee] mb-5 h-10"
            placeholder="Seat Capacity"
          />

          <Button className="w-full h-10 my-2 text-lg">Signup</Button>
        </form>

        <p className="text-center pt-0.5">
          Already have a account?{" "}
          <Link href="/captain-login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>

      <div className="mb-5">
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;

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
import { useRouter } from "next/navigation";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [color, setColor] = useState("");
  const [plate, setPlate] = useState("");
  const [seatCapacity, setSeatCapacity] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      const fieldErrors = result.error.flatten().fieldErrors;
      const firstError = Object.values(fieldErrors).flat()[0];
      toast.error(firstError);
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/captains/register`,
        result.data,
      );

      toast.success("Captain created successfully.");

      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setVehicleType("");
      setColor("");
      setPlate("");
      setSeatCapacity(1);

      router.push("/captain-login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-md md:max-w-lg mx-auto min-h-screen bg-white px-7 py-7 flex flex-col justify-between">
        <div>
          <Image
            src="https://static.vecteezy.com/system/resources/previews/027/127/501/non_2x/uber-logo-uber-icon-transparent-free-png.png"
            alt="Uber Logo"
            height={100}
            width={100}
            className="w-20 h-auto mb-8"
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
                className="bg-[#eee] mb-5 h-11 rounded-lg"
                placeholder="first name"
              />
              <Input
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                required
                type="text"
                className="bg-[#eee] mb-5 h-11 rounded-lg"
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
              className="bg-[#eee] mb-5 h-11 rounded-lg"
              placeholder="email@example.com"
            />

            <h3 className="text-lg font-medium mb-1.5">Enter Password</h3>
            <div className="relative mb-5">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type={showPassword ? "text" : "password"}
                className="bg-[#eee] h-11 rounded-lg pr-10"
                placeholder="password"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <h3 className="text-lg font-medium mb-1.5">Select vehicle type</h3>
            <Select
              value={vehicleType}
              onValueChange={(value) => setVehicleType(value)}
              required
            >
              <SelectTrigger className="bg-[#eee] mb-5 h-11 w-full rounded-lg">
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
              className="bg-[#eee] mb-5 h-11 rounded-lg"
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
              className="bg-[#eee] mb-5 h-11 rounded-lg"
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
              className="bg-[#eee] mb-5 h-11 rounded-lg"
              placeholder="Seat Capacity"
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 my-2 text-lg rounded-lg cursor-pointer"
            >
              {loading ? <Spinner /> : "Signup"}
            </Button>
          </form>

          <p className="text-center pt-0.5">
            Already have a account?{" "}
            <Link href="/captain-login" className="text-blue-600">
              Login here
            </Link>
          </p>
        </div>

        <div className="pb-4">
          <p className="text-[11px] text-gray-600 leading-relaxed">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;

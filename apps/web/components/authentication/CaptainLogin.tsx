"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";
import { useState } from "react";
import { loginCaptainSchema } from "@rideflow/validation";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = loginCaptainSchema.safeParse({
      email,
      password,
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/captains/login`,
        result.data,
      );

      toast.success("Login successfully.");

      setEmail("");
      setPassword("");

      router.push("/home");
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

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 my-2 text-lg rounded-lg cursor-pointer"
            >
              {loading ? <Spinner /> : "Login"}
            </Button>
          </form>

          <p className="text-center pt-0.5">
            Join a fleet?{" "}
            <Link href="/captain-signup" className="text-blue-600">
              Register as a Captain
            </Link>
          </p>
        </div>

        <div className="pb-4">
          <Link
            href="/user-login"
            className="w-full flex items-center justify-center rounded-lg h-11 mt-2 bg-green-400/95 hover:bg-green-400/80 text-lg"
          >
            Sign in as User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaptainLogin;

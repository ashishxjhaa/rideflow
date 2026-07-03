"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";
import { useState } from "react";
import { loginUserSchema } from "@rideflow/validation";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = loginUserSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      console.log(result.error.flatten().fieldErrors);
      return;
    }

    // api calls using axios
    // await axios.post("/api/v1/users/login", result.data);

    setEmail("");
    setPassword("");
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

          <Button className="w-full h-10 my-2 text-lg">Login</Button>
        </form>

        <p className="text-center pt-0.5">
          New here?{" "}
          <Link href="/user-signup" className="text-blue-600">
            Create new Account
          </Link>
        </p>
      </div>

      <div className="mb-5">
        <Link
          href="/captain-login"
          className="w-full flex items-center justify-center rounded-lg h-10 mt-2 bg-green-400/95 hover:bg-green-400/80 text-lg"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;

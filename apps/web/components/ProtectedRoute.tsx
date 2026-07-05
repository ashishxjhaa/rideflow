"use client";

import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "./ui/spinner";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { accessToken, setAccessToken } = useAuth();
  const router = useRouter();
  const [checking, setChecking] = useState(!accessToken);

  useEffect(() => {
    if (accessToken) return; // already have one — e.g. just came from login

    api
      .post("/api/v1/session/refresh")
      .then((res) => setAccessToken(res.data.accessToken))
      .catch(() => router.replace("/user-login"))
      .finally(() => setChecking(false));
  }, [accessToken]);

  if (checking) return <Spinner />;
  if (!accessToken) return null; // redirect in flight
  return <>{children}</>;
};

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { setAxiosAccessToken, setOnRefreshFail } from "../lib/axios";
import { useRouter } from "next/navigation";

type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  loginRedirect: string;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
  loginRedirect,
}: {
  children: React.ReactNode;
  loginRedirect: string;
}) => {
  const [accessToken, setTokenState] = useState<string | null>(null);
  const router = useRouter();

  const setAccessToken = (token: string | null) => {
    setTokenState(token);
    setAxiosAccessToken(token);
  };

  useEffect(() => {
    setOnRefreshFail(() => {
      setTokenState(null);
      router.replace(loginRedirect);
    });
  }, [router, loginRedirect]);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, loginRedirect }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

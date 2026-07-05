"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { setAxiosAccessToken, setOnRefreshFail } from "../lib/axios";
import { useRouter } from "next/navigation";

type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setTokenState] = useState<string | null>(null);
  const router = useRouter();

  const setAccessToken = (token: string | null) => {
    setTokenState(token);
    setAxiosAccessToken(token);
  };

  useEffect(() => {
    setOnRefreshFail(() => {
      setTokenState(null);
      router.replace("/user-login");
    });
  }, [router]);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

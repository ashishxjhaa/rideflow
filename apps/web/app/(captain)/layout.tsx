import { AuthProvider } from "@/context/AuthContext";

export default function CaptainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider loginRedirect="/captain-login">{children}</AuthProvider>;
}

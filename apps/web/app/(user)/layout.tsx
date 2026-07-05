import { AuthProvider } from "@/context/AuthContext";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider loginRedirect="/user-login">{children}</AuthProvider>;
}

import { AuthProvider } from "@/context/AuthContext";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">{children}</div>
    </AuthProvider>
  );
}

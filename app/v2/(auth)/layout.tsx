import { AuthHeader } from "@/components/v2/AuthHeader";

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthHeader />
      <main className="flex-grow flex items-center justify-center p-6 relative overflow-hidden bg-gradient-radial min-h-screen">
        {children}
      </main>
    </>
  );
}

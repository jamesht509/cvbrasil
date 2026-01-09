import { AppSidebar } from "@/components/v2/AppSidebar";
import { AppTopbar } from "@/components/v2/AppTopbar";
import { ProtectedRoute } from "@/components/v2/ProtectedRoute";

export default function AppLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white min-h-screen flex">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <AppTopbar />
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}

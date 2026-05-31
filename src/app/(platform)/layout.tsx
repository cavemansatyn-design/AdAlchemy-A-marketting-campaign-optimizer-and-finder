import { BrandMarquee } from "@/components/layout/BrandMarquee";
import { MobileNav, Sidebar } from "@/components/layout/Sidebar";
import { WorkflowStageSync } from "@/components/workflow/WorkflowStageSync";
import { AuthProvider } from "@/context/AuthContext";
import { WorkflowProvider } from "@/context/WorkflowContext";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <WorkflowProvider>
        <WorkflowStageSync />
        <div className="fixed inset-0 heritage-pattern z-0" />
        <div className="relative z-10 flex min-h-screen">
          <Sidebar />
          <div className="flex min-h-screen w-full min-w-0 flex-1 flex-col pb-24 lg:ml-64 lg:pb-0">
            <BrandMarquee />
            {children}
          </div>
          <MobileNav />
        </div>
      </WorkflowProvider>
    </AuthProvider>
  );
}

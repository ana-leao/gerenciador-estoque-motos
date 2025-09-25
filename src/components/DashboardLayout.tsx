import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Fixed Header with trigger */}
          <div className="flex items-center border-b border-card-border bg-card">
            <SidebarTrigger className="ml-4 p-2 hover:bg-surface rounded-lg transition-colors" />
            <div className="flex-1">
              <DashboardHeader />
            </div>
          </div>
          
          {/* Main Content */}
          <main className="flex-1 overflow-auto bg-surface p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
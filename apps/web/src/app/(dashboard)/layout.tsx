import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { getCurrentUser } from "@/lib/api/user";

import { cookies } from "next/headers";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getCurrentUser();
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

    const shopName = user?.shop?.name || "দোকান";
    const ownerName = user?.full_name || "মালিক";
    const roleText = user?.role === 'OWNER' ? 'মালিক' : user?.role === 'STAFF' ? 'কর্মচারী' : 'অ্যাডমিন';

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <main className="dashboard-layout flex flex-1 flex-col overflow-hidden bg-slate-50">
                {/* Topbar with better proportions */}
                <Topbar />

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    );
}

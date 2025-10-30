import { AuthGuard } from "@/modules/auth/ui/components/auth-guard"
import { OrganizationGuard } from "@/modules/auth/ui/components/organization-guard"
import { DashboardSideBar } from "@/modules/dashboard/ui/components/dashboard-sidebar"
import { SidebarProvider } from "@workspace/ui/components/sidebar"
import { Provider } from "jotai";
import { cookies } from "next/headers";

export const DashboardLayout  = async ({children}:{children:React.ReactNode}) =>{
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
    return (
    <AuthGuard>
        <OrganizationGuard>
            <Provider>
            <SidebarProvider defaultOpen={defaultOpen}>
                <DashboardSideBar/>
            <main className="flex flex-1 flex-col">
                {children}
            </main>
            </SidebarProvider>
            </Provider>
        </OrganizationGuard>
    </AuthGuard>
    );
};
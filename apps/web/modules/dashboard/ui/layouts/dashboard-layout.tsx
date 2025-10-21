import { AuthGuard } from "@/modules/auth/ui/components/auth-guard"
import { OrganizationGuard } from "@/modules/auth/ui/components/organization-guard"
import { DashboardSideBar } from "@/modules/dashboard/ui/components/dashboard-sidebar"
import {SIDEBAR_COOKIE_NAME, SidebarProvider} from "@workspace/ui/components/sidebar"
import { cookies } from "next/headers";

export const DashboardLayout  = async ({children}:{children:React.ReactNode}) =>{
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get(SIDEBAR_COOKIE_NAME)?.value === "true"
    return (
    <AuthGuard>
        <OrganizationGuard>
            <SidebarProvider defaultOpen={defaultOpen}>
                <DashboardSideBar/>
            <main className="flex flex-1 flex-col">
                {children}
            </main>
            </SidebarProvider>
        </OrganizationGuard>
    </AuthGuard>
    );
};
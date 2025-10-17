import { AuthLayout } from "@/modules/auth/ui/layouts/auth-layout"
function Layout({children}:{children:React.ReactNode}) {

    return (
        <AuthLayout>
            {children}
        </AuthLayout>
    )
}

export default Layout

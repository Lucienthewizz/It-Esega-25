// import { UseRoles } from '@/utils/roles';
import { UserType } from '@/types/user';
import { ReactNode, useEffect, useState } from 'react';
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import DashboardHeader from './header';
import SidebarNav from "./sidebar"
import { usePage } from '@inertiajs/react';


type AuthenticatedLayoutProps = {
    children: ReactNode;
    user: UserType;
};



export default function AuthenticatedAdminLayout({ children, user }: AuthenticatedLayoutProps) {
    const { url } = usePage();
    const [activeItem, setActiveItem] = useState("");

    useEffect(() => {
        if (url.includes('dashboard')) {
            setActiveItem('dashboard');
        } else if (url.includes('users')) {
            setActiveItem('users');
        } else if (url.includes("settings")) {
            setActiveItem('settings');
        }
    }, [url]);

    return (
        <>

            <SidebarProvider>
                <div className="flex h-screen w-full">
                    <SidebarNav activeItem={activeItem} setActiveItem={setActiveItem} user={user} />
                    <SidebarInset>
                        <div className="flex h-full flex-col">
                            <DashboardHeader user={user} />
                            <main className="flex-1 overflow-auto p-4 lg:p-6 text-slate-800">{children}</main>
                        </div>
                    </SidebarInset>
                </div>
            </SidebarProvider>

        </>
    );
}

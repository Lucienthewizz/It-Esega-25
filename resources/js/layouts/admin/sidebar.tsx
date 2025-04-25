"use client"

import { BarChart3, Home, Package, Settings, ShoppingCart, Users } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import type { UserType } from "@/types/user"

import { UserProfile } from "./user-profile"
import { Link } from "@inertiajs/react"

type SidebarNavProps = {
    activeItem: string
    setActiveItem: (item: string) => void
    user: UserType
}

export default function SidebarNav({ activeItem, setActiveItem, user }: SidebarNavProps) {
    const menuItems = [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: Home,
            link: route('admin.dashboard')
        },
        {
            id: "admins",
            label: "Admin Management",
            icon: Users,
            link: route('admins.index')
        },
        // {
        //     id: "settings",
        //     label: "Settings",
        //     icon: Package,
        // },
        // {
        //     id: "orders",
        //     label: "Orders",
        //     icon: ShoppingCart,
        // },
        // {
        //     id: "analytics",
        //     label: "Analytics",
        //     icon: BarChart3,
        // },
    ]

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2 px-4">
                    <img src='/images/LogoEsega25.png' alt="Logo Essega" className="w-20" />
                    <span className="text-lg font-semibold">IT Essega</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.id}>
                                    <Link href={item.link}>
                                        <SidebarMenuButton isActive={activeItem === item.id} onClick={() => setActiveItem(item.id)}>
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.label}</span>
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Settings</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton isActive={activeItem === "settings"} onClick={() => setActiveItem("settings")}>
                                    <Settings className="h-4 w-4" />
                                    <span>Settings</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <UserProfile user={user || {}} />
            </SidebarFooter>
        </Sidebar>
    )
}

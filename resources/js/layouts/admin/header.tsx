"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import type { UserType } from "@/types/user"

type DashboardHeaderProps = {
    user: UserType
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
    const { theme, setTheme } = useTheme()

    const avatarUrl = user?.name
        ? `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(user.name)}`
        : "/placeholder.svg?height=32&width=32"

    const initials = user?.name
        ? user.name.split(" ").map(part => part[0]).join("").toUpperCase().slice(0, 2)
        : "JD"

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    return (
        <header className="flex h-14 items-center bg-[#252525] gap-4 border-b px-4 lg:h-16 lg:px-6">
            <SidebarTrigger />
            <div className="flex-1">
                <h1 className="text-lg font-semibold text-white">Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" className="" size="icon" onClick={toggleTheme}>
                    {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                <Avatar className="h-12 w-12">
                    <AvatarImage src={avatarUrl} alt={user?.name || "Avatar"} />
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
            </div>
        </header>
    )
}

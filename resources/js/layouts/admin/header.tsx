import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import type { UserType } from "@/types/user"

type DashboardHeaderProps = {
    user: UserType
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-16 lg:px-6">
            <SidebarTrigger />
            <div className="flex-1">
                <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                    Upgrade
                </Button>
                <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.name || "/placeholder.svg?height=32&width=32"} alt="Avatar" />
                    <AvatarFallback>{user?.name || "JD"}</AvatarFallback>
                </Avatar>
            </div>
        </header>
    )
}

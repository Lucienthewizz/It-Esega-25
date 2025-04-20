import { Settings } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { UserType } from "@/types/user"

type UserProfileProps = {
    user: UserType
}

export function UserProfile({ user }: UserProfileProps) {

    return (
        <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.name || "/placeholder.svg?height=32&width=32"} alt="Avatar" />
                    <AvatarFallback>{user?.name || "JD"}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm font-medium">{user?.name || "John Doe"}</p>
                    <p className="text-xs text-muted-foreground">{user?.email || "admin@acme.com"}</p>
                </div>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

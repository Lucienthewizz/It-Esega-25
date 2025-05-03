import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TeamOverview } from "@/components/cabor/team-overview"
import { PlayersList } from "@/components/cabor/players-list"
import { GameHeader } from "@/components/cabor/game-header"
import AuthenticatedAdminLayout from "@/layouts/admin/layout"
import { UserType } from "@/types/user"
import { usePage } from "@inertiajs/react"

export default function TeamPlayerPage() {
    const { user, flash } = usePage<{
        user: { data: UserType },
        flash: { success?: string, error?: string }
    }>().props;
    const auth = user.data;

    return (
        <>
            <AuthenticatedAdminLayout title="Admin Management" headerTitle={'Team & Player Management'} user={auth}>
                <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
                    <div className="container mx-auto py-8 space-y-8">
                        <header className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                            <div>
                                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    Esports Team Management
                                </h1>
                                <p className="text-muted-foreground">Manage your professional esports teams and players</p>
                            </div>
                        </header>

                        <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 h-14 rounded-xl p-1">
                                <TabsTrigger value="overview" className="rounded-lg text-sm sm:text-base">
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger value="free-fire" className="rounded-lg text-sm sm:text-base">
                                    Free Fire
                                </TabsTrigger>
                                <TabsTrigger value="mobile-legends" className="rounded-lg text-sm sm:text-base">
                                    Mobile Legends
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="overview" className="space-y-6 mt-6">
                                <TeamOverview />
                            </TabsContent>

                            <TabsContent value="free-fire" className="space-y-6 mt-6">
                                <GameHeader
                                    title="Free Fire"
                                    logo="/Images/FF-logo.png"
                                    description="Team management for Free Fire division"
                                    color="from-orange-500 to-red-600"
                                />
                                <PlayersList gameType="free-fire" />
                            </TabsContent>

                            <TabsContent value="mobile-legends" className="space-y-6 mt-6">
                                <GameHeader
                                    title="Mobile Legends"
                                    logo="/Images/ML-logo.png"
                                    description="Team management for Mobile Legends division"
                                    color="from-blue-500 to-purple-600"
                                />
                                <PlayersList gameType="mobile-legends" />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </AuthenticatedAdminLayout>
        </>
    )
}

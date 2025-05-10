import { GameHeader } from '@/components/cabor/game-header';
import { PlayersList } from '@/components/cabor/players-list';
import { TeamOverview } from '@/components/cabor/team-overview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthenticatedAdminLayout from '@/layouts/admin/layout';
//import { TeamData } from '@/types/register';
import { TeamOverviews } from '@/types/teamOverviews';
import { Player } from '@/types/TeamPlayers';
import { UserType } from '@/types/user';
import { usePage } from '@inertiajs/react';

export default function TeamPlayerPage() {
    const { user, flash, teams, totalTeams, totalPlayers, achievementsTotal, winrate, ffPlayers, mlPlayers } = usePage<{
        user: { data: UserType };
        flash: { success?: string; error?: string };
        teams: { data: TeamOverviews[] };
        totalTeams: number;
        totalPlayers: number;
        achievementsTotal: number;
        winrate: number;
        ffPlayers: Player[];
        mlPlayers: Player[];
    }>().props;
    const auth = user.data;
    const teamData = teams.data;

    return (
        <>
            <AuthenticatedAdminLayout title="Admin Management" headerTitle={'Team & Player Management'} user={auth}>
                <div className="from-background to-background/80 min-h-screen bg-gradient-to-b">
                    <div className="container mx-auto space-y-8 py-8">
                        <header className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                            <div>
                                <h1 className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
                                    Esports Team Management
                                </h1>
                                <p className="text-muted-foreground">Manage your professional esports teams and players</p>
                            </div>
                        </header>

                        <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="grid h-14 w-full grid-cols-3 rounded-xl p-1">
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

                            <TabsContent value="overview" className="mt-6 space-y-6">
                                <TeamOverview
                                    totalTeams={totalTeams}
                                    totalPlayers={totalPlayers}
                                    achievementsTotal={achievementsTotal}
                                    winrate={winrate}
                                    teams={teamData}
                                />
                            </TabsContent>

                            <TabsContent value="free-fire" className="mt-6 space-y-6">
                                <GameHeader
                                    title="Free Fire"
                                    logo="/Images/FF-logo.png"
                                    description="Team management for Free Fire division"
                                    color="from-orange-500 to-red-600"
                                />
                                <PlayersList gameType="free-fire" players={ffPlayers} />
                            </TabsContent>

                            <TabsContent value="mobile-legends" className="mt-6 space-y-6">
                                <GameHeader
                                    title="Mobile Legends"
                                    logo="/Images/ML-logo.png"
                                    description="Team management for Mobile Legends division"
                                    color="from-blue-500 to-purple-600"
                                />
                                <PlayersList gameType="mobile-legends" players={mlPlayers} />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </AuthenticatedAdminLayout>
        </>
    );
}

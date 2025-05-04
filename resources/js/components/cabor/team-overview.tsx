'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { Download, TrendingUp, Trophy, Users } from 'lucide-react';
import { TeamPerformanceChart } from './team-performance-chart';
import { TeamRegistrationChart } from './team-registration-chart';

interface Team {
    id: number;
    name: string;
    game: string;
    playerCount: number;
    achievements: number;
    logo: string;
    color: string;
}

interface TeamOverviewProps {
    totalTeams: number;
    totalPlayers: number;
    achievementsTotal: number;
    winrate: string | number;
    teams: Team[];
}

export function TeamOverview({ totalTeams, totalPlayers, achievementsTotal, winrate, teams = [] }: TeamOverviewProps) {
    return (
        <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-none bg-gradient-to-br from-purple-50 to-purple-100 shadow-md dark:from-purple-950/20 dark:to-purple-900/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm font-medium">Total Teams</p>
                                <h3 className="mt-1 text-3xl font-bold">{totalTeams}</h3>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none bg-gradient-to-br from-pink-50 to-pink-100 shadow-md dark:from-pink-950/20 dark:to-pink-900/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm font-medium">Total Players</p>
                                <h3 className="mt-1 text-3xl font-bold">{totalPlayers}</h3>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/30">
                                <Users className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none bg-gradient-to-br from-amber-50 to-amber-100 shadow-md dark:from-amber-950/20 dark:to-amber-900/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm font-medium">Achievements</p>
                                <h3 className="mt-1 text-3xl font-bold">{achievementsTotal}</h3>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                                <Trophy className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-md dark:from-emerald-950/20 dark:to-emerald-900/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm font-medium">Win Rate</p>
                                <h3 className="mt-1 text-3xl font-bold">{winrate}</h3>
                            </div>
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                                <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-none shadow-md">
                    <CardHeader>
                        <CardTitle>Team Registration</CardTitle>
                        <CardDescription>Monthly team registrations over the past year</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TeamRegistrationChart />
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                    <CardHeader>
                        <CardTitle>Team Performance</CardTitle>
                        <CardDescription>Win rates by game category</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TeamPerformanceChart />
                    </CardContent>
                </Card>
            </div>

            <Card className="border-none shadow-md">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Teams</CardTitle>
                            <CardDescription>Manage your esports teams</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="h-8 gap-1">
                                <Download className="h-3.5 w-3.5" />
                                <span>CSV</span>
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 gap-1">
                                <Download className="h-3.5 w-3.5" />
                                <span>PDF</span>
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 gap-1">
                                <Download className="h-3.5 w-3.5" />
                                <span>Excel</span>
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                        {teams.map((team) => (
                            <Card key={team.id} className="overflow-hidden border-none shadow-md">
                                <div className={`h-2 w-full bg-gradient-to-r ${team.color}`}></div>
                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                    <Avatar className="border-border h-14 w-14 border-2">
                                        <AvatarImage src={team.logo || '/placeholder.svg'} alt={team.name} />
                                        <AvatarFallback>{team.name.substring(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle>{team.name}</CardTitle>
                                        <CardDescription>
                                            <Badge variant="outline" className="mr-1">
                                                {team.game}
                                            </Badge>
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4 py-4">
                                        <div className="flex items-center gap-2">
                                            <Users className="text-muted-foreground h-4 w-4" />
                                            <span className="text-sm">{team.playerCount} Players</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Trophy className="text-muted-foreground h-4 w-4" />
                                            <span className="text-sm">{team.achievements} Achievements</span>
                                        </div>
                                    </div>
                                    <Button variant="outline" className="w-full" asChild>
                                        <Link href={`/teams/${team.id}`}>Manage Team</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

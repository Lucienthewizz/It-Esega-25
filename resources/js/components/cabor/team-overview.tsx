"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Trophy, TrendingUp, Download } from "lucide-react"
import { Link } from "@inertiajs/react"
import { TeamRegistrationChart } from "./team-registration-chart"
import { TeamPerformanceChart } from "./team-performance-chart"

export function TeamOverview() {
    const teams = [
        {
            id: 1,
            name: "Phoenix Squad",
            game: "Free Fire",
            playerCount: 6,
            achievements: 12,
            logo: "/placeholder.svg?height=40&width=40",
            color: "from-orange-500 to-red-600",
        },
        {
            id: 2,
            name: "Dragon Warriors",
            game: "Mobile Legends",
            playerCount: 5,
            achievements: 8,
            logo: "/placeholder.svg?height=40&width=40",
            color: "from-blue-500 to-purple-600",
        },
    ]

    return (
        <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-none shadow-md bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Teams</p>
                                <h3 className="text-3xl font-bold mt-1">2</h3>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/20 dark:to-pink-900/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Players</p>
                                <h3 className="text-3xl font-bold mt-1">11</h3>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                                <Users className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/20 dark:to-amber-900/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Achievements</p>
                                <h3 className="text-3xl font-bold mt-1">20</h3>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                                <Trophy className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/20 dark:to-emerald-900/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Win Rate</p>
                                <h3 className="text-3xl font-bold mt-1">68%</h3>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
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
                                    <Avatar className="h-14 w-14 border-2 border-border">
                                        <AvatarImage src={team.logo || "/placeholder.svg"} alt={team.name} />
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
                                            <Users className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm">{team.playerCount} Players</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Trophy className="h-4 w-4 text-muted-foreground" />
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
    )
}

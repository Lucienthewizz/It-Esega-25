"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, MoreVertical, Edit, Trash2, Star, Filter, Download } from "lucide-react"
import axios from "axios"

type Player = {
    id: number
    name: string
    nickname: string
    role: string
    avatar: string
    status: "active" | "inactive" | "reserve"
    joinDate: string
    team_name?: string
}

// Struktur data dari API
interface ApiPlayer {
    id: number
    name: string
    nickname: string
    role?: string
    foto?: string
    team_name?: string
    created_at: string
    status?: string
    email?: string
    no_hp?: string
    alamat?: string
    id_server?: string
}

// Data dummy sebagai fallback
const freeFirePlayers: Player[] = [
    {
        id: 1,
        name: "Alex Johnson",
        nickname: "FireKing",
        role: "Rusher",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "active",
        joinDate: "2023-05-15",
    },
    // ... other dummy data
]

// Data dummy sebagai fallback
const mobileLegendPlayers: Player[] = [
    {
        id: 1,
        name: "James Wilson",
        nickname: "TankMaster",
        role: "Tank",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "active",
        joinDate: "2023-02-10",
    },
    // ... other dummy data
]

export function PlayersList({ gameType }: { gameType: "free-fire" | "mobile-legends" }) {
    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState(true)
    const [realPlayers, setRealPlayers] = useState<Player[]>([])
    
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                setLoading(true)
                if (gameType === "free-fire") {
                    const response = await axios.get<ApiPlayer[]>('/api/ff-players')
                    setRealPlayers(response.data.map((player: ApiPlayer) => ({
                        id: player.id,
                        name: player.name,
                        nickname: player.nickname,
                        role: player.role || 'Player',
                        avatar: player.foto || "/placeholder.svg?height=40&width=40",
                        status: "active",
                        joinDate: player.created_at,
                        team_name: player.team_name
                    })))
                } else {
                    const response = await axios.get<ApiPlayer[]>('/api/ml-players')
                    setRealPlayers(response.data.map((player: ApiPlayer) => ({
                        id: player.id,
                        name: player.name,
                        nickname: player.nickname,
                        role: player.role || 'Player',
                        avatar: player.foto || "/placeholder.svg?height=40&width=40",
                        status: "active",
                        joinDate: player.created_at,
                        team_name: player.team_name
                    })))
                }
            } catch (error) {
                console.error("Error fetching players:", error)
                // Fallback ke dummy data jika API gagal
                setRealPlayers(gameType === "free-fire" ? freeFirePlayers : mobileLegendPlayers)
            } finally {
                setLoading(false)
            }
        }
        
        fetchPlayers()
    }, [gameType])

    // Gunakan real data jika tersedia, jika tidak gunakan dummy data
    const players = realPlayers.length > 0 
        ? realPlayers 
        : (gameType === "free-fire" ? freeFirePlayers : mobileLegendPlayers)

    const filteredPlayers = players.filter(
        (player) =>
            player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            player.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (player.team_name && player.team_name.toLowerCase().includes(searchQuery.toLowerCase())),
    )

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "bg-green-500"
            case "inactive":
                return "bg-red-500"
            case "reserve":
                return "bg-yellow-500"
            default:
                return "bg-gray-500"
        }
    }
    
    const handleExportCSV = () => {
        // Redirect ke endpoint CSV export sesuai dengan game type
        window.location.href = gameType === "free-fire" 
            ? "/secure-admin-essega/export/FFplayers" 
            : "/secure-admin-essega/export/MLplayers"
    }

    return (
        <Card className="border-none shadow-md">
            <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <CardTitle>Daftar Pemain</CardTitle>
                        <CardDescription>
                            Kelola pemain {gameType === "free-fire" ? "Free Fire" : "Mobile Legends"}
                        </CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 gap-1"
                            onClick={handleExportCSV}
                        >
                            <Download className="h-3.5 w-3.5" />
                            <span>CSV</span>
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Cari pemain atau tim..."
                            className="w-full pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                            Total: {filteredPlayers.length} pemain
                        </Badge>
                        <Button variant="outline" size="sm" className="gap-1">
                            <Filter className="h-4 w-4" />
                            Filter
                        </Button>
                    </div>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50">
                                <TableHead>Pemain</TableHead>
                                <TableHead>Tim</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Terdaftar Pada</TableHead>
                                <TableHead className="w-[80px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-6">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500 mb-3"></div>
                                            <span className="text-gray-500">Memuat data pemain...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : filteredPlayers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-6">
                                        <div className="flex flex-col items-center justify-center">
                                            <span className="text-gray-500">Tidak ada pemain yang ditemukan</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredPlayers.map((player) => (
                                    <TableRow key={player.id} className="hover:bg-muted/30">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10 border">
                                                    <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                                                    <AvatarFallback>{player.nickname.substring(0, 2)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">{player.name}</div>
                                                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                                                        {player.nickname}
                                                        {player.role === "IGL" && <Star className="h-3 w-3 text-yellow-500 ml-1" />}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium text-sm">{player.team_name || '-'}</div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={
                                                    gameType === "free-fire"
                                                        ? "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950/30 dark:text-orange-400"
                                                        : "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-400"
                                                }
                                            >
                                                {player.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className={`h-2.5 w-2.5 rounded-full ${getStatusColor(player.status)}`}></div>
                                                <span className="capitalize">{player.status}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{new Date(player.joinDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreVertical className="h-4 w-4" />
                                                        <span className="sr-only">Open menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem className="flex items-center gap-2">
                                                        <Edit className="h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                                                        <Trash2 className="h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}

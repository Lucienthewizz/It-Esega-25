import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Edit, Filter, MoreVertical, Search, Star, Trash2 } from 'lucide-react';
import { useState } from 'react';

type Player = {
    id: number;
    name: string;
    nickname: string;
    role: string;
    avatar: string;
    status: 'active' | 'inactive' | 'reserve';
    joinDate: string;
};

export function PlayersList({ players, gameType }: { players: Player[]; gameType: 'free-fire' | 'mobile-legends' }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPlayers = players.filter(
        (player) =>
            player.name.toLowerCase().includes(searchQuery.toLowerCase()) || player.nickname.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-500';
            case 'inactive':
                return 'bg-red-500';
            case 'reserve':
                return 'bg-yellow-500';
            default:
                return 'bg-gray-500';
        }
    };

    const downloadExcel = () => {
        const endpoint = gameType === 'free-fire' ? '/export/ff-players' : '/export/ml-players';

        const link = document.createElement('a');
        link.href = endpoint;
        link.setAttribute('download', '');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Card className="border-none shadow-md">
            <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <CardTitle>Players</CardTitle>
                        <CardDescription>Manage your {gameType === 'free-fire' ? 'Free Fire' : 'Mobile Legends'} players</CardDescription>
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
                        <Button variant="outline" size="sm" className="h-8 gap-1" onClick={downloadExcel}>
                            <Download className="h-3.5 w-3.5" />
                            <span>Excel</span>
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full sm:w-64">
                        <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
                        <Input
                            type="search"
                            placeholder="Search players..."
                            className="w-full pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" size="sm" className="gap-1">
                        <Filter className="h-4 w-4" />
                        Filter
                    </Button>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50">
                                <TableHead>Player</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Join Date</TableHead>
                                <TableHead className="w-[80px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPlayers.map((player) => (
                                <TableRow key={player.id} className="hover:bg-muted/30">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 border">
                                                <AvatarImage src={player.avatar || '/placeholder.svg'} alt={player.name} />
                                                <AvatarFallback>{player.nickname.substring(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">{player.name}</div>
                                                <div className="text-muted-foreground flex items-center gap-1 text-sm">
                                                    {player.nickname}
                                                    {player.role === 'IGL' && <Star className="ml-1 h-3 w-3 text-yellow-500" />}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={
                                                gameType === 'free-fire'
                                                    ? 'border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950/30 dark:text-orange-400'
                                                    : 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-400'
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
                                    <TableCell>{new Date(player.joinDate).toLocaleDateString()}</TableCell>
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
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}

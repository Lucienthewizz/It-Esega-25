export type Player = {
    id: number;
    name: string;
    nickname: string;
    role: string;
    avatar: string;
    status: 'active' | 'inactive' | 'reserve';
    joinDate: string;
};

export type TeamPlayers = {
    ffPlayers: Player[];
    mlPlayers: Player[];
};

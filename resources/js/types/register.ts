export interface TeamData {
    id?: number | null
    team_name: string
    proof_of_payment: File | null
    team_logo: File | null
}
export interface MLPlayer {
    name: string
    id: string
    server: string
    role: string
    phone: string
    email: string
}

export interface FFPlayer {
    name: string
    id: string
    nickname: string
    phone: string
    email: string
}

export interface PlayerFormProps {
    player: MLPlayer | FFPlayer
    index: number
    onChange: (index: number, field: string, value: string) => void
    onDelete: () => void
}

export interface GameSelectionFormProps {
    onGameSelect: (game: "ml" | "ff") => void
}

export interface TeamRegistrationFormProps {
    teamData: TeamData
    gameType: "ml" | "ff"
    onSubmit: (data: TeamData) => void
    resetStep: () => void
}


export interface PlayerRegistrationFormProps {
    teamData: TeamData
    gameType: "ml" | "ff"
}

export interface QRCodeSectionProps {
    title: string
    description: string
    instructions: string[]
    amount: string
    gameType: "ml" | "ff"
    resetStep: () => void
}

export interface FileUploadFieldProps {
    id: string
    label: string
    accept: string
    value: File | null
    onChange: (file: File | null) => void
    helpText?: string
}

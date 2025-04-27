"use client"

import { useState } from "react"
import { GameSelectionForm } from "@/components/registration/game-selection-form"
import { TeamRegistrationForm } from "@/components/registration/team-registration-form"
import { PlayerRegistrationForm } from "@/components/registration/player-registration-form"
import type { TeamData } from "@/types/register"
import { Head } from "@inertiajs/react"

export default function RegisterPage() {
    const [step, setStep] = useState(1)
    const [gameType, setGameType] = useState<"ml" | "ff">("ml")
    const [teamData, setTeamData] = useState<TeamData>({
        teamName: "",
        paymentProof: null,
        teamLogo: null,
    })

    const handleGameSelect = (game: "ml" | "ff") => {
        setGameType(game)
        setStep(2)
    }

    const handleTeamSubmit = (data: TeamData) => {
        setTeamData(data)
        setStep(3)
    }

    return (
        <>
        <Head title="Register Team"/>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
                {step === 1 ? (
                    <GameSelectionForm onGameSelect={handleGameSelect} />
                ) : step === 2 ? (
                    <TeamRegistrationForm teamData={teamData} gameType={gameType} onSubmit={handleTeamSubmit} />
                ) : (
                    <PlayerRegistrationForm teamData={teamData} gameType={gameType} />
                )}
            </div>
        </>
    )
}

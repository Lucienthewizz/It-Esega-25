"use client"

import { useState, useEffect } from "react"
import { GameSelectionForm } from "@/components/registration/game-selection-form"
import { TeamRegistrationForm } from "@/components/registration/team-registration-form"
import type { TeamData } from "@/types/register"
import { Head } from "@inertiajs/react"

export default function RegisterPage() {
    const [step, setStep] = useState(1)
    const [gameType, setGameType] = useState<"ml" | "ff">("ml")
    const [teamData, setTeamData] = useState<TeamData>({
        id: null,
        team_name: "",
        proof_of_payment: null,
        team_logo: null,
    })

    useEffect(() => {
        const savedStep = localStorage.getItem("registration_step")
        if (savedStep) {
            setStep(parseInt(savedStep))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("registration_step", step.toString())
    }, [step])

    const handleGameSelect = (game: "ml" | "ff") => {
        setGameType(game)
        setStep(2)
    }

    const handleTeamSubmit = (data: TeamData) => {
        setTeamData(data)
        setStep(3)
    }


    const resetStep = () => {
        setStep(1)
        localStorage.setItem("registration_step", "1")
    }

    return (
        <>
            <Head title="Register Team" />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
                {step === 1 ? (
                    <GameSelectionForm onGameSelect={handleGameSelect} />
                ) : step === 2 ? (
                    <TeamRegistrationForm
                        teamData={teamData}
                        gameType={gameType}
                        onSubmit={handleTeamSubmit}
                        resetStep={resetStep}
                    />
                ) : (
                    // <PlayerRegistrationForm teamData={teamData} gameType={gameType} />
                    <></>
                )}
            </div>
        </>
    )
}

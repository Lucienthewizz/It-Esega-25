"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MLPlayerForm } from "@/components/registration/ml-player-form"
import { FFPlayerForm } from "@/components/registration/ff-player-form"
import type { FFPlayer, MLPlayer, PlayerRegistrationFormProps } from "@/types/register"

export function PlayerRegistrationForm({ teamData, gameType }: PlayerRegistrationFormProps) {
    const isML = gameType === "ml"
    const themeColor = isML ? "purple" : "orange"
    const gameTitle = isML ? "Mobile Legends" : "Free Fire"
    const minPlayers = isML ? 5 : 4

    const [mlPlayers, setMlPlayers] = useState<MLPlayer[]>([
        { name: "", id: "", server: "", role: "", phone: "", email: "" },
        { name: "", id: "", server: "", role: "", phone: "", email: "" },
        { name: "", id: "", server: "", role: "", phone: "", email: "" },
        { name: "", id: "", server: "", role: "", phone: "", email: "" },
        { name: "", id: "", server: "", role: "", phone: "", email: "" },
    ])

    const [ffPlayers, setFfPlayers] = useState<FFPlayer[]>([
        { name: "", id: "", nickname: "", phone: "", email: "" },
        { name: "", id: "", nickname: "", phone: "", email: "" },
        { name: "", id: "", nickname: "", phone: "", email: "" },
        { name: "", id: "", nickname: "", phone: "", email: "" },
    ])

    const handleMlPlayerChange = (index: number, field: string, value: string) => {
        const updatedPlayers = [...mlPlayers]
        updatedPlayers[index] = { ...updatedPlayers[index], [field]: value } as MLPlayer
        setMlPlayers(updatedPlayers)
    }

    const handleFfPlayerChange = (index: number, field: string, value: string) => {
        const updatedPlayers = [...ffPlayers]
        updatedPlayers[index] = { ...updatedPlayers[index], [field]: value } as FFPlayer
        setFfPlayers(updatedPlayers)
    }

    const addMlPlayer = () => {
        setMlPlayers([...mlPlayers, { name: "", id: "", server: "", role: "", phone: "", email: "" }])
    }

    const addFfPlayer = () => {
        setFfPlayers([...ffPlayers, { name: "", id: "", nickname: "", phone: "", email: "" }])
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        alert(`Team ${teamData.teamName} registered successfully for ${gameTitle} tournament!`)
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{gameTitle} Player Registration</h1>
                        <p className="text-gray-600">
                            Team: <span className="font-medium">{teamData.teamName}</span> - Register your team members
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div className={`bg-${themeColor}-50 p-4 rounded-xl mb-6`}>
                                <p className={`text-${themeColor}-800 font-medium`}>
                                    {gameTitle} requires a minimum of {minPlayers} players
                                </p>
                            </div>

                            {isML ? (
                                <>
                                    {mlPlayers.map((player, index) => (
                                        <MLPlayerForm key={index} player={player} index={index} onChange={handleMlPlayerChange} />
                                    ))}

                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={addMlPlayer}
                                        className={`w-full border-dashed border-2 border-${themeColor}-300 text-${themeColor}-600 hover:bg-${themeColor}-50`}
                                    >
                                        + Add Another Player
                                    </Button>
                                </>
                            ) : (
                                <>
                                    {ffPlayers.map((player, index) => (
                                        <FFPlayerForm key={index} player={player} index={index} onChange={handleFfPlayerChange} />
                                    ))}

                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={addFfPlayer}
                                        className={`w-full border-dashed border-2 border-${themeColor}-300 text-${themeColor}-600 hover:bg-${themeColor}-50`}
                                    >
                                        + Add Another Player
                                    </Button>
                                </>
                            )}

                            <Button
                                type="submit"
                                className={`w-full py-6 text-white rounded-xl font-medium text-lg transition-all duration-200 shadow-md hover:shadow-lg
                                    ${themeColor ? `bg-${themeColor}-600 hover:bg-${themeColor}-700` : "bg-yellow-400"}
                                    ${isML ? "bg-purple-700" : "bg-yellow-600"}
                                  `}                            >
                                Complete Registration
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

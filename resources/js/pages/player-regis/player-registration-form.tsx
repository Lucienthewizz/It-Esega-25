"use client"

import { useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { MLPlayerForm } from "@/components/registration/ml-player-form"
import type { PlayerRegistrationFormProps } from "@/types/register"

export function PlayerRegistrationForm({ teamData, gameType }: PlayerRegistrationFormProps) {
    const isML = gameType === "ml"
    const themeColor = isML ? "purple" : "orange"
    const gameTitle = isML ? "Mobile Legends" : "Free Fire"
    const minPlayers = isML ? 5 : 4
    const maxPlayers = 6

    const { data, setData, post, processing } = useForm({
        ml_players: [] as any[],
        team_id: teamData.id,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (data.ml_players.length < minPlayers) {
            alert(`You need at least ${minPlayers} players to submit the form.`);
            return;
        }

        post(route("player-registration.store"))
    }

    const handlePlayerChange = (index: number, field: string | number, value: string) => {
        const updatedPlayers = [...data.ml_players]
        updatedPlayers[index] = { ...updatedPlayers[index], [field]: value }
        setData("ml_players", updatedPlayers)
    }

    const addPlayer = () => {
        if (data.ml_players.length < maxPlayers) {
            const newPlayer = { name: "", id: "", server: "", role: "", phone: "", email: "" }
            setData("ml_players", [...data.ml_players, newPlayer])
        }
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
                            {data.ml_players.map((player, index) => (
                                <MLPlayerForm key={index} player={player} index={index} onChange={(field, value) => handlePlayerChange(index, field, value)} />
                            ))}
                            <Button type="button" onClick={addPlayer} disabled={data.ml_players.length >= maxPlayers}>
                                Add Player
                            </Button>

                            <Button type="submit" disabled={processing} className={`w-full bg-${themeColor}-600 hover:bg-${themeColor}-700`}>
                                Submit Players
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

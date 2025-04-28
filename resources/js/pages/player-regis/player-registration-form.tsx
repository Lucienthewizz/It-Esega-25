"use client"

import { useState } from "react"
import { useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { PlayerRegistrationFormProps } from "@/types/register"
import { MLPlayerForm } from "@/components/registration/ml-player-form"
import { Trash2, X } from "lucide-react"

export default function PlayerRegistrationForm({ teamData, gameType }: PlayerRegistrationFormProps) {
    const isML = gameType === "ml"
    const themeColor = isML ? "purple" : "orange"
    const gameTitle = isML ? "Mobile Legends" : "Free Fire"
    const minPlayers = isML ? 5 : 4
    const maxPlayers = 6

    const { data, setData, post, processing } = useForm({
        ml_players: [] as any[],
        team_id: teamData.id,
    })

    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [playerToDelete, setPlayerToDelete] = useState<number | null>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (data.ml_players.length < minPlayers) {
            alert(`You need at least ${minPlayers} players to submit the form.`)
            return
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

    const openDeleteDialog = (index: number) => {
        setPlayerToDelete(index)
        setDeleteDialogOpen(true)
    }

    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false)
        setPlayerToDelete(null)
    }

    const deletePlayer = () => {
        if (playerToDelete !== null) {
            const updatedPlayers = data.ml_players.filter((_, index) => index !== playerToDelete)
            setData("ml_players", updatedPlayers)
            closeDeleteDialog()
        }
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-8">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{gameTitle} Player Registration</h1>
                        <p className="text-gray-600">
                            Team: <span className="font-medium">{teamData.team_name}</span> - Register your team members
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            {data.ml_players.map((player, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <MLPlayerForm player={player} index={index} onChange={(field, value) => handlePlayerChange(index, field, value)} onDelete={() => openDeleteDialog(index)} />

                                </div>
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

            {/* Dialog for Deletion */}
            <Dialog open={isDeleteDialogOpen}>
                {/* <DialogTrigger asChild>
                    <Button variant="outline">Delete Player</Button>
                </DialogTrigger> */}
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this player form? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-row justify-between w-full">
                        <Button onClick={closeDeleteDialog} variant="outline"><X /> Cancel</Button>
                        <Button onClick={deletePlayer} variant="destructive"><Trash2 /> Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Head, useForm } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import type { MLPlayer, PlayerRegistrationFormProps } from "@/types/register"
import { MLPlayerForm } from "@/components/registration/ml-player-form"
import { AlertCircle, CheckCircle2, HelpCircle, Info, Loader2, PlusCircle, Trash2, X } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useProgress } from "@/hooks/use-progress"
import { useTimedAlert } from "@/hooks/use-timed-alert"
import { useMLPlayers } from "@/hooks/use-ml-player"

export default function PlayerRegistrationForm({ teamData, gameType }: PlayerRegistrationFormProps) {
    const isML = gameType === "ml"
    const gameTitle = isML ? "Mobile Legends" : "Free Fire"
    const minPlayers = 5
    const maxPlayers = 7



    const themeColors = {
        primary: isML ? "bg-purple-600 hover:bg-purple-700 text-white" : "bg-orange-600 hover:bg-orange-700 text-white",
        badge: isML ? "bg-purple-100 text-purple-800" : "bg-orange-100 text-orange-800",
        progress: isML ? "bg-purple-600" : "bg-orange-600",
        progressBg: isML ? "bg-purple-100" : "bg-orange-100",
    }

    const { data, setData, post, processing, errors } = useForm<Record<string, any>>({
        ml_players: [],
        team_id: teamData.id ?? 0,
    })
    console.log(errors)


    const [alertMessage, setAlertMessage] = useState("")
    const [showValidationError, setShowValidationError] = useState(false)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [showDeleteAlert, setShowDeleteAlert] = useState(false)
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [playerToDelete, setPlayerToDelete] = useState<number | null>(null)

    const progress = useProgress(data.ml_players, minPlayers)
    useTimedAlert(setShowSuccessAlert, setShowDeleteAlert)

    const hasLoadedPlayersFromStorage = useRef(false)

    useEffect(() => {
        if (!hasLoadedPlayersFromStorage.current) {
            const saved = localStorage.getItem("ml_players_data")
            if (saved && data.ml_players.length === 0) {
                try {
                    const parsed = JSON.parse(saved)
                    if (Array.isArray(parsed)) setData("ml_players", parsed)
                } catch (e) {
                    console.error("Failed to parse saved players", e)
                }
            }
            hasLoadedPlayersFromStorage.current = true
        }
    }, [data.ml_players, setData])

    useEffect(() => {
        localStorage.setItem("ml_players_data", JSON.stringify(data.ml_players))
    }, [data.ml_players])

    const { updatePlayer, addPlayer, deletePlayer } = useMLPlayers(
        { ml_players: data.ml_players as MLPlayer[] },
        setData,
        teamData.id
    )

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (data.ml_players.length < minPlayers) {
            setShowValidationError(true)
            setAlertMessage(`Kamu Butuh minilam ${minPlayers} Pemain untuk melakukan Submit Form.`)
            setTimeout(() => {
                setShowValidationError(false)
            }, 5000)
            return
        }

        post(route("player-registration.store"), {
            onError: () => {

            },
        });
    }

    const handlePlayerChange = (
        index: number,
        field: keyof MLPlayer,
        value: string | number | null | undefined
    ) => {
        const newValue = value != null ? String(value) : ""
        updatePlayer(index, field, newValue)
    }

    const addNewPlayer = () => {
        if (data.ml_players.length < maxPlayers) {
            addPlayer()
            setShowSuccessAlert(true)
            setAlertMessage("Form Player baru Berhasil di tambahkan.")
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

    const deletePlayerHandler = () => {
        if (playerToDelete !== null) {
            deletePlayer(playerToDelete)
            closeDeleteDialog()
            setShowDeleteAlert(true)
            setAlertMessage("Player telah dihapus dari Team anda.")
        }
    }

    // const extractErrorsForPlayer = (
    //     allErrors: Partial<Record<string, string>>,
    //     playerIndex: number
    // ): Partial<Record<keyof MLPlayer, string>> => {
    //     const prefix = `ml_players.${playerIndex}.`
    //     const result: Partial<Record<keyof MLPlayer, string>> = {}

    //     Object.keys(allErrors).forEach(key => {
    //         if (key.startsWith(prefix)) {
    //             const field = key.replace(prefix, "") as keyof MLPlayer
    //             result[field] = allErrors[key]!
    //         }
    //     })

    //     return result
    // }

    const normalizePlayerErrors = (
        rawErrors: Partial<Record<string, string>>,
        playerCount: number
    ): Record<string, string> => {
        const normalizedErrors: Record<string, string> = {};

        for (let i = 0; i < playerCount; i++) {
            for (const key in rawErrors) {
                if (rawErrors[key] !== undefined) {
                    normalizedErrors[`ml_players.${i}.${key}`] = rawErrors[key]!;
                }
            }
        }

        return normalizedErrors;
    };


    const normalizedErrors = normalizePlayerErrors(errors, data.ml_players.length);





    return (
        <>
            <Head title={`${gameTitle} Player Registration`} />

            <div className="container py-12 px-4 min-h-[100vh]">
                {/* Alerts Section */}
                <div className="fixed top-4 right-4 z-50 w-full max-w-md space-y-2">
                    <AnimatePresence>
                        {showValidationError && (
                            <motion.div
                                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Alert variant="destructive" className="bg-red-600/90  border-red-200">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription className="text-slate-900">{alertMessage}</AlertDescription>
                                </Alert>
                            </motion.div>
                        )}

                        {showSuccessAlert && (
                            <motion.div
                                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Alert variant="default" className="bg-green-600/90  border-green-200">
                                    <CheckCircle2 className="h-4 w-4" />
                                    <AlertTitle>Success</AlertTitle>
                                    <AlertDescription>{alertMessage}</AlertDescription>
                                </Alert>
                            </motion.div>
                        )}

                        {showDeleteAlert && (
                            <motion.div
                                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Alert variant="default" className="bg-blue-500/90  border-blue-200">
                                    <Info className="h-4 w-4 " />
                                    <AlertTitle>Information</AlertTitle>
                                    <AlertDescription >{alertMessage}</AlertDescription>
                                </Alert>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <Card className="max-w-5xl mx-auto overflow-hidden border-0 shadow-xl rounded-2xl">
                    <CardHeader
                        className={`p-8 ${isML ? "bg-gradient-to-r from-purple-700 to-indigo-800" : "bg-gradient-to-r from-orange-600 to-amber-600"} text-white`}
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex flex-row gap-2 items-center">
                                <img
                                    src={
                                        teamData.team_logo
                                            ? teamData.team_logo instanceof File
                                                ? URL.createObjectURL(teamData.team_logo)
                                                : `/storage/${teamData.team_logo}`
                                            : undefined
                                    }
                                    alt={`Team ${teamData.team_name} Logo`}
                                    className="max-w-32 rounded-2xl"
                                />
                                <div>
                                    <CardTitle className="text-3xl font-bold mb-2">{gameTitle} Player Registration</CardTitle>
                                    <CardDescription className="text-white/90 text-lg font-black">
                                        Team: <span className="font-medium">{teamData.team_name}</span>
                                    </CardDescription>
                                </div>
                            </div>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="bg-white/20 hover:bg-white/30 border-white/40 text-white">
                                        <HelpCircle className="mr-2 h-4 w-4" /> Help
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[40rem]">
                                    <DialogHeader>
                                        <DialogTitle className="flex items-center text-xl">
                                            <Info className="mr-2 h-5 w-5 text-blue-500" />
                                            How to Fill Out the Form
                                        </DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4 my-2">
                                        <p className="text-muted-foreground">Please fill out all the fields carefully:</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <h3 className="font-medium">Personal Information</h3>
                                                <ul className="space-y-1 text-sm">
                                                    <li className="flex items-center gap-2">
                                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                        <span>Full Name: Enter the player's real name</span>
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                        <span>Nickname: Enter the player's in-game name</span>
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                        <span>Phone Number: A valid contact number</span>
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                        <span>Email: Your contact email address</span>
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                        <span>Photo: Photo cannot be contain negative things and Porn (Max: 1MB).</span>
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                        <span>Signature: Make sure your Signature is Correct  (Max: 1MB).</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="font-medium">Game Information</h3>
                                                <ul className="space-y-1 text-sm">
                                                    <li className="flex items-center gap-2">
                                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                        <span>ML ID: Your Mobile Legends account ID</span>
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                        <span>Server ID: Your game server ID</span>
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                        <span>Role: Choose from Ketua, Anggota, or Cadangan</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="pt-2">
                                            <h3 className="font-medium mb-2">Requirements</h3>
                                            <div className="flex flex-wrap gap-2">
                                                <Badge variant="outline" className="flex items-center gap-1">
                                                    <CheckCircle2 className="h-3 w-3" /> Min {minPlayers} players
                                                </Badge>
                                                <Badge variant="outline" className="flex items-center gap-1">
                                                    <CheckCircle2 className="h-3 w-3" /> Max {maxPlayers} players
                                                </Badge>
                                                <Badge variant="outline" className="flex items-center gap-1">
                                                    <CheckCircle2 className="h-3 w-3" /> Photo required
                                                </Badge>
                                                <Badge variant="outline" className="flex items-center gap-1">
                                                    <CheckCircle2 className="h-3 w-3" /> Signature required
                                                </Badge>
                                                <Badge variant="outline" className="flex items-center gap-1">
                                                    <CheckCircle2 className="h-3 w-3" /> Cadangan Maximum 2 Player (Choose Maximum 2 Player for Cadangan - Optional)
                                                </Badge>
                                                <Badge variant="outline" className="flex items-center gap-1">
                                                    <CheckCircle2 className="h-3 w-3" /> Choose 1 Player For Ketua Role
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardHeader>

                    <div className="px-8 pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Registration Progress</span>
                                <Badge className={themeColors.badge}>
                                    {data.ml_players.length}/{minPlayers} required players
                                </Badge>
                            </div>
                            <span className="text-sm font-medium">{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className={`h-2 ${themeColors.progressBg}`}>
                            <div className={`h-full ${themeColors.progress} rounded-full`} style={{ width: `${progress}%` }} />
                        </Progress>
                    </div>

                    <CardContent className="p-8">
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                <AnimatePresence>
                                    {(data.ml_players as MLPlayer[]).map((player, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <MLPlayerForm
                                                player={player}
                                                index={index}
                                                errorsBE={normalizedErrors}
                                                allPlayers={data.ml_players}
                                                onChange={(idx, field, val) => handlePlayerChange(idx, field, val)}
                                                onDelete={() => openDeleteDialog(index)}
                                            />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-4">
                                    <Button
                                        type="button"
                                        onClick={addNewPlayer}
                                        disabled={data.ml_players.length >= maxPlayers}
                                    >
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Add Player {data.ml_players.length < maxPlayers && `(${data.ml_players.length}/${maxPlayers})`}
                                    </Button>

                                    <Button
                                        type="submit"
                                        disabled={processing || data.ml_players.length < minPlayers || Object.keys(errors).length > 0}
                                        className={`w-full sm:w-auto ${themeColors.primary}`}
                                    >
                                        {processing ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            "Submit Team Registration"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Dialog for Deletion */}
                <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="flex items-center">
                                <AlertCircle className="mr-2 h-5 w-5 text-red-500" />
                                Confirm Player Removal
                            </DialogTitle>
                            <DialogDescription>
                                Are you sure you want to remove this player from your team? This action cannot be undone.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between w-full mt-4">
                            <Button onClick={closeDeleteDialog} variant="outline" className="w-full sm:w-auto">
                                <X className="mr-2 h-4 w-4" /> Cancel
                            </Button>
                            <Button onClick={deletePlayerHandler} variant="destructive" className="w-full sm:w-auto">
                                <Trash2 className="mr-2 h-4 w-4" /> Remove Player
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}

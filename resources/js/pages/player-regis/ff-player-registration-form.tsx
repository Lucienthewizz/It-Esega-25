<<<<<<< HEAD
 
=======
"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { router, Head } from "@inertiajs/react"
import { motion, AnimatePresence } from "framer-motion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
// import { FFPlayerForm } from "@/components/registration/ml-player-form"
import { AlertCircle, CheckCircle2, PlusCircle, Trash2, X, Users, Trophy, ChevronLeft, HelpCircle, Loader2 } from "lucide-react"
import { useProgressFF } from "@/hooks/use-progress-ff"
import { useFFPlayers } from "@/hooks/use-ff-player"
import type { FFPlayer, PlayerRegistrationFormProps } from "@/types/register"
import { FFPlayerForm } from "@/components/registration/ff-player-form"

export default function PlayerRegistrationForm({ teamData, gameType }: PlayerRegistrationFormProps) {
    const isFF = gameType === "ff"
    const gameTitle = isFF ? "Free Fire" : ""
    const minPlayers = 4
    const maxPlayers = 6

    const themeColors = {
        primary: "bg-red-600 hover:bg-red-700 text-white",
        secondary: "bg-red-500/10 text-red-600 hover:bg-red-500/20",
        badge: "bg-red-100 text-red-800",
        progress: "bg-red-600",
        progressBg: "bg-red-100",
        border: "border-red-200",
        text: "text-red-600",
        gradient: "bg-gradient-to-r from-red-600 to-red-800",
        alert: "bg-red-600/90 border-red-200",
        success: "bg-green-600/90 border-green-200",
        card: "bg-white shadow-lg rounded-xl border border-gray-100",
        section: "bg-gray-50/50 rounded-xl p-6"
    }

    const [formData, setFormData] = useState<{
        ff_players: FFPlayer[];
        team_id: number;
    }>({
        ff_players: [],
        team_id: teamData.id ?? 0,
    })

    const [alertMessage, setAlertMessage] = useState("")
    const [showValidationError, setShowValidationError] = useState(false)
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [playerToDelete, setPlayerToDelete] = useState<number | null>(null)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const progress = useProgressFF(formData.ff_players, minPlayers)

    const hasLoadedPlayersFromStorage = useRef(false)

    useEffect(() => {
        if (!hasLoadedPlayersFromStorage.current) {
            const saved = localStorage.getItem("ff_players_data")
            if (saved && formData.ff_players.length === 0) {
                try {
                    const parsed = JSON.parse(saved)
                    if (Array.isArray(parsed)) setFormData(prev => ({ ...prev, ff_players: parsed }))
                } catch (e) {
                    console.error("Failed to parse saved players", e)
                }
            }
            hasLoadedPlayersFromStorage.current = true
        }
    }, [formData.ff_players])

    useEffect(() => {
        localStorage.setItem("ff_players_data", JSON.stringify(formData.ff_players))
    }, [formData.ff_players])

    const { addPlayer, deletePlayer } = useFFPlayers(
        { ff_players: formData.ff_players },
        (key: "ff_players", value: FFPlayer[]) => setFormData(prev => ({ ...prev, [key]: value })),
        teamData.id
    )

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.ff_players.length < minPlayers) {
            setShowValidationError(true)
            setAlertMessage(`Kamu Butuh minimal ${minPlayers} Pemain untuk melakukan Submit Form.`)
            setTimeout(() => {
                setShowValidationError(false)
            }, 5000)
            return
        }

        setIsSubmitting(true)

        try {
            // Create FormData for file upload
            const submitData = new FormData()
            submitData.append('team_id', formData.team_id.toString())

            // Log data yang akan dikirim
            console.log('Submitting data:', formData.ff_players)

            formData.ff_players.forEach((player: FFPlayer, index: number) => {
                // Append player data
                submitData.append(`ff_players[${index}][name]`, player.name || '')
                submitData.append(`ff_players[${index}][nickname]`, player.nickname || '')
                submitData.append(`ff_players[${index}][id_server]`, player.id_server || '')
                submitData.append(`ff_players[${index}][no_hp]`, player.no_hp || '')
                submitData.append(`ff_players[${index}][email]`, player.email || '')
                submitData.append(`ff_players[${index}][alamat]`, player.alamat || '')
                submitData.append(`ff_players[${index}][ff_team_id]`, formData.team_id.toString())
                submitData.append(`ff_players[${index}][role]`, player.role || 'anggota')

                // Handle file uploads dengan format yang benar
                if (player.foto instanceof File) {
                    console.log(`Uploading foto for player ${index}:`, player.foto.name)
                    submitData.append(`ff_players_${index}_foto`, player.foto)
                }
                if (player.tanda_tangan instanceof File) {
                    console.log(`Uploading tanda_tangan for player ${index}:`, player.tanda_tangan.name)
                    submitData.append(`ff_players_${index}_tanda_tangan`, player.tanda_tangan)
                }
            })

            // Debug: Log semua data yang akan dikirim
            console.log('Form data entries:')
            for (const [key, value] of submitData.entries()) {
                console.log(`${key}:`, value instanceof File ? `File: ${value.name}` : value)
            }

            // Tambahkan game type ke form data
            submitData.append('game_type', gameType)

            router.post(route("player-registration.store"), submitData, {
                onSuccess: () => {
                    setSuccessMessage("Pendaftaran berhasil!")
                    setShowSuccessAlert(true)
                    setTimeout(() => {
                        setShowSuccessAlert(false)
                    }, 3000)
                },
                onError: (errors) => {
                    console.error('Validation errors:', errors)
                    setShowValidationError(true)
                    setAlertMessage("Terjadi kesalahan validasi. Silakan periksa kembali data yang diinput.")
                    setTimeout(() => {
                        setShowValidationError(false)
                    }, 5000)
                },
                onFinish: () => {
                    setIsSubmitting(false)
                }
            })
        } catch (error) {
            console.error('Error submitting form:', error)
            setShowValidationError(true)
            setAlertMessage("Terjadi kesalahan saat mengirim form. Silakan coba lagi.")
            setTimeout(() => {
                setShowValidationError(false)
            }, 5000)
            setIsSubmitting(false)
        }
    }

    const handlePlayerChange = (
        index: number,
        field: keyof FFPlayer,
        value: string | number | File | null | undefined
    ) => {
        const newValue = value !== null && value !== undefined ? value : ""
        setFormData(prev => ({
            ...prev,
            ff_players: prev.ff_players.map((player, i) =>
                i === index ? { ...player, [field]: newValue } : player
            )
        }))
    }

    const addNewPlayer = () => {
        if (formData.ff_players.length < maxPlayers) {
            addPlayer()
            setSuccessMessage("Player baru berhasil ditambahkan!")
            setShowSuccessAlert(true)
            setTimeout(() => {
                setShowSuccessAlert(false)
            }, 3000)
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
        }
    }

    const handleBack = () => {
        router.visit('/register')
    }

    const handleEmergencyContact = () => {
        // Ganti nomor WhatsApp sesuai dengan nomor panitia yang diperlukan
        const phoneNumber = "628113985061" // Format: kode negara tanpa + diikuti nomor HP
        const message = `Halo, saya butuh bantuan terkait pendaftaran pemain ${gameTitle}.`
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
    }

    return (
        <>
            <Head title={`${gameTitle} Player Registration`} />

            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
                {/* Navigation Container */}
                <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-red-100 shadow-sm">
                    <div className="max-w-[1350px] mx-auto px-4 md:px-8 lg:px-12">
                        <div className="flex items-center justify-between h-16">
                            {/* Back Button */}
                            <motion.button
                                onClick={handleBack}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 rounded-lg transition-colors duration-300"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronLeft className="w-5 h-5" />
                                <span>Back to Team Registration</span>
                            </motion.button>

                            {/* Progress Indicator */}
                            <div className="flex items-center gap-6">
                                <div className="flex items-center">
                                    {[1, 2, 3].map((s, index) => (
                                        <div key={s} className="flex items-center">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${s < 3
                                                    ? 'bg-gradient-to-br from-red-600 to-red-500 text-white shadow-lg shadow-red-200'
                                                    : s === 3
                                                        ? 'bg-gradient-to-br from-red-600 to-red-500 text-white shadow-lg shadow-red-200'
                                                        : 'bg-red-100 text-red-400'
                                                    }`}
                                            >
                                                <span className="text-sm font-semibold">{s}</span>
                                            </div>
                                            {index < 2 && (
                                                <div className="w-8 h-0.5 bg-red-200"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="hidden md:block">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-700">Step</span>
                                        <span className="text-sm font-semibold text-red-600">3</span>
                                        <span className="text-sm font-medium text-gray-700">of</span>
                                        <span className="text-sm font-semibold text-red-600">3</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="pt-16">
                    {/* Alerts Section */}
                    <div className="fixed top-20 right-4 z-50 w-auto max-w-[800px] space-y-2">
                        <AnimatePresence>
                            {showValidationError && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Alert variant="destructive" className={`${themeColors.alert} p-3`}>
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle className="text-sm">Error</AlertTitle>
                                        <AlertDescription className="text-slate-900 text-xs">{alertMessage}</AlertDescription>
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
                                    <Alert className={`${themeColors.success} p-3`}>
                                        <CheckCircle2 className="h-4 w-4" />
                                        <AlertTitle className="text-sm">Success</AlertTitle>
                                        <AlertDescription className="text-slate-900 text-xs">{successMessage}</AlertDescription>
                                    </Alert>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="max-w-6xl mx-auto space-y-8">
                        {/* Header Section */}
                        <Card className={`${themeColors.card} border-0 shadow-xl`}>
                            <CardHeader className={`p-8 ${themeColors.gradient} text-white rounded-t-xl`}>
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                    <div className="flex items-center gap-6">
                                        <div className="bg-white/10 p-4 rounded-xl">
                                            <img
                                                src={
                                                    teamData.team_logo
                                                        ? typeof teamData.team_logo === 'string'
                                                            ? `/storage/${teamData.team_logo}`
                                                            : teamData.team_logo instanceof File
                                                                ? URL.createObjectURL(teamData.team_logo)
                                                                : '/images/default-team-logo.png'
                                                        : '/images/default-team-logo.png'
                                                }
                                                alt={`Team ${teamData.team_name} Logo`}
                                                className="w-20 h-20 object-contain rounded-lg"
                                                onError={(e) => {
                                                    e.currentTarget.src = '/images/default-team-logo.png'
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <CardTitle className="text-4xl font-bold mb-2">{gameTitle} Registration</CardTitle>
                                            <CardDescription className="text-white/90 text-lg">
                                                Team: <span className="font-medium">{teamData.team_name}</span>
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                            <Users className="w-5 h-5" />
                                            <span className="font-medium">{formData.ff_players.length}/{maxPlayers} Players</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                                            <Trophy className="w-5 h-5" />
                                            <span className="font-medium">Min. {minPlayers} Players</span>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>

                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-600">Registration Progress</span>
                                        <Badge className={themeColors.badge}>
                                            {formData.ff_players.length}/{minPlayers} required players
                                        </Badge>
                                    </div>
                                    <span className="text-sm font-medium text-gray-600">{Math.round(progress)}%</span>
                                </div>
                                <Progress value={progress} className={`h-2 ${themeColors.progressBg}`}>
                                    <div className={`h-full ${themeColors.progress} rounded-full`} style={{ width: `${progress}%` }} />
                                </Progress>
                            </div>
                        </Card>

                        {/* Players Section */}
                        <Card className={themeColors.card}>
                            <CardContent className="p-8">
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="space-y-8">
                                        <AnimatePresence>
                                            {formData.ff_players.map((player, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    data-player-form
                                                >
                                                    <div className={themeColors.section}>
                                                        <FFPlayerForm
                                                            player={player}
                                                            index={index}
                                                            errorsBE={{}}
                                                            allPlayers={formData.ff_players}
                                                            onChange={(idx, field, val) => handlePlayerChange(idx, field, val)}
                                                            onDelete={() => openDeleteDialog(index)}
                                                        />
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>

                                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-6 border-t border-gray-200">
                                            <Button
                                                type="button"
                                                onClick={addNewPlayer}
                                                disabled={formData.ff_players.length >= maxPlayers || isSubmitting}
                                                className={themeColors.secondary}
                                            >
                                                <PlusCircle className="mr-2 h-4 w-4" />
                                                Add Player {formData.ff_players.length < maxPlayers && `(${formData.ff_players.length}/${maxPlayers})`}
                                            </Button>

                                            <Button
                                                type="submit"
                                                disabled={formData.ff_players.length < minPlayers || isSubmitting}
                                                className={`w-full sm:w-auto ${themeColors.primary} relative`}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    'Submit Team Registration'
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

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

                {/* Emergency Contact Button */}
                <button
                    onClick={handleEmergencyContact}
                    className="fixed bottom-6 right-6 bg-white hover:bg-[#ba0000]/10 text-[#ba0000] p-4 rounded-full
                    shadow-[0_4px_20px_-3px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_25px_-5px_rgba(186,0,0,0.2)]
                    transform hover:scale-110 transition-all duration-300 group z-50 border border-[#ba0000]/20"
                    title="Need help? Contact committee"
                >
                    <div className="relative">
                        <HelpCircle className="w-6 h-6" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                    </div>
                    <span className="sr-only">Contact Committee</span>
                </button>
            </div>
        </>
    )
}
>>>>>>> rama

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
import { AlertCircle, PlusCircle, Trash2, X, Users, Trophy, HelpCircle, ArrowLeft } from "lucide-react"
import { useProgressFF } from "@/hooks/use-progress-ff"
import { useFFPlayers } from "@/hooks/use-ff-player"
import type { FFPlayer, PlayerRegistrationFormProps } from "@/types/register"
import { FFPlayerForm } from "@/components/registration/ff-player-form"
import LoadingScreen from "@/components/ui/loading-screen"
import SuccessDialog from "@/components/ui/success-dialog"

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
    const [showLoadingScreen, setShowLoadingScreen] = useState(false)
    const [showSuccessDialog, setShowSuccessDialog] = useState(false)

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

    const validatePhoneNumber = (phone: string) => {
        if (!phone) return true
        const cleanPhone = phone.replace(/\D/g, '')
        return cleanPhone.length >= 10 && cleanPhone.length <= 15
    }
    
    const handlePlayerChange = (
        index: number,
        field: keyof FFPlayer,
        value: string | number | File | null | undefined
    ) => {
        const newValue = value !== null && value !== undefined ? value : ""
        
        // Update the form data first
        const updatedPlayers = formData.ff_players.map((player, i) =>
            i === index ? { ...player, [field]: newValue } : player
        )
        
        setFormData(prev => ({
            ...prev,
            ff_players: updatedPlayers
        }))
        
        if (field === 'no_hp' && typeof newValue === 'string' && newValue.trim() !== '') {
            if (!validatePhoneNumber(newValue)) {
                setShowValidationError(true)
                setAlertMessage("Nomor HP harus terdiri dari 10 hingga 15 digit angka.")
                setTimeout(() => {
                    setShowValidationError(false)
                }, 10000)
            }
        }
    }
    
    const simulateFileUploadProgress = () => {
        // Dummy function untuk backward compatibility
        return setInterval(() => {}, 1000);
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
    
        if (!teamData?.id) {
            setShowValidationError(true)
            setAlertMessage("Data tim tidak valid. Silakan coba lagi.")
            setTimeout(() => {
                setShowValidationError(false)
            }, 10000)
            return
        }
    
        const teamId = teamData.id
    
        // Validasi jumlah pemain
        if (formData.ff_players.length < minPlayers) {
            setShowValidationError(true)
            setAlertMessage(`Minimal harus ada ${minPlayers} pemain.`)
            setTimeout(() => {
                setShowValidationError(false)
            }, 10000)
            return
        }

        // Validasi field wajib untuk semua pemain
        const invalidPlayers = formData.ff_players.map((player, index) => {
            const errors = [];
            
            // Cek field wajib
            if (!player.name || player.name.trim() === '') errors.push('nama');
            if (!player.nickname || player.nickname.trim() === '') errors.push('nickname');
            if (!player.id_server || player.id_server.trim() === '') errors.push('ID server');
            if (!player.no_hp || player.no_hp.trim() === '') errors.push('nomor HP');
            if (!player.email || player.email.trim() === '') errors.push('email');
            
            return errors.length > 0 ? { index, errors } : null;
        }).filter(Boolean);

        if (invalidPlayers.length > 0) {
            const firstInvalid = invalidPlayers[0] as { index: number, errors: string[] };
            const playerNumber = firstInvalid.index + 1;
            const fields = firstInvalid.errors.join(', ');
            
            setShowValidationError(true);
            setAlertMessage(`Pemain #${playerNumber} memiliki field yang belum diisi: ${fields}. Silakan lengkapi semua field wajib.`);
            setTimeout(() => {
                setShowValidationError(false);
            }, 10000);
            return;
        }

        // Validasi format email
        const invalidEmailPlayers = formData.ff_players.map((player, index) => {
            if (!player.email) return null;
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return !emailRegex.test(player.email) ? index : null;
        }).filter(item => item !== null);

        if (invalidEmailPlayers.length > 0) {
            const playerNumber = invalidEmailPlayers[0] + 1;
            
            setShowValidationError(true);
            setAlertMessage(`Format email pemain #${playerNumber} tidak valid. Gunakan format email yang benar (contoh: nama@domain.com).`);
            setTimeout(() => {
                setShowValidationError(false);
            }, 10000);
            return;
        }
        
        // Validasi foto dan tanda tangan
        const playersWithoutFoto = formData.ff_players.filter(player => !player.foto);
        const playersWithoutTandaTangan = formData.ff_players.filter(player => !player.tanda_tangan);

        if (playersWithoutFoto.length > 0) {
            setShowValidationError(true)
            setAlertMessage(`Foto pemain belum dilengkapi untuk ${playersWithoutFoto.length} pemain. Silakan upload foto untuk semua pemain.`)
            setTimeout(() => {
                setShowValidationError(false)
            }, 10000)
            return
        }

        if (playersWithoutTandaTangan.length > 0) {
            setShowValidationError(true)
            setAlertMessage(`Tanda tangan pemain belum dilengkapi untuk ${playersWithoutTandaTangan.length} pemain. Silakan upload tanda tangan untuk semua pemain.`)
            setTimeout(() => {
                setShowValidationError(false)
            }, 10000)
            return
        }

        setShowLoadingScreen(true)
        
        const progressInterval = simulateFileUploadProgress();

        try {
            const submitData = new FormData()
            submitData.append('team_id', teamId.toString())
            submitData.append('ff_team_id', teamId.toString())

            formData.ff_players.forEach((player: FFPlayer, index: number) => {
                submitData.append(`ff_players[${index}][name]`, player.name || '')
                submitData.append(`ff_players[${index}][nickname]`, player.nickname || '')
                submitData.append(`ff_players[${index}][id_server]`, player.id_server || '')
                submitData.append(`ff_players[${index}][no_hp]`, player.no_hp || '')
                submitData.append(`ff_players[${index}][email]`, player.email || '')
                submitData.append(`ff_players[${index}][alamat]`, player.alamat || '')
                submitData.append(`ff_players[${index}][ff_team_id]`, teamId.toString())
                submitData.append(`ff_players[${index}][role]`, player.role || 'anggota')

                if (player.foto instanceof File) {
                    submitData.append(`ff_players_${index}_foto`, player.foto)
                }
                if (player.tanda_tangan instanceof File) {
                    submitData.append(`ff_players_${index}_tanda_tangan`, player.tanda_tangan)
                }
            })

            submitData.append('game_type', gameType)

            router.post(route("player-registration-ff.store"), submitData, {
                onSuccess: () => {
                    clearInterval(progressInterval);
                    
                    setTimeout(() => {
                        setFormData(prev => ({ ...prev, ff_players: [] }))
                        localStorage.removeItem("ff_players_data")
                        setShowLoadingScreen(false)
                        setShowSuccessDialog(true)
                    }, 3000);
                },
                onError: (errors) => {
                    clearInterval(progressInterval);
                    setShowLoadingScreen(false);
                    console.error('Validation errors:', errors)
                    setShowValidationError(true)
                    setAlertMessage("Terjadi kesalahan validasi. Silakan periksa kembali data yang diinput.")
                    setTimeout(() => {
                        setShowValidationError(false)
                    }, 10000)
                }
            })
        } catch (error) {
            clearInterval(progressInterval);
            setShowLoadingScreen(false);
            console.error('Error submitting form:', error)
            setShowValidationError(true)
            setAlertMessage("Terjadi kesalahan saat mengirim form. Silakan coba lagi.")
            setTimeout(() => {
                setShowValidationError(false)
            }, 10000)
        }
    }

    const addNewPlayer = () => {
        if (formData.ff_players.length < maxPlayers) {
            addPlayer()
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
        // Kembali ke halaman registrasi tim dengan membawa data tim yang sama
        const formDataToPass = {
            team_name: teamData.team_name || "",
            game_type: gameType,
            team_id: teamData.id || 0
        };
        
        // Gunakan query string untuk membawa data tim
        router.visit(route('register'), {
            data: {
                teamData: JSON.stringify(formDataToPass)
            }
        });
    }

    const handleEmergencyContact = () => {
        // Ganti nomor WhatsApp sesuai dengan nomor panitia yang diperlukan
        const phoneNumber = "6287861081640" // Format: kode negara tanpa + diikuti nomor HP
        const message = `Halo, saya butuh bantuan terkait pendaftaran pemain ${gameTitle}.`
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
    }

    const handleSuccessDialogClose = () => {
        router.visit('/')
    }

    return (
        <>
            <Head title={`${gameTitle} Player Registration`} />

            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-6 sm:py-12 px-3 sm:px-4">
                {/* Navigation Container */}
                <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-red-100 shadow-sm">
                    <div className="max-w-[1350px] mx-auto px-3 md:px-8 lg:px-12">
                        <div className="flex items-center justify-between h-14 sm:h-16">
                            {/* Back Button */}
                            <motion.button
                                onClick={handleBack}
                                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-red-600 hover:text-red-700 transition-colors rounded-md hover:bg-red-50/50"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                <span>Kembali</span>
                            </motion.button>

                            {/* Logo */}
                            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <img
                                    src="/logo.png"
                                    alt="IT ESEGA"
                                    className="h-8 sm:h-10 w-auto"
                                />
                            </div>

                            {/* Registration Section Text */}
                            <div className="text-xs sm:text-sm font-medium text-red-600 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md bg-red-50/50">
                                Pendaftaran Pemain
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Container */}
                <div className="max-w-[1350px] mx-auto pt-8">
                    <div className="mb-6 sm:mb-10">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-3 text-center">
                            Pendaftaran Pemain
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600 text-center max-w-2xl mx-auto">
                            Silahkan isi formulir pendaftaran di bawah ini dengan informasi yang valid dan benar.
                        </p>
                    </div>

                    {/* Alerts Section */}
                    <div className="fixed top-16 sm:top-20 right-3 sm:right-4 z-50 w-auto max-w-[90%] sm:max-w-[800px] space-y-2">
                        <AnimatePresence>
                            {showValidationError && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Alert variant="destructive" className={`${themeColors.alert} p-2 sm:p-3 text-xs sm:text-sm`}>
                                        <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                                        <AlertTitle className="text-xs sm:text-sm">Error</AlertTitle>
                                        <AlertDescription className="text-slate-900 text-xs">{alertMessage}</AlertDescription>
                                    </Alert>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-8rem)] relative">
                        <div className="w-full lg:w-4/5 p-4 sm:p-6 lg:p-10 flex items-center justify-center bg-gradient-to-br from-white to-red-50/40 backdrop-blur-sm overflow-y-auto mx-auto">
                            <div className="w-full max-w-5xl my-4 sm:my-6">
                                {/* Header Section */}
                                <Card className={`${themeColors.card} border-0 shadow-xl`}>
                                    <CardHeader className={`p-4 sm:p-8 ${themeColors.gradient} text-white rounded-t-xl`}>
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6">
                                            <div className="flex items-center gap-4 sm:gap-6">
                                                <div className="bg-white/10 p-2 sm:p-4 rounded-xl">
                                                    <img
                                                        src={
                                                            teamData.team_logo
                                                                ? typeof teamData.team_logo === 'string'
                                                                    ? `/storage/${teamData.team_logo}`
                                                                    : teamData.team_logo instanceof File
                                                                        ? URL.createObjectURL(teamData.team_logo)
                                                                        : '/Images/default-team-logo.png'
                                                                : '/Images/default-team-logo.png'
                                                        }
                                                        alt={`Team ${teamData.team_name} Logo`}
                                                        className="w-12 h-12 sm:w-20 sm:h-20 object-contain rounded-lg"
                                                        onError={(e) => {
                                                            e.currentTarget.src = '/Images/default-team-logo.png'
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-xl sm:text-4xl font-bold mb-1 sm:mb-2">{gameTitle} Registration</CardTitle>
                                                    <CardDescription className="text-white/90 text-sm sm:text-lg">
                                                        Team: <span className="font-medium">{teamData.team_name}</span>
                                                    </CardDescription>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 sm:gap-4 w-full md:w-auto justify-between md:justify-end">
                                                <div className="flex items-center gap-1 sm:gap-2 bg-white/10 px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-base">
                                                    <Users className="w-3 h-3 sm:w-5 sm:h-5" />
                                                    <span className="font-medium">{formData.ff_players.length}/{maxPlayers}</span>
                                                </div>
                                                <div className="flex items-center gap-1 sm:gap-2 bg-white/10 px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-base">
                                                    <Trophy className="w-3 h-3 sm:w-5 sm:h-5" />
                                                    <span className="font-medium">Min. {minPlayers}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <div className="p-4 sm:p-6">
                                        <div className="flex items-center justify-between mb-2 sm:mb-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs sm:text-sm font-medium text-gray-600">Registration Progress</span>
                                                <Badge className={themeColors.badge}>
                                                    {formData.ff_players.length}/{minPlayers}
                                                </Badge>
                                            </div>
                                            <span className="text-xs sm:text-sm font-medium text-gray-600">{Math.round(progress)}%</span>
                                        </div>
                                        <Progress value={progress} className={`h-1.5 sm:h-2 ${themeColors.progressBg}`}>
                                            <div className={`h-full ${themeColors.progress} rounded-full`} style={{ width: `${progress}%` }} />
                                        </Progress>
                                    </div>
                                </Card>

                                {/* Players Section */}
                                <Card className={`${themeColors.card} mt-6 sm:mt-8`}>
                                    <CardContent className="p-4 sm:p-7">
                                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                                            <div className="space-y-4 sm:space-y-8">
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

                                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-center pt-4 sm:pt-6 border-t border-gray-200">
                                                    <Button
                                                        type="button"
                                                        onClick={addNewPlayer}
                                                        disabled={formData.ff_players.length >= maxPlayers}
                                                        className={`${themeColors.secondary} w-full sm:w-auto text-xs sm:text-sm py-1.5 sm:py-2`}
                                                    >
                                                        <PlusCircle className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                                                        Add Player {formData.ff_players.length < maxPlayers && `(${formData.ff_players.length}/${maxPlayers})`}
                                                    </Button>

                                                    <Button
                                                        type="submit"
                                                        disabled={formData.ff_players.length < minPlayers}
                                                        className={`w-full sm:w-auto ${themeColors.primary} relative text-xs sm:text-sm py-1.5 sm:py-2`}
                                                    >
                                                        Submit Team Registration
                                                    </Button>
                                                </div>
                                            </div>
                                        </form>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>

                    {/* Dialog for Deletion */}
                    <Dialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                        <DialogContent className="sm:max-w-[425px] p-4 sm:p-6">
                            <DialogHeader>
                                <DialogTitle className="flex items-center text-base sm:text-lg">
                                    <AlertCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                                    Confirm Player Removal
                                </DialogTitle>
                                <DialogDescription className="text-xs sm:text-sm">
                                    Are you sure you want to remove this player from your team? This action cannot be undone.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between w-full mt-4">
                                <Button onClick={closeDeleteDialog} variant="outline" className="w-full sm:w-auto text-xs sm:text-sm py-1.5">
                                    <X className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Cancel
                                </Button>
                                <Button onClick={deletePlayerHandler} variant="destructive" className="w-full sm:w-auto text-xs sm:text-sm py-1.5">
                                    <Trash2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" /> Remove Player
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Emergency Contact Button */}
                <button
                    onClick={handleEmergencyContact}
                    className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 bg-white hover:bg-[#ba0000]/10 text-[#ba0000] p-3 sm:p-4 rounded-full
                    shadow-[0_4px_20px_-3px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_25px_-5px_rgba(186,0,0,0.2)]
                    transform hover:scale-110 transition-all duration-300 group z-50 border border-[#ba0000]/20"
                    title="Need help? Contact committee"
                >
                    <div className="relative">
                        <HelpCircle className="w-4 h-4 sm:w-6 sm:h-6" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                    </div>
                    <span className="sr-only">Contact Committee</span>
                </button>
            </div>

            <LoadingScreen isOpen={showLoadingScreen} />
            
            <SuccessDialog
                isOpen={showSuccessDialog}
                message="Selamat! Pendaftaran tim dan pemain Free Fire telah berhasil. Tim Anda telah terdaftar dalam kompetisi IT-ESEGA 2025. Silahkan tunggu informasi selanjutnya dari panitia."
                title="Pendaftaran Berhasil!"
                buttonText="Kembali ke Beranda"
                onClose={handleSuccessDialogClose}
            />
        </>
    )
}

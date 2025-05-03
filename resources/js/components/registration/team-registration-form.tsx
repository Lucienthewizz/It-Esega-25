"use client"

import { useForm } from "@inertiajs/react"
import { ChevronRight, Users, HelpCircle, FileWarning } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { QRCodeSection } from "@/components/registration/qr-code-section"
import { FileUploadField } from "@/components/registration/file-upload-field"
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import type { TeamRegistrationFormProps } from "@/types/register"
import { useState } from "react"

export function TeamRegistrationForm({ teamData, gameType, onSubmit, resetStep }: TeamRegistrationFormProps) {
    const isML = gameType === "ml"
    const gameTitle = isML ? "Mobile Legends" : "Free Fire"
    const registrationFee = "Rp 100.000"

    const [formErrors, setFormErrors] = useState<{
        team_name?: string;
        team_logo?: string;
        proof_of_payment?: string;
        [key: string]: string | undefined;
    }>({})


    const { data, setData, post, processing } = useForm({
        team_name: teamData.team_name || "",
        team_logo: teamData.team_logo || null,
        proof_of_payment: teamData.proof_of_payment || null,
        game_type: gameType,
    })


    console.log('game type', gameType);

    const [teamLogoPreview, setTeamLogoPreview] = useState<string | null>(null)
    const [paymentProofPreview, setPaymentProofPreview] = useState<string | null>(null)
    const [openDialog, setOpenDialog] = useState(false)

    const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB in bytes

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormErrors({})

        // Basic validations
        if (!data.team_name.trim() || !data.team_logo || !data.proof_of_payment) {
            if (!data.team_name.trim()) {
                setFormErrors(prev => ({ ...prev, team_name: "Team name is required" }))
            }
            if (!data.team_logo) {
                setFormErrors(prev => ({ ...prev, team_logo: "Team logo is required" }))
            }
            if (!data.proof_of_payment) {
                setFormErrors(prev => ({ ...prev, proof_of_payment: "Payment proof is required" }))
            }
            return
        }

        try {
            // Proceed with form submission
            post(route("team-registration.store"), {
                onSuccess: (response) => {
                    console.log('Form submitted successfully:', response)
                    const responseData = response.props as unknown as { id: number | null }
                    // Make sure we're passing the complete data
                    const submittedData = {
                        ...data,
                        id: responseData.id || null,
                    }
                    onSubmit(submittedData)
                },
                onError: (errors) => {
                    console.error('Validation errors:', errors)
                    
                    // Tampilkan pesan error duplikat nama tim dengan lebih jelas
                    if (errors.team_name && errors.team_name.includes('unique')) {
                        setFormErrors({
                            ...errors,
                            team_name: `Tim dengan nama "${data.team_name}" sudah terdaftar. Silakan gunakan nama tim yang lain.`
                        })
                    } else {
                        setFormErrors(errors)
                    }
                    
                    // Scroll ke bagian form dengan error
                    const firstError = document.querySelector('.text-red-500')
                    if (firstError) {
                        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
                    }
                },
                onFinish: () => {
                    console.log('Form submission finished')
                }
            })
        } catch (error) {
            console.error('Error submitting form:', error)
            setFormErrors({ general: "An error occurred while submitting the form" })
        }
    }

    const handleBackClick = () => {
        resetStep();
    }

    // Add logging for props and state changes
    console.log('Current game type:', gameType)
    console.log('Team data:', teamData)
    console.log('Form errors:', formErrors)

    const handleFileChange = (file: File | null, type: "team_logo" | "proof_of_payment") => {
        if (!file) {
            if (type === "team_logo") {
                setData("team_logo", null)
                setTeamLogoPreview(null)
            } else if (type === "proof_of_payment") {
                setData("proof_of_payment", null)
                setPaymentProofPreview(null)
            }
            return
        }

        if (file.size <= MAX_FILE_SIZE) {
            const reader = new FileReader()
            reader.onloadend = () => {
                if (type === "team_logo") {
                    setTeamLogoPreview(reader.result as string)
                    setData("team_logo", file)
                } else if (type === "proof_of_payment") {
                    setPaymentProofPreview(reader.result as string)
                    setData("proof_of_payment", file)
                }
            }
            reader.readAsDataURL(file)
        } else {
            setOpenDialog(true)
            if (type === "team_logo") {
                setData("team_logo", null)
                setTeamLogoPreview(null)
            } else if (type === "proof_of_payment") {
                setData("proof_of_payment", null)
                setPaymentProofPreview(null)
            }
        }
    }

    // Untuk Emergency Contact hubungin panitia
    const handleEmergencyContact = () => {
        // Ganti nomor WhatsApp sesuai dengan nomor panitia yang diperlukan
        const phoneNumber = "628113985061" // Format: kode negara tanpa + diikuti nomor HP
        const message = `Halo, saya butuh bantuan terkait pendaftaran tim ${gameTitle}.`
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
    }

    return (
        <div className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-4rem)] relative bg-gradient-to-br from-gray-50 to-white">
            <QRCodeSection
                resetStep={handleBackClick}
                title={`${gameTitle} Payment`}
                description="Scan the QR code below to complete your payment"
                instructions={[
                    "Buka aplikasi bank atau e-wallet Anda",
                    "Pindai kode QR di atas",
                    "Masukkan jumlah biaya pendaftaran",
                    "Selesaikan pembayaran",
                    "Ambil tangkapan layar bukti pembayaran Anda",
                ]}
                amount={`Biaya pendaftaran: ${registrationFee}`}
                gameType={gameType}
            />

            <div className="w-full lg:w-3/5 p-8 flex items-center justify-center bg-white/80 backdrop-blur-sm lg:rounded-l-3xl shadow-2xl">
                <div className="max-w-md w-full">
                    <div className="mb-8 text-center space-y-2">
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            {gameTitle} Team Registration
                        </h1>
                        <p className="text-sm text-gray-600">Lengkapi detail tim Anda untuk melanjutkan pendaftaran</p>
                    </div>

                    <Card className="border-0 shadow-lg bg-white/70 backdrop-blur rounded-2xl">
                        <CardContent className="p-6">
                            <form className="flex flex-col gap-6" onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="md:grid gap-6 flex flex-col">
                                    <div className="relative space-y-2">
                                        <Label htmlFor="team_name" className="text-sm font-semibold text-gray-700">
                                            Team Name
                                        </Label>
                                        <div className="relative group">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-gray-700 transition-colors duration-200">
                                                <Users className="h-5 w-5" />
                                            </div>
                                            <Input
                                                id="team_name"
                                                type="text"
                                                required
                                                value={data.team_name}
                                                onChange={(e) => setData("team_name", e.target.value)}
                                                placeholder="Enter your team name"
                                                className={`pl-10 py-5 bg-white/50 backdrop-blur border-gray-200 text-gray-900 rounded-xl 
                                                focus:border-[#ba0000] focus:ring focus:ring-[#ba0000]/20 focus:ring-opacity-50
                                                transition-all duration-200 hover:border-[#ba0000] shadow-sm
                                                placeholder:text-gray-400 placeholder:group-hover:text-[#ba0000]`}
                                            />
                                        </div>
                                        {formErrors.team_name && (
                                            <div className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                                {formErrors.team_name}
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <FileUploadField
                                                id="paymentProof"
                                                label="Payment Proof"
                                                helpText="PNG, JPG, JPEG Less 2MB"
                                                accept="image/*"
                                                value={data.proof_of_payment}
                                                onChange={(file) => handleFileChange(file, "proof_of_payment")}
                                            />
                                            {paymentProofPreview && (
                                                <div className="mt-2 flex justify-center">
                                                    <div className="relative group">
                                                        <img
                                                            src={paymentProofPreview}
                                                            alt="Payment Proof Preview"
                                                            className="w-40 h-auto rounded-lg shadow-md transition-transform duration-200 group-hover:scale-105"
                                                        />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                                                            <p className="text-white text-sm">Preview</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {formErrors.proof_of_payment && (
                                                <div className="text-red-500 text-sm flex items-center gap-1">
                                                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                                    {formErrors.proof_of_payment}
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-4">
                                            <FileUploadField
                                                id="teamLogo"
                                                label="Team Logo"
                                                accept="image/*"
                                                helpText="PNG, JPG, JPEG Less 2MB"
                                                value={data.team_logo}
                                                onChange={(file) => handleFileChange(file, "team_logo")}
                                            />
                                            {teamLogoPreview && (
                                                <div className="mt-2 flex justify-center">
                                                    <div className="relative group">
                                                        <img
                                                            src={teamLogoPreview}
                                                            alt="Team Logo Preview"
                                                            className="w-40 h-auto rounded-lg shadow-md transition-transform duration-200 group-hover:scale-105"
                                                        />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                                                            <p className="text-white text-sm">Preview</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {formErrors.team_logo && (
                                                <div className="text-red-500 text-sm flex items-center gap-1">
                                                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                                    {formErrors.team_logo}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className={`w-full py-6 bg-gradient-to-r from-[#ba0000] to-[#ba0000]/90 hover:from-[#ba0000]/90 hover:to-[#ba0000] 
                                            text-white rounded-xl font-medium text-lg transition-all duration-300 
                                            shadow-[0_0_15px_rgba(186,0,0,0.3)] hover:shadow-[0_0_25px_rgba(186,0,0,0.5)]
                                            flex items-center justify-center gap-2 relative overflow-hidden group`}
                                        >
                                            <span className="relative z-10 flex items-center gap-2">
                                                Continue to Player Registration
                                                <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                            </span>
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Emergency Contact Button */}
            <button
                onClick={handleEmergencyContact}
                className="fixed bottom-6 right-6 bg-white hover:bg-[#ba0000]/10 text-[#ba0000] p-4 rounded-full
                shadow-[0_4px_20px_-3px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_25px_-5px_rgba(186,0,0,0.2)]
                transform hover:scale-110 transition-all duration-300 group z-50 border border-[#ba0000]/20"
                title="Butuh bantuan? Hubungi panitia"
            >
                <div className="relative">
                    <HelpCircle className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                </div>
                <span className="sr-only">Hubungi Panitia</span>
            </button>

            {/* File Size Limit Dialog */}
            <Dialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
                <DialogContent className="sm:max-w-md bg-[#1a1a1a] border border-[#ba0000]/20 shadow-2xl p-0 overflow-hidden">
                    {/* Header */}
                    <div className="p-6 border-b border-[#ba0000]/10 bg-gradient-to-r from-[#ba0000]/10 to-transparent">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#ba0000]/10 rounded-full">
                                <FileWarning className="h-5 w-5 text-[#ba0000]" />
                            </div>
                            <DialogTitle className="text-lg font-semibold text-white m-0">
                                File Terlalu Besar
                            </DialogTitle>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 bg-[#1a1a1a]">
                        <DialogDescription className="text-base text-gray-400">
                            File yang Anda pilih melebihi batas maksimum yang diizinkan (2MB).
                            <div className="mt-4 p-4 bg-black/40 rounded-xl border border-red-500/10">
                                <ul className="text-sm text-gray-300 space-y-3">
                                    <li className="flex items-center gap-3">
                                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                        Pastikan ukuran file tidak lebih dari 2MB
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                        Format yang didukung: PNG, JPG, JPEG
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                        Kompres file jika diperlukan
                                    </li>
                                </ul>
                            </div>
                        </DialogDescription>

                        <div className="mt-6 flex justify-end">
                            <DialogClose asChild>
                                <Button
                                    className="bg-gradient-to-r from-[#ba0000] to-[#ba0000]/90 text-white 
                                    hover:from-[#ba0000]/90 hover:to-[#ba0000] px-6 py-2.5 rounded-lg 
                                    text-sm font-medium transition-all duration-300 
                                    shadow-[0_0_15px_rgba(186,0,0,0.3)] hover:shadow-[0_0_25px_rgba(186,0,0,0.5)]"
                                >
                                    Mengerti
                                </Button>
                            </DialogClose>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

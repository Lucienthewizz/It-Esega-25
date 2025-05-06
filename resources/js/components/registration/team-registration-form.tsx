"use client"

import { useForm } from "@inertiajs/react"
import { ChevronRight, Users, HelpCircle, FileWarning, ZoomIn, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { QRCodeSection } from "@/components/registration/qr-code-section"
import { FileUploadField } from "@/components/registration/file-upload-field"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import type { TeamRegistrationFormProps } from "@/types/register"
import { useState } from "react"
import LoadingScreen from "@/components/ui/loading-screen"

export function TeamRegistrationForm({ teamData, gameType, onSubmit, resetStep }: TeamRegistrationFormProps) {
    const isML = gameType === "ml"
    const gameTitle = isML ? "Mobile Legends" : "Free Fire"
    const registrationFee = "Rp 100.000"

    const [formErrors, setFormErrors] = useState<{
        team_name?: string;
        team_logo?: string;
        proof_of_payment?: string;
        slot_type?: string;
        [key: string]: string | undefined;
    }>({})

    const { data, setData, post, processing } = useForm({
        team_name: teamData.team_name || "",
        team_logo: teamData.team_logo || null,
        proof_of_payment: teamData.proof_of_payment || null,
        game_type: gameType,
        slot_type: isML ? (teamData.slot_type || "single") : "single",
    })

    console.log('game type', gameType);

    const [teamLogoPreview, setTeamLogoPreview] = useState<string | null>(null)
    const [paymentProofPreview, setPaymentProofPreview] = useState<string | null>(null)
    const [openDialog, setOpenDialog] = useState(false)

    // State untuk image zoom
    const [imageZoomOpen, setImageZoomOpen] = useState(false)
    const [zoomedImage, setZoomedImage] = useState<{src: string | null, alt: string} | null>(null)

    const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB in bytes

    // State untuk loading screen
    const [showLoadingScreen, setShowLoadingScreen] = useState(false)

    // Function untuk mensimulasikan progres upload
    const simulateFileUploadProgress = () => {
        // Return dummy interval untuk backward compatibility
        return setInterval(() => {}, 1000);
    };

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

        // Pastikan slot type adalah 'single' untuk Free Fire
        if (!isML) {
            setData("slot_type", "single")
        }

        // Show loading screen
        setShowLoadingScreen(true)
        
        // Start progress simulation
        const progressInterval = simulateFileUploadProgress();

        try {
            // Proceed with form submission
            post(route("team-registration.store"), {
                onSuccess: (response) => {
                    clearInterval(progressInterval);
                    
                    // Di sini kita tidak menampilkan success dialog dulu karena user harus 
                    // langsung dialihkan ke registration form player
                    const responseData = response.props as unknown as { id: number | null }
                    // Make sure we're passing the complete data
                    const submittedData = {
                        ...data,
                        id: responseData.id || null,
                    }
                    
                    // Setelah 1 detik, alihkan ke player registration
                    setTimeout(() => {
                        setShowLoadingScreen(false);
                    onSubmit(submittedData)
                    }, 1000);
                },
                onError: (errors) => {
                    clearInterval(progressInterval);
                    setShowLoadingScreen(false);
                    
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
            clearInterval(progressInterval);
            setShowLoadingScreen(false);
            console.error('Error submitting form:', error)
            setFormErrors({ general: "An error occurred while submitting the form" })
        }
    }

    // Menambahkan kembali fungsi handleBackClick
    const handleBackClick = () => {
        if (resetStep) {
        resetStep();
        }
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
        const phoneNumber = "6287861081640" // Format: kode negara tanpa + diikuti nomor HP
        const message = `Halo, saya butuh bantuan terkait pendaftaran tim ${gameTitle}.`
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
    }

    const openImageZoom = (src: string, alt: string) => {
        setZoomedImage({ src, alt })
        setImageZoomOpen(true)
    }

    return (
        <>
            <div className="flex flex-col lg:flex-row w-full min-h-[calc(100vh-4rem)] pt-16 relative">
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

                <div className="w-full lg:w-3/5 p-4 sm:p-6 lg:p-10 flex items-center justify-center bg-gradient-to-br from-white to-red-50/40 backdrop-blur-sm overflow-y-auto min-h-[calc(100vh-4rem)]">
                    <div className="max-w-2xl w-full my-4 sm:my-6">
                    <div className="mb-4 sm:mb-8 text-center space-y-1 sm:space-y-2">
                            <h1 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-red-800 bg-clip-text text-transparent">
                            {gameTitle} Team Registration
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-600">Lengkapi detail tim Anda untuk melanjutkan pendaftaran</p>
                    </div>

                        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur rounded-2xl">
                            <CardContent className="p-4 sm:p-7">
                            <form className="flex flex-col gap-4 sm:gap-6" onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="md:grid gap-4 sm:gap-6 flex flex-col">
                                    <div className="relative space-y-1 sm:space-y-2">
                                        <Label htmlFor="team_name" className="text-xs sm:text-sm font-semibold text-gray-700">
                                            Nama Tim
                                        </Label>
                                        <div className="relative group">
                                            <div className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 bg-red-50 p-1 sm:p-1.5 rounded-md group-hover:bg-red-100 transition-colors duration-200 shadow-sm">
                                                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                                            </div>
                                            <Input
                                                id="team_name"
                                                type="text"
                                                required
                                                value={data.team_name}
                                                onChange={(e) => setData("team_name", e.target.value)}
                                                placeholder="Masukkan nama tim esports Anda"
                                                className={`pl-10 sm:pl-14 py-4 sm:py-5 bg-white border-gray-200 text-gray-900 text-sm rounded-xl 
                                                    focus:border-red-500 focus:ring focus:ring-red-500/20 focus:ring-opacity-50
                                                    [&::placeholder]:text-gray-500 [&::placeholder]:text-xs sm:[&::placeholder]:text-sm [&::placeholder]:font-normal
                                                ${formErrors.team_name ? 'border-red-500' : ''}`}
                                            />
                                        </div>
                                        {formErrors.team_name && (
                                            <div className="flex items-center gap-1 sm:gap-2 text-red-500 text-xs sm:text-sm mt-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                </svg>
                                                <p>{formErrors.team_name}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Slot Type Selection for Mobile Legends */}
                                    {isML && (
                                        <div className="space-y-3">
                                            <Label htmlFor="slot_type" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                                    <line x1="8" y1="21" x2="16" y2="21"></line>
                                                    <line x1="12" y1="17" x2="12" y2="21"></line>
                                                </svg>
                                                Tipe Slot
                                            </Label>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                <div 
                                                    className={`border rounded-xl p-4 shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer
                                                    ${data.slot_type === "single" 
                                                        ? 'bg-red-50 border-red-200 ring-2 ring-red-500 ring-opacity-50' 
                                                        : 'bg-white/50 border-gray-200 hover:border-red-200'}`}
                                                    onClick={() => setData("slot_type", "single")}
                                                >
                                                    <div className="flex items-start space-x-3">
                                                        <div className={`mt-0.5 rounded-full w-5 h-5 flex items-center justify-center border-2 
                                                            ${data.slot_type === "single" 
                                                                ? 'border-red-500 bg-red-500' 
                                                                : 'border-gray-300'}`}
                                                        >
                                                            {data.slot_type === "single" && (
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold text-gray-800">Single Slot</h3>
                                                            <p className="text-xs text-gray-600 mt-1">1 Tim, 1 Slot Kompetisi</p>
                                                            <div className="mt-2 flex items-center">
                                                                <span className="inline-block px-2 py-1 text-xs font-medium rounded-md bg-red-100 text-red-800">Rp 100.000</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div 
                                                    className={`border rounded-xl p-4 shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer
                                                    ${data.slot_type === "double" 
                                                        ? 'bg-red-50 border-red-200 ring-2 ring-red-500 ring-opacity-50' 
                                                        : 'bg-white/50 border-gray-200 hover:border-red-200'}`}
                                                    onClick={() => setData("slot_type", "double")}
                                                >
                                                    <div className="flex items-start space-x-3">
                                                        <div className={`mt-0.5 rounded-full w-5 h-5 flex items-center justify-center border-2 
                                                            ${data.slot_type === "double" 
                                                                ? 'border-red-500 bg-red-500' 
                                                                : 'border-gray-300'}`}
                                                        >
                                                            {data.slot_type === "double" && (
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold text-gray-800">Double Slot</h3>
                                                            <p className="text-xs text-gray-600 mt-1">2 Tim, 2 Slot Kompetisi</p>
                                                            <div className="mt-2 flex items-center">
                                                                <span className="inline-block px-2 py-1 text-xs font-medium rounded-md bg-red-100 text-red-800">Rp 200.000</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                                {/* Pesan pengingat untuk Double Slot - Kotak terpisah */}
                                                {data.slot_type === "double" && (
                                                    <div className="mt-4 p-4 bg-white/80 border border-gray-200 rounded-lg shadow-sm animate-fade-in">
                                                        <div className="flex items-start gap-3">
                                                            <div className="bg-gray-100 rounded-full p-2 shadow-sm">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                            </div>
                                                            <div className="flex-1">
                                                                <h4 className="font-semibold text-gray-800 text-sm mb-1">Petunjuk Double Slot</h4>
                                                                <p className="text-sm text-gray-600">
                                                                    Untuk Double Slot, Anda perlu mengisi formulir pendaftaran dua kali. Setelah mendaftarkan tim pertama, silakan ulangi proses untuk mendaftarkan tim kedua.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Slot type for Free Fire */}
                                        {!isML && (
                                            <div className="space-y-3">
                                                <Label htmlFor="slot_type" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                                                        <line x1="8" y1="21" x2="16" y2="21"></line>
                                                        <line x1="12" y1="17" x2="12" y2="21"></line>
                                                    </svg>
                                                    Tipe Slot
                                                </Label>
                                                <div className="grid grid-cols-1 gap-3">
                                                    <div 
                                                        className="border rounded-xl p-4 shadow-sm bg-red-50 border-red-200 ring-2 ring-red-500 ring-opacity-50"
                                                    >
                                                        <div className="flex items-start space-x-3">
                                                            <div className="mt-0.5 rounded-full w-5 h-5 flex items-center justify-center border-2 border-red-500 bg-red-500">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                            </div>
                                                            <div className="flex-1">
                                                                <h3 className="font-semibold text-gray-800">Single Slot</h3>
                                                                <p className="text-xs text-gray-600 mt-1">1 Tim, 1 Slot Kompetisi</p>
                                                                <div className="mt-2 flex items-center">
                                                                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-md bg-red-100 text-red-800">Rp 100.000</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="bg-white/80 p-4 rounded-lg border border-red-100 text-sm text-gray-600">
                                                        <p>Untuk game Free Fire, kami hanya menyediakan slot tunggal per tim.</p>
                                                    </div>
                                                </div>
                                        </div>
                                    )}

                                        <div className="space-y-5">
                                            <div className="space-y-3">
                                            <FileUploadField
                                                id="proof_of_payment"
                                                label="Bukti Pembayaran"
                                                helpText="PNG, JPG, JPEG Maksimal 2MB"
                                                accept="image/jpeg,image/png,image/jpg"
                                                value={data.proof_of_payment}
                                                onChange={(file) => handleFileChange(file, "proof_of_payment")}
                                            />
                                            {paymentProofPreview && (
                                                <div className="mt-2 flex justify-center">
                                                    <div className="relative group">
                                                        <img
                                                            src={paymentProofPreview}
                                                            alt="Payment Proof Preview"
                                                            className="w-40 h-auto rounded-lg shadow-md transition-transform duration-200 group-hover:scale-105 cursor-pointer"
                                                            onClick={() => openImageZoom(paymentProofPreview, "Payment Proof Preview")}
                                                        />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                                                            <button 
                                                                type="button" 
                                                                onClick={() => openImageZoom(paymentProofPreview, "Payment Proof Preview")}
                                                                className="p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors"
                                                            >
                                                                <ZoomIn className="w-5 h-5 text-gray-700" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {formErrors.proof_of_payment && (
                                                <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                    </svg>
                                                    <p>{formErrors.proof_of_payment}</p>
                                                </div>
                                            )}
                                        </div>

                                            <div className="space-y-3">
                                            <FileUploadField
                                                id="team_logo"
                                                label="Logo Tim"
                                                accept="image/jpeg,image/png,image/jpg"
                                                helpText="PNG, JPG, JPEG Maksimal 2MB"
                                                value={data.team_logo}
                                                onChange={(file) => handleFileChange(file, "team_logo")}
                                            />
                                            {teamLogoPreview && (
                                                <div className="mt-2 flex justify-center">
                                                    <div className="relative group">
                                                        <img
                                                            src={teamLogoPreview}
                                                            alt="Preview Logo Tim"
                                                            className="w-40 h-auto rounded-lg shadow-md transition-transform duration-200 group-hover:scale-105 cursor-pointer"
                                                            onClick={() => openImageZoom(teamLogoPreview, "Preview Logo Tim")}
                                                        />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                                                            <button 
                                                                type="button" 
                                                                onClick={() => openImageZoom(teamLogoPreview, "Preview Logo Tim")}
                                                                className="p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors"
                                                            >
                                                                <ZoomIn className="w-5 h-5 text-gray-700" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {formErrors.team_logo && (
                                                <div className="flex items-center gap-2 text-red-500 text-sm mt-1">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                    </svg>
                                                    <p>{formErrors.team_logo}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="pt-2 sm:pt-4">
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                                className={`w-full py-4 sm:py-5 md:py-6 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600
                                            text-white rounded-xl font-medium text-sm sm:text-base md:text-lg transition-all duration-300 
                                                shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.5)]
                                            flex items-center justify-center gap-1 sm:gap-2 relative overflow-hidden group`}
                                        >
                                            <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                                                {processing ? "Memproses..." : "Lanjut ke Pendaftaran Pemain"}
                                                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" />
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
                    className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 bg-white hover:bg-red-50 text-red-600 p-2 sm:p-3 md:p-4 rounded-full
                    shadow-[0_4px_20px_-3px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_25px_-5px_rgba(220,38,38,0.3)]
                    transform hover:scale-110 transition-all duration-300 group z-50 border border-red-200"
                title="Butuh bantuan? Hubungi panitia"
            >
                <div className="relative">
                        <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                </div>
                <span className="sr-only">Hubungi Panitia</span>
            </button>

            {/* File Size Limit Dialog */}
            <Dialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
                    <DialogContent className="sm:max-w-md bg-[#1a1a1a] border border-red-500/20 shadow-2xl p-0 overflow-hidden">
                    {/* Header */}
                        <div className="p-6 border-b border-red-500/10 bg-gradient-to-r from-red-500/10 to-transparent">
                        <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-500/10 rounded-full">
                                    <FileWarning className="h-5 w-5 text-red-500" />
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
                            <button
                                type="button"
                                onClick={() => setOpenDialog(false)}
                                className="bg-red-600 hover:bg-red-700 text-white 
                                    px-6 py-2.5 rounded-lg 
                                text-sm font-medium transition-all duration-300 
                                    shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.5)]"
                            >
                                Mengerti
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Image Zoom Dialog */}
            <Dialog open={imageZoomOpen} onOpenChange={setImageZoomOpen}>
                <DialogContent className="max-w-[95vw] sm:max-w-[80vw] max-h-[90vh] overflow-hidden p-0 bg-white/5 backdrop-blur-xl border border-white/20" hasCloseButton={false}>
                    <div className="relative h-full w-full flex items-center justify-center pt-10 sm:pt-12 pb-4 px-2 sm:px-4">
                        {zoomedImage?.src && (
                            <img 
                                src={zoomedImage.src} 
                                alt={zoomedImage.alt} 
                                className="max-w-full max-h-[80vh] object-contain"
                            />
                        )}
                        <button 
                            type="button"
                            onClick={() => setImageZoomOpen(false)}
                            className="absolute top-2 sm:top-4 right-2 sm:right-4 p-1.5 sm:p-2 rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors z-10"
                        >
                            <X className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
            
            <LoadingScreen isOpen={showLoadingScreen} />
        </>
    )
}

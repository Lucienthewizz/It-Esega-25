"use client"

import { useForm } from "@inertiajs/react"
import { ChevronRight, Users } from "lucide-react"
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
    const themeColor = isML ? "purple" : "orange"
    const gameTitle = isML ? "Mobile Legends" : "Free Fire"
    const registrationFee = isML ? "Rp 200.000" : "Rp 150.000"

    const { data, setData, post, processing, errors } = useForm({
        team_name: teamData.team_name || "",
        team_logo: teamData.team_logo || null,
        proof_of_payment: teamData.proof_of_payment || null,
        game_type: gameType,
    })

    const [teamLogoPreview, setTeamLogoPreview] = useState<string | null>(null)
    const [paymentProofPreview, setPaymentProofPreview] = useState<string | null>(null)
    const [openDialog, setOpenDialog] = useState(false)

    const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB in bytes

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        post(route("team-registration.store"), {
            onSuccess: () => {
                onSubmit(data)
            },
            onError: (errors) => {
                console.log(errors)
            }
        })
    }

    const handleBackClick = () => {
        resetStep();
    }

    const handleFileChange = (file: File | null, type: "team_logo" | "proof_of_payment") => {
        if (file && file.size <= MAX_FILE_SIZE) {
            const reader = new FileReader()
            reader.onloadend = () => {
                if (type === "team_logo") {
                    setTeamLogoPreview(reader.result as string)
                } else if (type === "proof_of_payment") {
                    setPaymentProofPreview(reader.result as string)
                }
            }
            reader.readAsDataURL(file)

            if (type === "team_logo") {
                setData("team_logo", file)
            } else if (type === "proof_of_payment") {
                setData("proof_of_payment", file)
            }
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

    return (
        <>
            <div className="flex flex-col lg:flex-row w-full min-h-screen">

                <QRCodeSection
                    resetStep={handleBackClick}
                    title={`${gameTitle} Payment`}
                    description="Scan the QR code below to complete your payment"
                    instructions={[
                        "Open your banking or e-wallet app",
                        "Scan the QR code above",
                        "Enter the registration fee amount",
                        "Complete the payment",
                        "Take a screenshot of your payment receipt",
                    ]}
                    amount={`Registration fee: ${registrationFee}`}
                    gameType={gameType}
                />

                <div className="w-full lg:w-3/5 p-8 flex items-center justify-center bg-white lg:rounded-l-3xl shadow-xl">
                    <div className="max-w-md w-full">
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{gameTitle} Team Registration</h1>
                            <p className="text-gray-600">Enter your team details to begin registration</p>
                        </div>

                        <Card className="border-0 shadow-none dark:bg-slate-50">
                            <CardContent className="p-0">
                                <form className="flex flex-col gap-6" onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="grid gap-5">
                                        <div className="relative">
                                            <Label htmlFor="team_name">Team Name</Label>
                                            <div className="relative">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                    <Users className="h-5 w-5" />
                                                </div>
                                                <Input
                                                    id="team_name"
                                                    type="text"
                                                    required
                                                    value={data.team_name}
                                                    onChange={(e) => setData("team_name", e.target.value)}
                                                    placeholder="Enter your team name"
                                                    className={`pl-10 py-6 bg-gray-50 border-gray-200 text-slate-900 rounded-xl focus:border-${themeColor}-300 focus:ring focus:ring-${themeColor}-200 focus:ring-opacity-50`}
                                                />
                                            </div>
                                            {errors.team_name && (
                                                <div className="text-red-500 text-sm mt-1">{errors.team_name}</div>
                                            )}
                                        </div>

                                        <FileUploadField
                                            id="paymentProof"
                                            label="Payment Proof"
                                            helpText="PNG, JPG, JPEG Less 2MB"
                                            accept="image/*"
                                            value={data.proof_of_payment}
                                            onChange={(file) => handleFileChange(file, "proof_of_payment")}
                                        />
                                        {paymentProofPreview && (
                                            <div className="mt-2 items-center flex justify-center">
                                                <img src={paymentProofPreview} alt="Payment Proof Preview" className="w-44 h-auto rounded-lg" />
                                            </div>
                                        )}
                                        {errors.proof_of_payment && (
                                            <div className="text-red-500 text-sm mt-1">{errors.proof_of_payment}</div>
                                        )}

                                        <FileUploadField
                                            id="teamLogo"
                                            label="Team Logo"
                                            accept="image/*"
                                            helpText="PNG, JPG, JPEG Less 2MB"
                                            value={data.team_logo}
                                            onChange={(file) => handleFileChange(file, "team_logo")}
                                        />
                                        {teamLogoPreview && (
                                            <div className="mt-2 items-center flex justify-center">
                                                <img src={teamLogoPreview} alt="Team Logo Preview" className="w-44 h-auto rounded-lg" />
                                            </div>
                                        )}
                                        {errors.team_logo && (
                                            <div className="text-red-500 text-sm mt-1">{errors.team_logo}</div>
                                        )}

                                        <div className="flex justify-between">
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                className={`w-full py-6 bg-${themeColor}-600 hover:bg-${themeColor}-700 bg-purple-800 text-white rounded-xl font-medium text-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center`}
                                            >
                                                Continue to Player Registration
                                                <ChevronRight className="ml-2 h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <Dialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
                <DialogContent className="p-6 max-w-md">
                    <DialogTitle className="text-lg font-semibold text-red-600">File Melebihi Kapasitas</DialogTitle>
                    <DialogDescription className="text-sm ">
                        File hanya di perbolehkan di kisaran 2MB. Tolong pilih file yang lebih kecil.
                    </DialogDescription>
                    <div className="mt-4 flex justify-end">
                        <DialogClose asChild>
                            <Button variant="outline" className="">Tutup</Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

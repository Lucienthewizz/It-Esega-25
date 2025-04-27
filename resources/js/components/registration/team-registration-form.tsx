"use client"

import type React from "react"

import { useState } from "react"
import { ChevronRight, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { QRCodeSection } from "@/components/registration/qr-code-section"
import { FileUploadField } from "@/components/registration/file-upload-field"
import type { TeamData, TeamRegistrationFormProps } from "@/types/register"

export function TeamRegistrationForm({ teamData, gameType, onSubmit }: TeamRegistrationFormProps) {
    const [formData, setFormData] = useState<TeamData>(teamData)
    const isML = gameType === "ml"
    const themeColor = isML ? "purple" : "orange"
    const gameTitle = isML ? "Mobile Legends" : "Free Fire"
    const registrationFee = isML ? "Rp 200.000" : "Rp 150.000"

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    const paymentInstructions = [
        "Open your banking or e-wallet app",
        "Scan the QR code above",
        "Enter the registration fee amount",
        "Complete the payment",
        "Take a screenshot of your payment receipt",
    ]

    return (
        <div className="flex flex-col lg:flex-row w-full min-h-screen">
            <QRCodeSection
                title={`${gameTitle} Payment`}
                description="Scan the QR code below to complete your payment"
                instructions={paymentInstructions}
                amount={`Registration fee: ${registrationFee}`}
                gameType={gameType}
            />

            {/* Team Registration Form */}
            <div className="w-full lg:w-3/5 p-8 flex items-center justify-center bg-white lg:rounded-l-3xl shadow-xl">
                <div className="max-w-md w-full">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{gameTitle} Team Registration</h1>
                        <p className="text-gray-600">Enter your team details to begin registration</p>
                    </div>

                    <Card className="border-0 shadow-none dark:bg-slate-50">
                        <CardContent className="p-0">
                            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                                <div className="grid gap-5">
                                    <div className="relative">
                                        <Label htmlFor="teamName" className="text-sm font-medium text-gray-700 mb-1 block">
                                            Team Name
                                        </Label>
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                                <Users className="h-5 w-5" />
                                            </div>
                                            <Input
                                                id="teamName"
                                                type="text"
                                                required
                                                value={formData.teamName}
                                                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                                                placeholder="Enter your team name"
                                                className={`pl-10 py-6 bg-gray-50 border-gray-200 rounded-xl focus:border-${themeColor}-300 focus:ring focus:ring-${themeColor}-200 focus:ring-opacity-50`}
                                            />
                                        </div>
                                    </div>

                                    <FileUploadField
                                        id="paymentProof"
                                        label="Payment Proof"
                                        accept="image/*"
                                        value={formData.paymentProof}
                                        onChange={(file) => setFormData({ ...formData, paymentProof: file })}
                                    />

                                    <FileUploadField
                                        id="teamLogo"
                                        label="Team Logo"
                                        accept="image/*"
                                        value={formData.teamLogo}
                                        onChange={(file) => setFormData({ ...formData, teamLogo: file })}
                                    />

                                    <Button
                                        type="submit"
                                        className={`w-full py-6 bg-${themeColor}-600 hover:bg-${themeColor}-700 text-white rounded-xl  ${isML ? "bg-purple-700" : "bg-yellow-600"} font-medium text-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center`}
                                    >
                                        Continue to Player Registration
                                        <ChevronRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

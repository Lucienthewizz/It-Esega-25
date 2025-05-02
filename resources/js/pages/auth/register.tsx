"use client"

import { useState, useEffect } from "react"
import { GameSelectionForm } from "@/components/registration/game-selection-form"
import { TeamRegistrationForm } from "@/components/registration/team-registration-form"
import type { TeamData } from "@/types/register"
import { Head, router } from "@inertiajs/react"
import { motion } from "framer-motion"
import AOS from "aos"
import "aos/dist/aos.css"
import { ChevronLeft, ArrowLeft } from "lucide-react"

export default function RegisterPage() {
    const [step, setStep] = useState(1)
    const [gameType, setGameType] = useState<"ml" | "ff">("ml")
    const [teamData, setTeamData] = useState<TeamData>({
        id: null,
        team_name: "",
        proof_of_payment: null,
        team_logo: null,
    })

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out-cubic',
            offset: 100,
            delay: 0,
            mirror: false,
            anchorPlacement: 'top-bottom',
        });
    }, []);

    const handleGameSelect = (game: "ml" | "ff") => {
        setGameType(game)
        setStep(2)
    }

    const handleTeamSubmit = (data: TeamData) => {
        setTeamData(data)
        setStep(3)
    }

    const resetStep = () => {
        setStep(1)
        setGameType("ml")
        setTeamData({
            id: null,
            team_name: "",
            proof_of_payment: null,
            team_logo: null,
        })
    }

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1)
        } else {
            router.visit('/')
        }
    }

    return (
        <>
            <Head title="Register Team" />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-y-auto">
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
                                {step > 1 ? (
                                    <>
                                        <ChevronLeft className="w-5 h-5" />
                                        <span>Previous Step</span>
                                    </>
                                ) : (
                                    <>
                                        <ArrowLeft className="w-5 h-5" />
                                        <span>Back to Home</span>
                                    </>
                                )}
                            </motion.button>

                            {/* Progress Indicator */}
                            <div className="flex items-center gap-6">
                                <div className="flex items-center">
                                    {[1, 2, 3].map((s, index) => (
                                        <div key={s} className="flex items-center">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                                                    s <= step 
                                                        ? 'bg-gradient-to-br from-red-600 to-red-500 text-white shadow-lg shadow-red-200' 
                                                        : 'bg-gray-100 text-gray-400'
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
                                        <span className="text-sm font-semibold text-red-600">{step}</span>
                                        <span className="text-sm font-medium text-gray-700">of</span>
                                        <span className="text-sm font-semibold text-gray-700">3</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="pt-16">
                    {step === 1 ? (
                        <div className="relative overflow-hidden min-h-[calc(100vh-4rem)]">
                            {/* Background Layer */}
                            <div className="absolute inset-0 bg-white"></div>
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white via-red-50/40 to-red-100/30"></div>

                            {/* Cross Blob - Top Left */}
                            <div className="absolute -left-12 top-24 w-28 h-28 opacity-5 pointer-events-none">
                                <motion.div
                                    animate={{
                                        rotate: [0, -360],
                                    }}
                                    transition={{
                                        duration: 28,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="w-full h-full"
                                >
                                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-red-500">
                                        <path d="M85,40 h30 v45 h45 v30 h-45 v45 h-30 v-45 h-45 v-30 h45 z"/>
                                    </svg>
                                </motion.div>
                            </div>

                            {/* Cross Blob - Bottom Right */}
                            <div className="absolute right-8 bottom-16 w-20 h-20 opacity-5 pointer-events-none">
                                <motion.div
                                    animate={{
                                        rotate: [360, 0],
                                    }}
                                    transition={{
                                        duration: 22,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="w-full h-full"
                                >
                                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-red-500">
                                        <path d="M85,40 h30 v45 h45 v30 h-45 v45 h-30 v-45 h-45 v-30 h45 z"/>
                                    </svg>
                                </motion.div>
                            </div>
                            
                            {/* Content Container */}
                            <div className="relative z-10 max-w-[1350px] mx-auto px-4 md:px-8 lg:px-12 py-16 flex flex-col justify-center min-h-[calc(100vh-4rem)]">
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-800 mb-3" data-aos="fade-down">
                                        Select Your <span className="text-red-600">Game</span>
                                    </h2>
                                    <div className="w-20 sm:w-24 h-1 bg-red-600 mx-auto rounded-full mb-4" data-aos="fade-down" data-aos-delay="50"></div>
                                    <p className="text-gray-500 font-medium tracking-wide" data-aos="fade-down" data-aos-delay="100">
                                        ― Select your game to proceed to the next step ―
                                    </p>
                                </div>

                                <div className="flex-1 flex items-center justify-center">
                                    <GameSelectionForm onGameSelect={handleGameSelect} />
                                </div>
                            </div>
                        </div>
                    ) : step === 2 ? (
                        <TeamRegistrationForm
                            teamData={teamData}
                            gameType={gameType}
                            onSubmit={handleTeamSubmit}
                            resetStep={resetStep}
                        />
                    ) : (
                        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-8">
                            <div className="max-w-md w-full text-center space-y-4">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Registration Successful!</h2>
                                <p className="text-gray-600">Your team has been successfully registered. Player registration will be available soon.</p>
                                <button
                                    onClick={resetStep}
                                    className="mt-4 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                                >
                                    Register Another Team
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

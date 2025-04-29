"use client"

import { Gamepad2, Smartphone } from "lucide-react"
import type { GameSelectionFormProps } from "@/types/register"
import { motion } from "framer-motion"

export function GameSelectionForm({ onGameSelect }: GameSelectionFormProps) {
    const games = [
        {
            id: "ml",
            title: "Mobile Legends",
            slots: "64 SLOTS",
            type: "SINGLE SLOT",
            scope: "NATIONAL COMPETITION",
            date: "JULY 1st, 2nd, 8th, 9th",
            mode: "ONLINE",
            image: "/images/ML-logo.png",
            bgImage: "/images/ml-bg.png",
            icon: Smartphone,
            color: "from-purple-500 to-indigo-600",
            hoverColor: "hover:border-purple-400",
            textColor: "text-purple-600",
            bgColor: "bg-purple-100",
            fee: "Rp 200.000",
        },
        {
            id: "ff",
            title: "Free Fire",
            slots: "64 SLOTS",
            type: "SINGLE SLOT",
            scope: "NATIONAL COMPETITION",
            date: "JULY 1st, 2nd, 8th, 9th",
            mode: "ONLINE",
            image: "/images/FF-logo.png",
            bgImage: "/images/FF-bg.jpg",
            icon: Gamepad2,
            color: "from-orange-500 to-red-600",
            hoverColor: "hover:border-orange-400",
            textColor: "text-orange-600",
            bgColor: "bg-orange-100",
            fee: "Rp 150.000",
        }
    ]

    return (
        <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {games.map((game) => (
                        <motion.div
                            key={game.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative w-full overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:shadow-2xl border-2 border-red-500/50 hover:border-red-500 p-3"
                            style={{ height: '600px' }}
                            onClick={() => onGameSelect(game.id as "ml" | "ff")}
                        >
                            {/* Background Game Image */}
                            <div 
                                className="absolute inset-0 m-3 rounded-xl bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                style={{
                                    backgroundImage: `url(${game.bgImage})`,
                                }}
                            />
                            
                            {/* Dark Overlay on Hover */}
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/90 via-black/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                            {/* Content Container */}
                            <div className="relative h-full w-full flex flex-col items-center justify-center">
                                {/* Game Logo Container */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                                    <div className="flex justify-center items-center rounded-full p-8 transition-all duration-500 group-hover:-translate-y-[80%]">
                                        <img
                                            src={game.image}
                                            alt={`${game.title} Logo`}
                                            className="h-42 w-auto object-contain transition-all duration-500 group-hover:scale-140"
                                        />
                                    </div>
                                </div>

                                {/* Content that appears on hover */}
                                <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center p-8 my-5 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                                    <h3 className="text-center text-2xl font-bold mb-4 text-white">
                                        {game.title} <span className="text-red-400">Tournament</span>
                                        <div className="w-64 h-0.5 mt-2 bg-red-400 mx-auto rounded-full"></div>
                                    </h3>

                                    <div className="space-y-2 mb-6 text-center">
                                        <p className="text-white/90 text-lg font-bold">{game.slots}</p>
                                        <p className="text-white/90 text-base">{game.type}</p>
                                        <p className="text-white/90 text-base">{game.scope}</p>
                                        <p className="text-white/90 text-base font-semibold">{game.date}</p>
                                        <p className="text-white/90 text-base font-bold">{game.mode}</p>
                                        <div className="mt-2 pt-2 border-t border-red-400/30">
                                            <p className="text-white/90 text-sm">Registration Fee</p>
                                            <p className="text-white text-base font-semibold">{game.fee}</p>
                                        </div>
                                    </div>

                                    <button
                                        className="inline-block rounded-lg bg-red-600 px-8 py-3 text-white text-base font-semibold transition-all duration-300 hover:bg-red-700 hover:shadow-lg transform hover:scale-105"
                                    >
                                        Select {game.title}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

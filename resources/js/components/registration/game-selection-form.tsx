"use client"

import { Gamepad2, Smartphone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { GameSelectionFormProps } from "@/types/register"

export function GameSelectionForm({ onGameSelect }: GameSelectionFormProps) {
    return (
        <div className="container mx-auto py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Gaming Tournament Registration</h1>
                    <p className="text-xl text-gray-600">Select your game to begin registration</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card
                        className="overflow-hidden hover:shadow-xl dark:bg-slate-50 transition-shadow duration-300 cursor-pointer border-2 hover:border-purple-400"
                        onClick={() => onGameSelect("ml")}
                    >
                        <div className="h-48 bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
                            <Smartphone className="h-24 w-24 text-white" />
                        </div>
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">Mobile Legends</h2>
                            <p className="text-gray-600 text-center mb-4">5v5 MOBA Tournament</p>
                            <ul className="space-y-2 text-sm  text-gray-800">
                                <li className="flex items-center">
                                    <span className="h-5 w-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs mr-2">
                                        ✓
                                    </span>
                                    <span>5 players minimum</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="h-5 w-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs mr-2">
                                        ✓
                                    </span>
                                    <span>Registration fee: Rp 200.000</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="h-5 w-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs mr-2">
                                        ✓
                                    </span>
                                    <span>Prize pool: Rp 10.000.000</span>
                                </li>
                            </ul>
                            <div className="mt-6 text-center">
                                <span className="inline-block bg-purple-100 text-purple-800 text-sm font-medium px-4 py-2 rounded-full">
                                    Select Mobile Legends
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card
                        className="overflow-hidden hover:shadow-xl dark:bg-slate-50 transition-shadow duration-300 cursor-pointer border-2 hover:border-orange-400"
                        onClick={() => onGameSelect("ff")}
                    >
                        <div className="h-48 bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
                            <Gamepad2 className="h-24 w-24 text-white" />
                        </div>
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-bold text-center mb-2  text-gray-900">Free Fire</h2>
                            <p className="text-gray-600 text-center mb-4">Battle Royale Tournament</p>
                            <ul className="space-y-2 text-sm  text-gray-800">
                                <li className="flex items-center">
                                    <span className="h-5 w-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs mr-2">
                                        ✓
                                    </span>
                                    <span>4 players minimum</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="h-5 w-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs mr-2">
                                        ✓
                                    </span>
                                    <span>Registration fee: Rp 150.000</span>
                                </li>
                                <li className="flex items-center">
                                    <span className="h-5 w-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs mr-2">
                                        ✓
                                    </span>
                                    <span>Prize pool: Rp 8.000.000</span>
                                </li>
                            </ul>
                            <div className="mt-6 text-center">
                                <span className="inline-block bg-orange-100 text-orange-800 text-sm font-medium px-4 py-2 rounded-full">
                                    Select Free Fire
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

import { CreditCard } from "lucide-react"
import type { QRCodeSectionProps } from "@/types/register"
import { motion } from "framer-motion"

export function QRCodeSection({ title, description, instructions, amount, gameType }: QRCodeSectionProps) {
    return (
        <div className="w-full lg:w-2/5 p-8 flex flex-col items-center justify-center bg-white shadow-lg lg:shadow-none">
            <div className="max-w-md w-full space-y-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <div className="flex items-center justify-center mb-6">
                        <div className="p-4 rounded-full bg-red-50 shadow-sm">
                            <CreditCard className="h-8 w-8 text-red-600" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
                    <p className="text-sm text-gray-600 max-w-md mx-auto">{description}</p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col items-center"
                >
                    <div className="border-2 border-red-100 p-3 rounded-xl shadow-md bg-white relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 opacity-50"></div>
                        <div className="relative">
                            <img
                                src={`/placeholder.svg?height=300&width=300&text=${gameType.toUpperCase()} QR Code`}
                                alt={`${gameType.toUpperCase()} Payment QR Code`}
                                className="w-64 h-64 object-cover rounded-lg"
                            />
                        </div>
                        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                            SCAN ME
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <span className="inline-block bg-red-100 text-red-800 text-sm font-medium px-4 py-2 rounded-full">
                            {amount}
                        </span>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-red-50 p-4 rounded-xl border border-red-100"
                >
                    <h3 className="text-sm font-medium text-gray-900 flex items-center mb-3">
                        <span className="flex h-6 w-6 rounded-full bg-red-600 text-white items-center justify-center mr-2 text-xs">
                            ?
                        </span>
                        Payment Instructions
                    </h3>
                    <ol className="text-sm text-gray-600 space-y-4">
                        {instructions.map((instruction, index) => (
                            <li 
                                key={index} 
                                className={`flex items-start ${index < instructions.length - 1 ? 'pb-2 border-b border-red-100' : ''}`}
                            >
                                <span className="flex h-5 w-5 rounded-full bg-red-100 text-red-600 text-xs items-center justify-center mr-3 mt-0.5">
                                    {index + 1}
                                </span>
                                <span className="flex-1">{instruction}</span>
                            </li>
                        ))}
                    </ol>
                </motion.div>
            </div>
        </div>
    )
}

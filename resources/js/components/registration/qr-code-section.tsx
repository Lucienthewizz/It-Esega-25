import { ArrowLeft, CreditCard } from "lucide-react"
import type { QRCodeSectionProps } from "@/types/register"
import { Button } from "../ui/button"

export function QRCodeSection({ title, description, instructions, amount, gameType, resetStep }: QRCodeSectionProps) {
    const isML = gameType === "ml"
    const themeColor = isML ? "purple" : "orange"
    const gradientFrom = isML ? "purple-50" : "orange-50"
    const gradientTo = isML ? "purple-100" : "orange-100"
    const borderColor = isML ? "purple-100" : "orange-100"
    const badgeBg = isML ? "purple-600" : "orange-600"
    const amountBg = isML ? "purple-100" : "orange-100"
    const amountText = isML ? "purple-800" : "orange-800"

    return (
        <div className="w-full lg:w-2/5 p-8 flex flex-col items-center justify-center bg-white shadow-lg lg:shadow-none">

            <div className="max-w-md w-full space-y-8">
                <Button
                    type="button"
                    onClick={resetStep}
                    variant='destructive'
                >
                    <ArrowLeft />
                    Back
                </Button>
                <div className="text-center">
                    <div className="flex items-center justify-center mb-4">
                        <CreditCard className={`h-8 w-8 text-${themeColor}-600`} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                    <p className="mt-2 text-sm text-gray-600">{description}</p>
                </div>

                <div className="mt-8 flex flex-col items-center">
                    <div className={`border-2 border-${borderColor} p-3 rounded-xl shadow-md bg-white relative overflow-hidden`}>
                        <div
                            className={`absolute inset-0 bg-gradient-to-br from-${gradientFrom} to-${gradientTo} opacity-50`}
                        ></div>
                        <div className="relative">
                            <img
                                src={`/placeholder.svg?height=300&width=300&text=${gameType.toUpperCase()} QR Code`}
                                alt={`${gameType.toUpperCase()} Payment QR Code`}
                                className="w-64 h-64 object-cover rounded-lg"
                            />
                        </div>
                        <div className={`absolute top-2 right-2 bg-${badgeBg} text-white text-xs font-bold px-2 py-1 rounded-full`}>
                            SCAN ME
                        </div>
                    </div>
                    <div className="mt-6 text-center">
                        <span
                            className={`inline-block bg-${amountBg} text-${amountText} text-sm font-medium px-3 py-1 rounded-full`}
                        >
                            {amount}
                        </span>
                    </div>
                </div>

                <div className={`mt-6 bg-${gradientFrom} p-5 rounded-xl border border-${borderColor}`}>
                    <h3 className="text-sm font-medium text-gray-900 flex items-center">
                        <span
                            className={`flex h-6 w-6 rounded-full bg-${badgeBg} text-white items-center justify-center mr-2 text-xs`}
                        >
                            ?
                        </span>
                        Payment Instructions
                    </h3>
                    <ol className="mt-3 text-sm text-gray-600 list-decimal list-inside space-y-2">
                        {instructions.map((instruction, index) => (
                            <li key={index} className={index < instructions.length - 1 ? `pb-2 border-b border-${borderColor}` : ""}>
                                {instruction}
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    )
}

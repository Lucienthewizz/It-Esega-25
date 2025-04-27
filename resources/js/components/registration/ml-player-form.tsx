"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { MLPlayer, PlayerFormProps } from "@/types/register"

export function MLPlayerForm({ player, index, onChange }: PlayerFormProps) {
    const mlPlayer = player as MLPlayer

    return (
        <div className="border border-gray-200 rounded-xl p-6 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Player {index + 1}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor={`ml-name-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                    </Label>
                    <Input
                        id={`ml-name-${index}`}
                        value={mlPlayer.name}
                        onChange={(e) => onChange(index, "name", e.target.value)}
                        required
                        placeholder="Player's full name"
                        className="bg-white border-gray-200 rounded-lg"
                    />
                </div>

                <div>
                    <Label htmlFor={`ml-id-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        ML ID
                    </Label>
                    <Input
                        id={`ml-id-${index}`}
                        value={mlPlayer.id}
                        onChange={(e) => onChange(index, "id", e.target.value)}
                        required
                        placeholder="Mobile Legends ID"
                        className="bg-white border-gray-200 rounded-lg"
                    />
                </div>

                <div>
                    <Label htmlFor={`ml-server-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Server ID
                    </Label>
                    <Input
                        id={`ml-server-${index}`}
                        value={mlPlayer.server}
                        onChange={(e) => onChange(index, "server", e.target.value)}
                        required
                        placeholder="Server ID"
                        className="bg-white border-gray-200 rounded-lg"
                    />
                </div>

                <div>
                    <Label htmlFor={`ml-role-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                    </Label>
                    <Input
                        id={`ml-role-${index}`}
                        value={mlPlayer.role}
                        onChange={(e) => onChange(index, "role", e.target.value)}
                        required
                        placeholder="Player role (e.g., Tank, Marksman)"
                        className="bg-white border-gray-200 rounded-lg"
                    />
                </div>

                <div>
                    <Label htmlFor={`ml-phone-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                    </Label>
                    <Input
                        id={`ml-phone-${index}`}
                        value={mlPlayer.phone}
                        onChange={(e) => onChange(index, "phone", e.target.value)}
                        required
                        placeholder="Phone number"
                        className="bg-white border-gray-200 rounded-lg"
                    />
                </div>

                <div>
                    <Label htmlFor={`ml-email-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </Label>
                    <Input
                        id={`ml-email-${index}`}
                        type="email"
                        value={mlPlayer.email}
                        onChange={(e) => onChange(index, "email", e.target.value)}
                        required
                        placeholder="Email address"
                        className="bg-white border-gray-200 rounded-lg"
                    />
                </div>
            </div>
        </div>
    )
}

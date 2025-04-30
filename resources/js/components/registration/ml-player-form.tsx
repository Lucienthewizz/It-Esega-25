"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2 } from "lucide-react"
import { MLPlayer, PlayerFormProps } from "@/types/register"



export function MLPlayerForm({ player, index, onChange, onDelete, allPlayers }: PlayerFormProps) {
    const [photoPreview, setPhotoPreview] = useState<string | null>(null)
    const [signaturePreview, setSignaturePreview] = useState<string | null>(null)
    const [errors, setErrors] = useState<{ nickname?: string; id_server?: string; email?: string; alamat?: string; role?: string; foto?: string; tanda_tangan?: string }>({})

    const validateField = (field: keyof MLPlayer, value: string) => {
        switch (field) {
            case 'nickname':
                return /^[a-zA-Z0-9_]+$/.test(value) ? undefined : 'Nickname hanya boleh alfanumerik dan underscore.'
            case 'id_server':
                return /^[\d()]+$/.test(value) ? undefined : 'Server ID hanya boleh angka dan tanda kurung ().'
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? undefined : 'Format email tidak valid.'
            case 'alamat':
                return value.trim().length >= 10 ? undefined : 'Alamat harus minimal 10 karakter.'
            case 'no_hp':
                return /^\d{1,15}$/.test(value)
                    ? undefined
                    : 'No HP harus berupa angka dan maksimal 15 digit.'
            default:
                return undefined
        }
    }



    useEffect(() => {
        setPhotoPreview(player.foto || null)
        setSignaturePreview(player.tanda_tangan || null)
    }, [player.foto, player.tanda_tangan])

    const handleInputChange = <K extends keyof MLPlayer>(field: K) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        const err = validateField(field, val)
        setErrors(prev => ({ ...prev, [field]: err }))
        onChange(index, field, val as MLPlayer[K])
    }

    const handleFileChange = (field: "foto" | "tanda_tangan") => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0]
        if (!file) return

        const maxSize = 1 * 1024 * 1024 // 1MB
        if (file.size > maxSize) {
            setErrors(prev => ({ ...prev, [field]: "File size must be less than or equal to 1MB." }))
            return
        }

        setErrors(prev => ({ ...prev, [field]: undefined }))

        const reader = new FileReader()
        reader.onload = () => {
            const result = reader.result as string
            if (field === "foto") {
                setPhotoPreview(result)
            } else {
                setSignaturePreview(result)
            }
        }
        reader.readAsDataURL(file)

        onChange(index, field, file as unknown as MLPlayer[typeof field])
    }



    const handleRoleChange = (value: MLPlayer["role"]) => {
        const ketuaCount = allPlayers.filter((p: MLPlayer) => p.role === "ketua").length
        const cadanganCount = allPlayers.filter((p: MLPlayer) => p.role === "cadangan").length

        if (value === "ketua" && ketuaCount >= 1) {
            setErrors(prev => ({ ...prev, role: "Only one Ketua is allowed." }))
        } else if (value === "cadangan" && cadanganCount >= 2) {
            setErrors(prev => ({ ...prev, role: "Only two Cadangan are allowed." }))
        } else {
            setErrors(prev => ({ ...prev, role: undefined }))
        }

        onChange(index, "role", value)
    }


    return (
        <div className="border  rounded-xl p-6 w-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium ">Player {index + 1}</h3>
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={onDelete}
                    className="text-red-700 hover:text-red-200 bg-red-50 hover:bg-red-500"
                >
                    <Trash2 className="w-5 h-5" />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                    ["name", "Full Name", "Player's full name"],
                    ["nickname", "Nickname", "In-game nickname"],
                    ["id_server", "Server ID", "Server ID"],
                    ["no_hp", "Phone Number", "Phone number"],
                    ["email", "Email", "Email address"],
                ].map(([field, label, placeholder]) => (
                    <div key={field}>
                        <Label htmlFor={`ml-${field}-${index}`} className="block mb-1">
                            {label}
                        </Label>
                        <Input
                            id={`ml-${field}-${index}`}
                            value={player[field as keyof MLPlayer] as string}
                            onChange={handleInputChange(field as keyof MLPlayer)}
                            placeholder={placeholder}
                            className="rounded-lg"
                            required
                        />
                        {["nickname", "id_server", "email", "alamat", "no_hp"].includes(field) && errors[field as keyof typeof errors] && (
                            <p className="text-red-500 text-sm mt-1">{errors[field as keyof typeof errors]}</p>
                        )}
                    </div>
                ))}
                <div>
                    <Label htmlFor={`ml-role-${index}`} className="block mb-1">Role</Label>
                    <Select
                        value={player.role}
                        onValueChange={handleRoleChange}
                    >
                        <SelectTrigger className="rounded-lg">
                            <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ketua">Ketua</SelectItem>
                            <SelectItem value="anggota">Anggota</SelectItem>
                            <SelectItem value="cadangan">Cadangan</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.role && <p className="text-red-500 text-sm mt-2">{errors.role}</p>}
                </div>

                <div className="md:col-span-2">
                    <Label htmlFor={`ml-alamat-${index}`} className="block mb-1">Address</Label>
                    <Input
                        id={`ml-alamat-${index}`}
                        value={player.alamat}
                        onChange={handleInputChange("alamat")}
                        placeholder="Full address"
                        className="   rounded-lg"
                        required
                    />
                </div>

                {[
                    ["foto", "Foto Selfie (wajib terlihat wajah peserta, bukan gambar acak)", photoPreview],
                    ["tanda_tangan", "Tanda Tangan", signaturePreview],
                ].map(([field, label, preview]) => (
                    <div key={field}>
                        <Label htmlFor={`ml-${field}-${index}`} className="block mb-1">{label}</Label>
                        <Input
                            id={`ml-${field}-${index}`}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange(field as "foto" | "tanda_tangan")}
                        />
                        {errors[field as "foto" | "tanda_tangan"] && (
                            <p className="text-red-500 text-sm mt-1">{errors[field as "foto" | "tanda_tangan"]}</p>
                        )}

                        {preview && (
                            <img
                                src={preview}
                                alt={`${label} Preview`}
                                className="mt-2 max-h-32 object-contain border rounded"
                            />
                        )}
                    </div>
                ))}
            </div>



        </div>
    )
}

"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2 } from "lucide-react"
import { MLPlayer, PlayerFormProps } from "@/types/register"

export function MLPlayerForm({ player, index, onChange, onDelete, allPlayers, errorsBE }: PlayerFormProps) {
    const [photoPreview, setPhotoPreview] = useState<string | null>(null)
    const [signaturePreview, setSignaturePreview] = useState<string | null>(null)
    const [errors, setErrors] = useState<Partial<Record<keyof MLPlayer, string>>>({})
    const [fileNames, setFileNames] = useState<{ foto: string; tanda_tangan: string }>({ foto: '', tanda_tangan: '' })

    const validateField = (field: keyof MLPlayer, value: string) => {
        if (!value) return undefined; // Don't show error for empty fields initially
        
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
        // Handle initial preview for existing files
        if (player.foto) {
            if (typeof player.foto === 'string') {
                setPhotoPreview(`/storage/${player.foto}`)
            } else if (player.foto instanceof File) {
                const reader = new FileReader()
                reader.onload = () => {
                    setPhotoPreview(reader.result as string)
                }
                reader.readAsDataURL(player.foto)
            }
        }

        if (player.tanda_tangan) {
            if (typeof player.tanda_tangan === 'string') {
                setSignaturePreview(`/storage/${player.tanda_tangan}`)
            } else if (player.tanda_tangan instanceof File) {
                const reader = new FileReader()
                reader.onload = () => {
                    setSignaturePreview(reader.result as string)
                }
                reader.readAsDataURL(player.tanda_tangan)
            }
        }
    }, [player.foto, player.tanda_tangan])

    useEffect(() => {
        if (errorsBE) {
            setErrors(prev => {
                const newErrors = { ...prev }
                Object.keys(errorsBE).forEach(key => {
                    newErrors[key as keyof MLPlayer] = errorsBE[key]
                })
                return newErrors
            })
        }
    }, [errorsBE])


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
        if (!file) {
            return
        }

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg']
        if (!validTypes.includes(file.type)) {
            setErrors(prev => ({ ...prev, [field]: "File harus berupa gambar (JPG atau PNG)." }))
            return
        }

        // Validate file size (1MB)
        const maxSize = 1 * 1024 * 1024
        if (file.size > maxSize) {
            setErrors(prev => ({ ...prev, [field]: "Ukuran file maksimal 1MB." }))
            return
        }

        // Clear error if exists
        setErrors(prev => {
            const newErrors = { ...prev }
            delete newErrors[field]
            return newErrors
        })

        // Update file name
        setFileNames(prev => ({ ...prev, [field]: file.name }))

        // Create preview
        const reader = new FileReader()
        reader.onload = () => {
            if (field === "foto") {
                setPhotoPreview(reader.result as string)
            } else if (field === "tanda_tangan") {
                setSignaturePreview(reader.result as string)
            }
        }
        reader.readAsDataURL(file)

        // Send the actual File object to parent
        onChange(index, field, file)
    }

    const handleDeleteFile = (field: "foto" | "tanda_tangan") => {
        if (field === "foto") {
            setPhotoPreview(null)
        } else {
            setSignaturePreview(null)
        }
        setFileNames(prev => ({ ...prev, [field]: '' }))
        onChange(index, field, null)
        
        // Clear error if exists
        setErrors(prev => {
            const newErrors = { ...prev }
            delete newErrors[field]
            return newErrors
        })
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

    const renderError = (field: keyof MLPlayer) => {
        const beKey = `ml_players.${index}.ml_players.${index}.${field}`;
        const backendError = errorsBE?.[beKey];
        const frontendError = errors[field];
        const errorMessage = frontendError ?? backendError;

        if (typeof errorMessage === "string" && errorMessage.trim() !== "") {
            return (
                <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{errorMessage}</span>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="border border-red-100 rounded-xl p-6 w-full bg-white shadow-sm">
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
                        <span className="text-red-700 font-medium">{index + 1}</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Player {index + 1}</h3>
                        <p className="text-sm text-gray-500">Data Pemain</p>
                    </div>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={onDelete}
                    className="text-red-700 hover:text-red-200 bg-red-50 hover:bg-red-500 border-red-200"
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                {/* Personal Information Section */}
                <div className="space-y-4 md:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor={`ml-name-${index}`} className="text-sm font-medium text-gray-700">
                                Nama Lengkap <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id={`ml-name-${index}`}
                                value={player.name}
                                onChange={handleInputChange("name")}
                                placeholder="Nama lengkap pemain"
                                className="rounded-md border-gray-200 focus:border-red-300 focus:ring-red-200 text-sm text-gray-900 placeholder:text-gray-400 bg-white"
                                required
                            />
                            {renderError("name")}
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor={`ml-nickname-${index}`} className="text-sm font-medium text-gray-700">
                                Nickname <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id={`ml-nickname-${index}`}
                                value={player.nickname}
                                onChange={handleInputChange("nickname")}
                                placeholder="Nickname in-game"
                                className="rounded-md border-gray-200 focus:border-red-300 focus:ring-red-200 text-sm text-gray-900 placeholder:text-gray-400 bg-white"
                                required
                            />
                            {renderError("nickname")}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor={`ml-id_server-${index}`} className="text-sm font-medium text-gray-700">
                                Server ID <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id={`ml-id_server-${index}`}
                                value={player.id_server}
                                onChange={handleInputChange("id_server")}
                                placeholder="Server ID"
                                className="rounded-md border-gray-200 focus:border-red-300 focus:ring-red-200 text-sm text-gray-900 placeholder:text-gray-400 bg-white"
                                required
                            />
                            {renderError("id_server")}
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor={`ml-role-${index}`} className="text-sm font-medium text-gray-700">
                                Role <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={player.role}
                                onValueChange={handleRoleChange}
                            >
                                <SelectTrigger className={`rounded-md border-gray-200 focus:border-red-300 focus:ring-red-200 text-sm text-gray-900 placeholder:text-gray-400 bg-white ${
                                    errors.role ? 'border-red-500' : ''
                                }`}>
                                    <SelectValue placeholder="Pilih role pemain" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ketua">Ketua</SelectItem>
                                    <SelectItem value="anggota">Anggota</SelectItem>
                                    <SelectItem value="cadangan">Cadangan</SelectItem>
                                </SelectContent>
                            </Select>
                            {renderError("role")}
                        </div>
                    </div>
                </div>

                {/* Contact Information Section */}
                <div className="space-y-4 md:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label htmlFor={`ml-email-${index}`} className="text-sm font-medium text-gray-700">
                                Email <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id={`ml-email-${index}`}
                                value={player.email}
                                onChange={handleInputChange("email")}
                                placeholder="Email address"
                                type="email"
                                className="rounded-md border-gray-200 focus:border-red-300 focus:ring-red-200 text-sm text-gray-900 placeholder:text-gray-400 bg-white"
                                required
                            />
                            {renderError("email")}
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor={`ml-no_hp-${index}`} className="text-sm font-medium text-gray-700">
                                No. HP <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id={`ml-no_hp-${index}`}
                                value={player.no_hp}
                                onChange={handleInputChange("no_hp")}
                                placeholder="Nomor handphone"
                                className="rounded-md border-gray-200 focus:border-red-300 focus:ring-red-200 text-sm text-gray-900 placeholder:text-gray-400 bg-white"
                                required
                            />
                            {renderError("no_hp")}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor={`ml-alamat-${index}`} className="text-sm font-medium text-gray-700">
                            Alamat <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id={`ml-alamat-${index}`}
                            value={player.alamat}
                            onChange={handleInputChange("alamat")}
                            placeholder="Alamat lengkap"
                            className="rounded-md border-gray-200 focus:border-red-300 focus:ring-red-200 text-sm text-gray-900 placeholder:text-gray-400 bg-white"
                            required
                        />
                        {renderError("alamat")}
                    </div>
                </div>

                {/* File Upload Section */}
                <div className="space-y-4 md:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            ["foto", "Foto Selfie", photoPreview, true, "Wajib terlihat wajah peserta, bukan gambar acak"] as const,
                            ["tanda_tangan", "Tanda Tangan", signaturePreview, true, "Tanda tangan harus jelas dan mudah dibaca"] as const,
                        ].map(([field, label, preview, required, guidance]) => (
                            <div key={field} className="space-y-2">
                                <div className="flex flex-col space-y-0.5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-baseline gap-1">
                                            <Label htmlFor={`ml-${field}-${index}`} className="text-sm font-medium text-gray-700">
                                                {label}
                                                {required && <span className="text-red-500">*</span>}
                                            </Label>
                                        </div>
                                        {preview && (
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteFile(field as "foto" | "tanda_tangan")}
                                                className="text-red-500 hover:text-red-600 text-xs flex items-center gap-1 transition-colors duration-200"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                                <span>Hapus</span>
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-[11px] text-gray-500 -mt-0.5">{guidance}</p>
                                </div>

                                <div className="space-y-2">
                                    <div className="relative">
                                        <input
                                            type="file"
                                            id={`ml-${field}-${index}`}
                                            onChange={handleFileChange(field as "foto" | "tanda_tangan")}
                                            accept="image/png,image/jpeg,image/jpg"
                                            className="hidden"
                                            required={required}
                                        />
                                        <label
                                            htmlFor={`ml-${field}-${index}`}
                                            className={`w-full py-2.5 px-3 bg-red-50/80 hover:bg-red-50 text-red-700 rounded-md border ${
                                                errors[field as keyof MLPlayer] ? 'border-red-500' : 'border-gray-200'
                                            } cursor-pointer transition-colors duration-200 flex items-center gap-2 text-sm min-h-[40px]`}
                                        >
                                            <div className="flex items-center gap-2 w-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                                </svg>
                                                <span className="truncate flex-1">
                                                    {fileNames[field as "foto" | "tanda_tangan"] 
                                                        ? (
                                                            <span className="flex items-center gap-1">
                                                                <span className="truncate max-w-[150px]">{fileNames[field as "foto" | "tanda_tangan"]}</span>
                                                                <span className="text-red-400 shrink-0">•</span>
                                                                <span className="text-xs text-red-400 shrink-0">Klik untuk mengganti</span>
                                                            </span>
                                                        ) 
                                                        : 'Pilih File'
                                                    }
                                                </span>
                                            </div>
                                        </label>
                                    </div>
                                    <div className="text-[11px] text-gray-500">
                                        Format: JPG, PNG (Max: 1MB)
                                    </div>
                                    {errors[field as keyof MLPlayer] && (
                                        <div className="flex items-center gap-1 text-red-500 text-xs">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <span>{errors[field as keyof MLPlayer]}</span>
                                        </div>
                                    )}
                                    {preview && (
                                        <div className="relative mt-1">
                                            <div className="relative rounded-md overflow-hidden border border-gray-200 bg-gray-50/30">
                                                <img
                                                    src={preview}
                                                    alt={`${label} Preview`}
                                                    className="w-full h-[120px] object-contain"
                                                    onError={() => {
                                                        console.error(`Error loading ${field} preview`)
                                                        if (field === "foto") {
                                                            setPhotoPreview(null)
                                                        } else {
                                                            setSignaturePreview(null)
                                                        }
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

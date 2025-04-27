"use client"

import type React from "react"

import { Upload } from "lucide-react"
import { Label } from "@/components/ui/label"
import type { FileUploadFieldProps } from "@/types/register"

export function FileUploadField({
    id,
    label,
    accept,
    value,
    onChange,
    helpText = "PNG, JPG, GIF up to 10MB",
}: FileUploadFieldProps) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onChange(e.target.files[0])
        }
    }

    return (
        <div>
            <Label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1 block">
                {label}
            </Label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl bg-gray-50">
                <div className="space-y-1 text-center">
                    <div className="flex justify-center">
                        <Upload className="h-12 w-12 text-gray-400" />
                    </div>
                    <div className="flex text-sm text-gray-600">
                        <label
                            htmlFor={id}
                            className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none"
                        >
                            <span>Upload {label.toLowerCase()}</span>
                            <input
                                id={id}
                                name={id}
                                type="file"
                                className="sr-only"
                                accept={accept}
                                required
                                onChange={handleFileChange}
                            />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">{helpText}</p>
                    {value && <p className="text-sm text-green-600 font-medium">File selected: {value.name}</p>}
                </div>
            </div>
        </div>
    )
}

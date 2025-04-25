import * as React from "react"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type CustomDialogProps = {
    title?: string
    description?: string
    trigger: React.ReactNode
    children?: React.ReactNode
    confirmText?: string
    cancelText?: string
    onConfirm?: () => void
    type?: "form" | "confirm" | "delete"
    loading?: boolean
}

export function CustomDialog({
    title,
    description,
    trigger,
    children,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    type = "confirm",
    loading = false,
}: CustomDialogProps) {
    const [open, setOpen] = React.useState(false)

    const handleConfirm = () => {
        onConfirm?.()
        if (type !== "form") {
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                {(title || description) && (
                    <DialogHeader>
                        {title && <DialogTitle>{title}</DialogTitle>}
                        {description && <DialogDescription>{description}</DialogDescription>}
                    </DialogHeader>
                )}
                {type === "form" && children}
                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        {cancelText}
                    </Button>
                    <Button
                        variant={type === "delete" ? "destructive" : "default"}
                        onClick={handleConfirm}
                        disabled={loading}
                    >
                        {loading ? "Please wait..." : confirmText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

"use client"

import { Head, useForm } from "@inertiajs/react"
import { Eye, EyeOff, LoaderCircle, Lock, Mail, Shield } from "lucide-react"
import { type FormEventHandler, useState } from "react"

import InputError from "@/components/input-error"
import TextLink from "@/components/text-link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import AuthLayout from "./auth-layout"
import { LoginForm, LoginProps } from "@/types/auth"



export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false)

    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: "",
        password: "",
        remember: false,
    })

    const submit: FormEventHandler = (e) => {
        e.preventDefault()
        post(route("store.admin"), {
            onFinish: () => reset("password"),
        })
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <AuthLayout>
            <Head title="Admin Login" />

            <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
                <Card className="w-full max-w-md shadow-lg">
                    <CardHeader className="space-y-1 text-center">
                        <div className="flex justify-center mb-2">
                            <div className="rounded-full bg-primary p-2 text-primary-foreground">
                                <Shield className="h-6 w-6" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-bold">Admin Portal</CardTitle>
                        <CardDescription>Enter your credentials to access the dashboard</CardDescription>

                        {status && (
                            <div className="mt-4 rounded-md bg-green-50 p-2 text-sm font-medium text-green-600">{status}</div>
                        )}
                    </CardHeader>

                    <CardContent>
                        <form className="flex flex-col gap-4" onSubmit={submit}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-sm font-medium">
                                        Email address
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            value={data.email}
                                            onChange={(e) => setData("email", e.target.value)}
                                            placeholder="Enter Email Address..."
                                            className="pl-10"
                                        />
                                    </div>
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password" className="text-sm font-medium">
                                            Password
                                        </Label>
                                        {canResetPassword && (
                                            <TextLink
                                                href={route("password.request")}
                                                className="text-xs font-medium text-primary hover:text-primary/90"
                                                tabIndex={5}
                                            >
                                                Forgot password?
                                            </TextLink>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            tabIndex={2}
                                            autoComplete="current-password"
                                            value={data.password}
                                            onChange={(e) => setData("password", e.target.value)}
                                            placeholder="********"
                                            className="pl-10 pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-full p-1"
                                            tabIndex={3}
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    <InputError message={errors.password} />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        checked={data.remember}
                                        onClick={() => setData("remember", !data.remember)}
                                        tabIndex={4}
                                    />
                                    <Label htmlFor="remember" className="text-sm font-medium">
                                        Remember me for 30 days
                                    </Label>
                                </div>
                            </div>

                            <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing} size="lg">
                                {processing ? (
                                    <>
                                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                        Authenticating...
                                    </>
                                ) : (
                                    "Sign in to Dashboard"
                                )}
                            </Button>
                        </form>
                    </CardContent>

                    <Separator />

                    <CardFooter className="flex flex-col p-6">
                        <p className="mt-4 text-center text-xs text-muted-foreground">
                            By signing in, you agree to our{" "}
                            <TextLink href="#" className="underline underline-offset-4 hover:text-primary">
                                Terms of Service
                            </TextLink>{" "}
                            and{" "}
                            <TextLink href="#" className="underline underline-offset-4 hover:text-primary">
                                Privacy Policy
                            </TextLink>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </AuthLayout>
    )
}

import { usePage } from "@inertiajs/react";

export function UsePermission() {
    const hasRole = (name: string) => usePage().props.auth.user.roles.includes(name);
    const hasPermission = (permission: string) => usePage().props.auth.user.permissions.includes(permission);

    return { hasRole, hasPermission }
}
import AuthenticatedAdminLayout from "@/layouts/admin/layout";
import { UserType } from "@/types/user";
import { usePage } from "@inertiajs/react";

export default function AdminDashboard() {
    const { user } = usePage<{ user: { data: UserType } }>().props;
    const auth = user.data;

    console.log(auth);
    return (
        <AuthenticatedAdminLayout user={auth}>
            <div>

                {auth?.name}
            </div>
        </AuthenticatedAdminLayout>
    );
}

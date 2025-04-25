import AuthenticatedAdminLayout from "@/layouts/admin/layout";
import { UserType } from "@/types/user";
import { usePage } from "@inertiajs/react";

export default function AdminDashboard() {
    const { user } = usePage<{ user: { data: UserType } }>().props;
    const auth = user.data;

    console.log('admin dashboard data', auth);

    return (
        <AuthenticatedAdminLayout title="IT-ESEGA Admin Portal | Dashboard" headerTitle={'Control Panel'} user={auth}>
            <div>
                {auth?.name}
            </div>
        </AuthenticatedAdminLayout>
    );
}

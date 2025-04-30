import AuthenticatedAdminLayout from "@/layouts/admin/layout";
import { UserType } from "@/types/user";
import { usePage } from "@inertiajs/react";

export default function AdminDashboard() {
    const { user } = usePage<{ user: { data: UserType } }>().props;
    const auth = user.data;

    console.log('admin dashboard data', auth);

    return (
<<<<<<< HEAD
        <AuthenticatedAdminLayout user={auth}>
=======
        <AuthenticatedAdminLayout title="IT-ESEGA Admin Portal | Dashboard" headerTitle={'Control Panel'} user={auth}>
>>>>>>> fbbc686da5809a93d113b302ad97e5115290ed8e
            <div>
                {auth?.name}
            </div>
        </AuthenticatedAdminLayout>
    );
}

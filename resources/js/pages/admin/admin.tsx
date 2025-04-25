import { Admincolumns } from "@/components/data-table/coloumn/admin-coloumn";
import { DataTable } from "@/components/data-table/data-table";
import AuthenticatedAdminLayout from "@/layouts/admin/layout";
import { UserType } from "@/types/user";
import { usePage } from "@inertiajs/react";

export default function AdminUser() {
    const { user, admin } = usePage<{
        user: { data: UserType },
        admin: { data: UserType[] }
    }>().props;
    const auth = user.data;
    const data = admin.data;

    console.log(admin);

    return (
        <AuthenticatedAdminLayout title="Admin Management" headerTitle={'Admin Management'} user={auth}>
            <DataTable data={data ?? []} columns={Admincolumns} filterColumn='email' />
        </AuthenticatedAdminLayout>
    );
}
import { Admincolumns } from "@/components/data-table/coloumn/admin-coloumn";
import { DataTable } from "@/components/data-table/data-table";
import AuthenticatedAdminLayout from "@/layouts/admin/layout";
import { UserType } from "@/types/user";
import { Button } from "@headlessui/react";
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
            <DataTable isButtonAdd={true} isButtonRestore={true} data={data ?? []}
                addDialogContent={
                    <div className="space-y-4">
                        <input className="w-full border p-2 rounded" placeholder="Nama" />
                        <input className="w-full border p-2 rounded" placeholder="Email" />
                    </div>
                }
                restoreDialogContent={
                    <p>Apakah Anda yakin ingin mengembalikan data yang dipilih?</p>
                }
                columns={Admincolumns} filterColumn='email' />






        </AuthenticatedAdminLayout>
    );
}
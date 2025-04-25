import { Admincolumns } from "@/components/data-table/coloumn/admin-coloumn";
import { DataTable } from "@/components/data-table/data-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" placeholder="Nama admin" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input id="email" placeholder="example@gmail.com" className="col-span-3" />
                        </div>
                    </div>
                }
                restoreDialogContent={
                    <p>Apakah Anda yakin ingin mengembalikan data yang dipilih?</p>
                }
                columns={Admincolumns} filterColumn='email' />






        </AuthenticatedAdminLayout>
    );
}
import { Admincolumns } from "@/components/data-table/coloumn/admin-coloumn";
import { DataTable } from "@/components/data-table/data-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthenticatedAdminLayout from "@/layouts/admin/layout";
import { UserType } from "@/types/user";
import { usePage } from "@inertiajs/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { initialColumnVisibility } from "@/components/data-table/coloumn/admin/visible-coloumn";

export default function AdminUser() {
    const { user, admin, flash } = usePage<{
        user: { data: UserType },
        admin: { data: UserType[] },
        flash: { success?: string, error?: string }
    }>().props;
    const auth = user.data;
    const data = admin.data;

    console.log(flash);

    return (
        <AuthenticatedAdminLayout title="Admin Management" headerTitle={'Admin Management'} user={auth}>
            <DataTable isButtonAdd={true} initialColumnVisibility={initialColumnVisibility} isButtonRestore={true} data={data ?? []}
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




            {flash.success && (
                <Alert variant="default" className="mb-4">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Berhasil!</AlertTitle>
                    <AlertDescription>
                        {flash.success}
                    </AlertDescription>
                </Alert>
            )}


        </AuthenticatedAdminLayout>
    );
}
import { Admincolumns } from "@/components/data-table/coloumn/admin-coloumn";
import { DataTable } from "@/components/data-table/data-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthenticatedAdminLayout from "@/layouts/admin/layout";
import { UserType } from "@/types/user";
import { usePage, useForm } from "@inertiajs/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Eye, EyeOff } from "lucide-react";
import * as React from 'react'
import { initialColumnVisibility } from "@/components/data-table/coloumn/admin/visible-coloumn";
import {
    Select, SelectContent, SelectGroup, SelectItem,
    SelectLabel, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function AdminUser() {
    const { user, admin, flash } = usePage<{
        user: { data: UserType },
        admin: { data: UserType[] },
        flash: { success?: string, error?: string }
    }>().props;

    const auth = user.data;
    const data = admin.data;

    console.log(data);
    console.log(auth);
    const [showPassword, setShowPassword] = React.useState(false);
    const [editId, setEditId] = React.useState<number | null>(null);

    const {
        data: formData,
        setData,
        post,
        put,
        delete: destroy,
        reset,
        processing,
        errors
    } = useForm({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        KTM: '',
        status: 'active',
        role: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editId) {
            put(route('admins.update', editId), {
                onSuccess: () => resetForm(),
            });
        } else {
            post(route('admins.store'), {
                onSuccess: () => resetForm(),
            });
        }
    };

    const handleEdit = (user: UserType) => {
        setEditId(user.id);
        setData({
            name: user.name || '',
            email: user.email || '',
            password: '',
            phone: user.phone || '',
            address: user.address || '',
            KTM: user.KTM || '',
            status: user.status || 'active',
            role: String(user.roles?.[0] || ''),
        });
    };




    const handleDelete = (id: number) => {
        console.log('id user', id)
        destroy(route('admins.destroy', id));
    };

    // const handleRestore = (id: number) => {
    //     post(route('admin.users.restore', id));
    // };

    const resetForm = () => {
        reset();
        setEditId(null);
        setShowPassword(false);
    };

    const renderForm = (
        <form onSubmit={handleSubmit} className="space-y-6 p-6 shadow-lg rounded-2xl border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input placeholder="Masukan Nama" id="name" value={formData.name} onChange={e => setData('name', e.target.value)} />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input placeholder="Masukan Email" id="email" value={formData.email} onChange={e => setData('email', e.target.value)} />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="relative">
                    <Label htmlFor="password">Password {editId && <span className="text-xs text-gray-500">(kosongkan jika tidak ingin mengubah)</span>}</Label>
                    <Input placeholder="Masukan Password"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={e => setData('password', e.target.value)}
                        className="pr-10"
                    />
                    <button type="button" onClick={() => setShowPassword(prev => !prev)} className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                {/* Phone */}
                <div>
                    <Label htmlFor="phone">No. HP</Label>
                    <Input placeholder="Masukan NO. HP" id="phone" value={formData.phone} onChange={e => setData('phone', e.target.value)} />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                {/* Address */}
                <div>
                    <Label htmlFor="address">Alamat</Label>
                    <Input placeholder="Masukan Alamat" id="address" value={formData.address} onChange={e => setData('address', e.target.value)} />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>

                {/* KTM */}
                <div>
                    <Label htmlFor="KTM">Nomor KTM</Label>
                    <Input placeholder="Masukan NIM" id="KTM" value={formData.KTM} onChange={e => setData('KTM', e.target.value)} />
                    {errors.KTM && <p className="text-red-500 text-sm mt-1">{errors.KTM}</p>}
                </div>

                {/* Role */}
                <div>
                    <Label htmlFor="role">Role</Label>
                    <Select value={formData.role} onValueChange={(value) => setData('role', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih Role Admin" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Role</SelectLabel>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="super_admin">Super Admin</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                </div>

                {/* Status */}
                <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setData('status', value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                                <SelectItem value="blocked">Blocked</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
                </div>
            </div>

            <div className="text-right space-x-2">
                <Button type="submit" disabled={processing}>
                    {editId ? "Update Admin" : "Tambah Admin"}
                </Button>
                {editId && (
                    <Button variant="ghost" onClick={resetForm} type="button">Batal</Button>
                )}
            </div>
        </form>
    );


    return (
        <AuthenticatedAdminLayout title="Admin Management" headerTitle="Admin Management" user={auth}>
            <DataTable
                isButtonAdd
                isButtonRestore
                initialColumnVisibility={initialColumnVisibility}
                data={data ?? []}
                addDialogContent={renderForm}
                restoreDialogContent={<p>Apakah Anda yakin ingin mengembalikan data yang dipilih?</p>}
                onEdit={handleEdit}
                onDelete={handleDelete}
                columns={Admincolumns({ onUpdate: (_id, user) => handleEdit(user), onDelete: handleDelete, roles: user.data.roles ?? [] })}
                filterColumn="email"
            />

            {flash.success && (
                <Alert variant="default" className="mt-4">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Berhasil!</AlertTitle>
                    <AlertDescription>{flash.success}</AlertDescription>
                </Alert>
            )}
        </AuthenticatedAdminLayout>
    );
}
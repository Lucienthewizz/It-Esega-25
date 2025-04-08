import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

const breadcrumbs = [
    {
        title: 'About',
        href: '/about',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="About Us" />
            console.log('HALO INI BERJALAN');
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
                <h1 className="text-4xl font-bold text-gray-800">About IT-ESEGA</h1>
                <p className="mt-4 text-lg text-gray-600">
                    IT-ESEGA adalah event tahunan yang menyelenggarakan turnamen Mobile Legends dan Free Fire untuk komunitas gaming.
                </p>
            </div>
        </AppLayout>
    );
}
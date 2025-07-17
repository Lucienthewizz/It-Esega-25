import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserType } from '@/types/user';
import { Head, usePage, Link } from '@inertiajs/react';
import { useState, Fragment } from 'react';
import { route } from 'ziggy-js';
import { Dialog, Transition } from '@headlessui/react';

const navItems = [
    { title: 'Home', href: route('home') },
    { title: 'About', href: route('about') },
    { title: 'FAQ', href: '#faq' },
    { title: 'Contact', href: '#contact' },
    { title: 'Bracket', href: route('bracket') },
    { title: 'Register', href: route('register') },
];

const BracketML2: React.FC = () => {
    const { user } = usePage<{ user: { data: UserType } }>().props;

    // State untuk kontrol registration closed popup
    const [showClosedPopup, setShowClosedPopup] = useState(false);
    const isRegistrationClosed = true; // Set registration sebagai closed

    return (
        <>
            <div className="flex min-h-screen flex-col bg-gray-100 p-4 pt-5 sm:p-6 lg:p-8">
                <Head title="Tournament Brackets | IT-ESEGA 2025" />
                <div className="relative z-10">
                    <Navbar
                        user={user}
                        logo={
                            <div className="flex items-center justify-start">
                                <img src="/Images/LogoEsega25.png" alt="IT-ESEGA-25 Logo" className="h-18 w-auto object-contain" />
                            </div>
                        }
                        items={navItems}
                        isRegistrationClosed={isRegistrationClosed}
                        setShowClosedPopup={setShowClosedPopup}
                    />
                </div>

                <div className="mt-24 flex flex-col items-center justify-center gap-10">
                    <div>
                        <h2 className="mb-3 text-center text-2xl font-bold tracking-tight text-gray-800 sm:text-4xl">
                            <span className="text-red-600">IT-ESEGA</span> Mobile Legends <br /> Qualification Day 2 & Grand Final Bracket
                        </h2>
                        <div className="mx-auto h-1 w-16 rounded-full bg-red-600 sm:w-24" data-aos-delay="50"></div>
                    </div>
                    {/* Day 2 dan day 3 */}
                    <Card className="mb-8 w-full max-w-4xl rounded-lg border border-gray-300 shadow-lg">
                        <CardHeader>
                            <CardTitle className="rounded-t-lg bg-white p-4 text-center text-xl font-semibold text-gray-800 sm:p-6 sm:text-2xl md:text-3xl lg:text-4xl">
                                <span className="text-red-500">IT-ESEGA</span> Mobile Legends Bracket
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="w-full overflow-hidden rounded-lg border border-gray-200">
                                <iframe
                                    src="https://challonge.com/PO_ITESEGA2025/module"
                                    width="100%"
                                    height="100%"
                                    frameBorder="0"
                                    scrolling="auto"
                                    className="h-[700px] w-full rounded"
                                    title="Challonge Tournament Playoff Bracket"
                                    style={{ display: 'block' }}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Footer 
                isRegistrationClosed={isRegistrationClosed}
                setShowClosedPopup={setShowClosedPopup}
            />

            {/* Popup Pendaftaran Tutup */}
            <Transition appear show={showClosedPopup} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 z-[200] overflow-y-auto" onClose={() => setShowClosedPopup(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        {/* Overlay tanpa blur, dan gunakan pointer-events-auto agar modal tetap interaktif */}
                        <div className="fixed inset-0 bg-black/40" style={{ zIndex: 201 }} />
                    </Transition.Child>
                    <div className="flex items-center justify-center min-h-screen p-4" style={{ position: 'fixed', inset: 0, zIndex: 202, pointerEvents: 'none' }}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-200"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-150"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            {/* Modal dengan pointer-events-auto agar tidak kena efek overlay */}
                            <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden transition-all transform bg-white shadow-xl rounded-2xl" style={{ zIndex: 203, pointerEvents: 'auto' }}>
                                <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                                    Pendaftaran Ditutup
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Mohon maaf, pendaftaran untuk IT-ESEGA 2025 sudah ditutup. Pastikan untuk mengikuti kami di media sosial
                                        untuk informasi lebih lanjut tentang event mendatang.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-4 mt-4">
                                    <Link
                                        href={route('home')}
                                        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white transition bg-red-600 rounded-md hover:bg-red-700"
                                    >
                                        Kembali ke Beranda
                                    </Link>
                                    <button
                                        onClick={() => setShowClosedPopup(false)}
                                        className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 transition bg-gray-100 rounded-md hover:bg-gray-200"
                                    >
                                        Tutup
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default BracketML2;

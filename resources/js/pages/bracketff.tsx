import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserType } from '@/types/user';
import { Head, usePage } from '@inertiajs/react';

const navItems = [
    { title: 'Home', href: route('home') },
    { title: 'About', href: route('about') },
    { title: 'FAQ', href: '#faq' },
    { title: 'Contact', href: '#contact' },
    { title: 'Bracket', href: route('bracket') },
    { title: 'Register', href: route('register') },
];

const BracketFF: React.FC = () => {
    const { user } = usePage<{ user: { data: UserType } }>().props;

    return (
        <>
            <div className="flex min-h-screen flex-col bg-gray-100 p-4 pt-5 sm:p-6 lg:p-8">
                <Head title="IT-ESEGA 2025 Official Website" />
                <div className="relative z-10">
                    <Navbar
                        user={user}
                        logo={
                            <div className="flex items-center justify-start">
                                <img src="/images/LogoEsega25.png" alt="IT-ESEGA-25 Logo" className="h-18 w-auto object-contain" />
                            </div>
                        }
                        items={navItems}
                    />
                </div>

                <div className="mt-24 flex flex-col items-center justify-center gap-10">
                    <div>
                        <h2 className="mb-3 text-center text-2xl font-bold tracking-tight text-gray-800 sm:text-4xl">
                            <span className="text-red-600">IT-ESEGA</span> Free Fire Bracket
                        </h2>
                        <div className="mx-auto h-1 w-16 rounded-full bg-red-600 sm:w-24" data-aos-delay="50"></div>
                    </div>
                    {/* Bracket FF - SpreadSheet */}
                    <Card className="w-full max-w-5xl rounded-lg border border-gray-300 shadow-lg">
                        <CardHeader>
                            <CardTitle className="rounded-t-lg bg-white p-4 text-center text-xl font-semibold text-gray-800 sm:p-6 sm:text-2xl md:text-3xl lg:text-4xl">
                                Free Fire Table Point
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="w-full overflow-hidden rounded-lg border border-gray-200">
                                <iframe
                                    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRwd9OsfNVvi12-NpQT-laeEpkIoy49yno6wg_3giLSEnyyvSE0cqiN_Wd6OSv4AHs134ponqnDeo8h/pubhtml?widget=true&headers=false"
                                    width="100%"
                                    height="700"
                                    frameBorder="0"
                                    scrolling="auto"
                                    className="w-full rounded-lg"
                                    title="Google Spreadsheet Bracket"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default BracketFF;

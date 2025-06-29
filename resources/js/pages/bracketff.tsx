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
            <div className="flex flex-col min-h-screen p-4 pt-5 bg-gray-100 sm:p-6 lg:p-8">
                <Head title="IT-ESEGA 2025 Official Website" />
                <div className="relative z-10">
                    <Navbar
                        user={user}
                        logo={
                            <div className="flex items-center justify-start">
                                <img src="/images/LogoEsega25.png" alt="IT-ESEGA-25 Logo" className="object-contain w-auto h-18" />
                            </div>
                        }
                        items={navItems}
                    />
                </div>

                <div className="flex flex-col items-center justify-center gap-10 mt-24">
                    {/* Bracket FF - SpreadSheet */}
                    <Card className="w-full max-w-5xl border border-gray-300 rounded-lg shadow-lg">
                        <CardHeader>
                            <CardTitle className="p-4 text-xl font-semibold text-center text-gray-800 bg-white rounded-t-lg sm:p-6 sm:text-2xl md:text-3xl lg:text-4xl">
                                Bracket Free Fire <span className="text-red-500">IT-ESEGA</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="w-full overflow-hidden border border-gray-200 rounded-lg">
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

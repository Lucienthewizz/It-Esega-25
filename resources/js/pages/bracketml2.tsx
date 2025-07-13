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

const BracketML2: React.FC = () => {
    const { user } = usePage<{ user: { data: UserType } }>().props;

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
            <Footer />
        </>
    );
};

export default BracketML2;

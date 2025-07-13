import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserType } from '@/types/user';
import { Head, router, usePage } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const navItems = [
    { title: 'Home', href: route('home') },
    { title: 'About', href: route('about') },
    { title: 'FAQ', href: '#faq' },
    { title: 'Contact', href: '#contact' },
    { title: 'Bracket', href: route('bracket') },
    { title: 'Register', href: route('register') },
];

const Bracket: React.FC = () => {
    const { user } = usePage<{ user: { data: UserType } }>().props;

    useEffect(() => {
        // Inisialisasi AOS
        AOS.init({
            duration: 800,
            once: false,
            mirror: true,
        });

        // Reset scroll ke atas saat halaman dimuat
        window.scrollTo(0, 0);

        // Refresh AOS
        setTimeout(() => {
            AOS.refresh();
        }, 100);
    }, []);

    const brackets = [
        {
            title: 'Mobile Legends Qualification Day 1',
            summary: 'Explore the full Mobile Legends bracket. Follow every matchup and track your favorite teams.',
            link: '/bracket/mobile-legends',
        },
        {
            title: 'Free Fire',
            summary: "Check out the Free Fire bracket and see who's advancing. Live updates and results.",
            link: '/bracket/free-fire',
        },
    ];

    return (
        <>
            <div className="home relative min-h-screen overflow-hidden">
                <Head title="Tournament Brackets | IT-ESEGA 2025" />
                {/* Background Layer */}
                <div className="absolute inset-0 bg-white"></div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-red-50/40 to-red-100/30"></div>
                {/* Cross Blob - Top Left */}
                <div className="pointer-events-none absolute top-24 -left-12 h-28 w-28 opacity-5">
                    <div className="animate-spin-slow h-full w-full">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full fill-red-500">
                            <path d="M85,40 h30 v45 h45 v30 h-45 v45 h-30 v-45 h-45 v-30 h45 z" />
                        </svg>
                    </div>
                </div>
                {/* Cross Blob - Bottom Right */}
                <div className="pointer-events-none absolute -right-8 bottom-16 h-20 w-20 opacity-5">
                    <div className="animate-spin-reverse-slow h-full w-full">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full fill-red-500">
                            <path d="M85,40 h30 v45 h45 v30 h-45 v45 h-30 v-45 h-45 v-30 h45 z" />
                        </svg>
                    </div>
                </div>
                <div className="relative z-10 mx-auto">
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
                <div className="mt-10 flex flex-col items-center justify-center gap-8 px-2 sm:px-0">
                    <div data-aos="fade-up">
                        <h2 className="mt-20 mb-3 text-center text-2xl font-bold tracking-tight text-gray-800 sm:text-4xl">
                            <span className="text-red-600">IT-ESEGA</span> Brackets
                        </h2>
                        <div className="mx-auto h-1 w-16 rounded-full bg-red-600 sm:w-24" data-aos-delay="50"></div>
                    </div>
                    <div className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Bracket Cards */}
                        {brackets.map((bracket, index) => (
                            <div
                                key={index}
                                className="flex h-full w-full items-stretch transition-all duration-300 hover:scale-[1.03]"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <Card className="flex h-full w-full max-w-lg flex-col justify-between rounded-2xl border-2 bg-white shadow-lg transition hover:shadow-2xl">
                                    <CardContent className="flex h-full flex-col justify-between p-4 sm:p-6">
                                        <div>
                                            <h2 className="mb-2 text-center text-lg font-bold text-gray-800 sm:text-xl">{bracket.title}</h2>
                                            <p className="text-center text-xs text-gray-600 sm:text-sm">{bracket.summary}</p>
                                        </div>
                                        <div className="mt-4">
                                            <Button
                                                className="w-full cursor-pointer py-2 text-sm sm:py-3 sm:text-base"
                                                onClick={() => router.visit(bracket.link)}
                                            >
                                                View Bracket
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                        {/*Bracket day 2 dan day 3 ML  */}
                        <div
                            key="special"
                            className="flex w-full justify-center md:col-span-2"
                            data-aos="fade-up"
                            data-aos-delay={brackets.length * 100}
                        >
                            <Card className="mb-8 w-full max-w-lg rounded-2xl border-2 border-yellow-400 bg-gradient-to-br from-yellow-100 via-yellow-50 to-white shadow-lg transition hover:shadow-2xl">
                                <CardContent className="flex h-full flex-col justify-between p-4 sm:p-6">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <h2 className="text-center text-xl font-extrabold text-yellow-700 sm:text-2xl">
                                            Mobile Legends <br /> Qualification Day 2 & Grand Final
                                        </h2>
                                        <div className="mt-2 flex flex-col items-center">
                                            <p className="max-w-xs text-center text-xs text-gray-700 sm:max-w-sm sm:text-sm">
                                                Come and see the most anticipated matches of the tournament. The winner of the brackets will be
                                                revealed soon!
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Button
                                            className="w-full cursor-pointer bg-yellow-300 py-2 text-sm text-yellow-900 hover:bg-yellow-400 sm:py-3 sm:text-base"
                                            onClick={() => router.visit('/bracket/mobile-legends/day2-3')}
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Bracket;

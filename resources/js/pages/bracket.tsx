import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserType } from '@/types/user';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
    }, []);

    const brackets = [
        {
            title: 'Mobile Legends',
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
            <div className="home min-h-screen relative overflow-hidden">
                <Head title="Tournament Brackets | IT-ESEGA 2025" />
                {/* Background Layer */}
                <div className="absolute inset-0 bg-white"></div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-red-50/40 to-red-100/30"></div>
                {/* Cross Blob - Top Left */}
                <div className="absolute -left-12 top-24 w-28 h-28 opacity-5 pointer-events-none">
                    <div className="w-full h-full animate-spin-slow">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-red-500">
                            <path d="M85,40 h30 v45 h45 v30 h-45 v45 h-30 v-45 h-45 v-30 h45 z"/>
                        </svg>
                    </div>
                </div>
                {/* Cross Blob - Bottom Right */}
                <div className="absolute -right-8 bottom-16 w-20 h-20 opacity-5 pointer-events-none">
                    <div className="w-full h-full animate-spin-reverse-slow">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-red-500">
                            <path d="M85,40 h30 v45 h45 v30 h-45 v45 h-30 v-45 h-45 v-30 h45 z"/>
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
                        <h2 className="mt-8 mb-3 text-2xl font-bold tracking-tight text-gray-800 sm:text-4xl text-center">
                            <span className="text-red-600">IT-ESEGA</span> Brackets
                        </h2>
                        <div className="mx-auto h-1 w-16 sm:w-24 rounded-full bg-red-600" data-aos-delay="50"></div>
                    </div>
                    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 w-full">
                        {brackets.map((bracket, index) => (
                            <div key={index} className="transition-all duration-300 hover:scale-[1.03] w-full" data-aos="fade-up" data-aos-delay={index * 100}>
                                <Card className="rounded-2xl bg-white shadow-md transition hover:shadow-xl w-full">
                                    <CardContent className="flex h-full flex-col justify-between p-4 sm:p-6">
                                        <div>
                                            <h2 className="mb-2 text-lg sm:text-xl font-bold text-gray-800 text-center sm:text-left">{bracket.title}</h2>
                                            <p className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">{bracket.summary}</p>
                                        </div>
                                        <div className="mt-4">
                                            <Button className="w-full cursor-pointer py-2 sm:py-3 text-sm sm:text-base" onClick={() => router.visit(bracket.link)}>
                                                View Bracket
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Bracket;


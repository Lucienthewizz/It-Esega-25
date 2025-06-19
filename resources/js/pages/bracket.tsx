import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserType } from '@/types/user';
import { Head, router, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';

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

                <div className="mt-16 flex flex-col items-center justify-center gap-10">
                    <div>
                        <h2 className="mt-10 mb-4 text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl" data-aos="fade-up">
                            <span className="text-red-600">IT-ESEGA</span> Brackets
                        </h2>
                        <div className="mx-auto h-1 w-20 rounded-full bg-red-600 sm:w-24" data-aos="fade-up" data-aos-delay="50"></div>
                    </div>
                    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
                        {brackets.map((bracket, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <Card className="rounded-2xl bg-white shadow-md transition hover:shadow-xl">
                                    <CardContent className="flex h-full flex-col justify-between p-6">
                                        <div>
                                            <h2 className="mb-2 text-xl font-bold text-gray-800">{bracket.title}</h2>
                                            <p className="text-sm text-gray-600">{bracket.summary}</p>
                                        </div>
                                        <div className="mt-4">
                                            <Button className="w-full cursor-pointer" onClick={() => router.visit(bracket.link)}>
                                                View Bracket
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Bracket;

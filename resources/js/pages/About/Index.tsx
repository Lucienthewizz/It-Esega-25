import { Head } from "@inertiajs/react";
import { Navbar } from '@/components/navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { route } from 'ziggy-js';

export default function About() {
    console.log('About page is rendering');

    const navItems = [
        { title: 'Home', href: route('home') },
        { title: 'About', href: route('about') },
        { title: 'FAQ', href: route('faq') },
        { title: 'Contact', href: route('contact') },
        { title: 'Register', href: route('register') },
    ];
    
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-in-out',
        });
    }, []);

    return (
        <>
            <Head title="About Us" />
            <div className="bg-background from-primary to-secondary font-poppins relative min-h-screen text-black">
                {/* Background Overlay */}
                <div
                    className="from-primary to-secondary absolute inset-0 z-0 bg-gradient-to-br opacity-8"
                    style={{
                        backgroundImage: `url('/images/bg-image.png')`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundPosition: 'top center',
                        backgroundBlendMode: 'overlay',
                    }}
                />

                <div className="relative z-10 mx-auto text-[#333]">
                    <Navbar
                        logo={
                            <div className="flex items-center justify-center">
                                <img src="/images/LogoEsega25.png" alt="IT-ESEGA-25 Logo" className="h-18 w-auto object-contain" />
                            </div>
                        }
                        items={navItems}
                    />

                    <div className="bg-white">
                        <div className="container mx-auto px-6 py-16">
                            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_1.2fr]">
                                <div className="flex justify-center md:justify-start" data-aos="fade-right">
                                    <img src="/images/MascotEsega25.png" alt="Mascot" className="h-64 w-auto object-contain md:h-150" />
                                </div>
                                <div className="text-center md:text-left" data-aos="fade-left">
                                    <h2 className="mb-8 text-4xl font-bold text-[#333]">
                                        About <span className="text-red-600">IT-ESEGA</span>
                                    </h2>
                                    <p className="mb-6 text-lg text-[#333]">
                                        IT-ESEGA adalah kompetisi teknologi premier yang mempertemukan pikiran-pikiran cemerlang dari universitas-universitas di seluruh negeri. Kami berkomitmen untuk menciptakan platform yang memungkinkan para gamers dan tech enthusiast untuk menunjukkan bakat mereka dalam kompetisi yang seru dan menantang.
                                    </p>
                                    <p className="mb-6 text-lg text-[#333]">
                                        Dengan fokus pada game-game populer seperti Mobile Legends dan Free Fire, IT-ESEGA menjadi wadah bagi para pemain untuk mengasah kemampuan mereka sambil membangun jaringan dengan sesama pemain dari berbagai institusi pendidikan.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3" data-aos="fade-up">
                                <div className="rounded-lg bg-gray-50 p-6 text-center shadow-md">
                                    <h3 className="mb-4 text-xl font-semibold text-[#333]">Visi</h3>
                                    <p className="text-gray-600">
                                        Menjadi platform utama yang mempertemukan dan mengembangkan bakat esports di kalangan mahasiswa Indonesia.
                                    </p>
                                </div>
                                <div className="rounded-lg bg-gray-50 p-6 text-center shadow-md">
                                    <h3 className="mb-4 text-xl font-semibold text-[#333]">Misi</h3>
                                    <p className="text-gray-600">
                                        Menyelenggarakan kompetisi berkualitas tinggi yang mendorong sportivitas dan profesionalisme dalam esports.
                                    </p>
                                </div>
                                <div className="rounded-lg bg-gray-50 p-6 text-center shadow-md">
                                    <h3 className="mb-4 text-xl font-semibold text-[#333]">Nilai</h3>
                                    <p className="text-gray-600">
                                        Integritas, Sportivitas, Inovasi, dan Kebersamaan dalam setiap aspek kompetisi.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
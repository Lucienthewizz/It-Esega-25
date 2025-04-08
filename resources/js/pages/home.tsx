import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react"; 
import { Navbar } from "@/components/navbar";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

export default function Home() {
    const navItems = [
        { title: 'Home', href: route('home') },
        { title: 'About', href: route('about') },
        { title: 'Register', href: route('register') }
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
            <Head title="IT-ESEGA 2025 Official Website" />
            <div className="relative min-h-screen text-black bg-background from-primary to-secondary font-poppins">
                {/* Background Overlay */}
                <div 
                    className="absolute inset-0 z-0 bg-gradient-to-br opacity-8 from-primary to-secondary"
                    style={{
                        backgroundImage: `url('/images/Halftone-1.png'), url('/images/bg-image.png')`,
                        backgroundRepeat: 'repeat, no-repeat',
                        backgroundSize: '400px, contain',
                        backgroundPosition: 'center, top center',
                        backgroundBlendMode: 'overlay'
                    }}
                />
                
                {/* Content */}
                <div className="relative z-10">
                    <Navbar 
                        logo={
                            <div className="flex justify-center items-center">
                                <img 
                                    src="/images/LogoEsega25.png" 
                                    alt="IT-ESEGA-25 Logo" 
                                    className="w-auto h-18 object-contain"
                                />
                            </div>
                        }
                        items={navItems}
                    />

                    {/* Hero Section */}
                    <div className="container px-6 mx-auto my-10 py-25">
                        <div className="grid grid-cols-1 gap-5 items-center md:grid-cols-[1.5fr_1fr]">
                            <div className="text-center md:text-left" data-aos="fade-right">
                                <h1 className="mb-4 text-7xl font-black">IT-ESEGA <span className="inline-block transform -skew-x-12 text-secondary">2025</span></h1>
                                <p className="mb-8 text-xl text-black">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi molestias architecto nemo? Dolorem alias cum fugit inventore tempore fuga perspiciatis, eligendi provident natus non cupiditate labore vero tenetur deserunt suscipit..
                                </p>
                                <div className="flex justify-center space-x-4 md:justify-start">
                                    <Link
                                        href={route('register')}
                                        className="px-8 py-4 text-lg font-semibold rounded-lg border transition-colors duration-300 border-secondary text-secondary bg-transparant hover:bg-secondary hover:text-white"
                                    >
                                        Register Now!
                                    </Link>
                                </div>
                            </div>
                            <div className="hidden justify-center md:flex md:justify-end" data-aos="fade-left">
                                <img 
                                    src="/images/LogoEsega25.png"
                                    alt="IT-ESEGA Logo"
                                    className="w-auto h-60 md:h-115 animate-float object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    {/* About Section */}
                    <section className="py-16 bg-white" data-aos="fade-up">
                        <div className="container px-6 mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-6 items-center">
                                <div className="flex justify-center md:justify-start" data-aos="fade-right">
                                    <img 
                                        src="/images/MascotEsega25.png"
                                        alt="IT-ESEGA Logo"
                                        className="w-auto h-64 md:h-150 object-contain"
                                    />
                                </div>
                                <div className="text-center md:text-left" data-aos="fade-left">
                                    <h2 className="mb-8 text-4xl font-bold">About IT-ESEGA</h2>
                                    <p className="mb-6 text-lg">
                                        IT-ESEGA is the premier technology competition that brings together the brightest minds from universities across the nation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Competition Section */}
                    <section className="relative bg-white py-16">
                        <div className="container relative z-10 px-6 pt-25 mx-auto">
                            <h2 className="mb-8 text-4xl font-bold text-center" data-aos="fade-up">Upcoming Tournament</h2>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                <div 
                                    className="relative rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden" 
                                    data-aos="fade-up" 
                                    data-aos-delay="100"
                                    style={{
                                        backgroundImage: `url('/images/ML-overlay.jpg')`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                >
                                    <div className="relative z-10 flex flex-col items-center p-6 bg-white bg-opacity-90">
                                        <img 
                                            src="/images/ML-logo.png" 
                                            alt="Mobile Legends Tournament" 
                                            className="w-60 h-50 mb-4 object-contain"
                                        />
                                        <h3 className="mb-2 text-2xl font-bold text-center text-primary">Mobile Legends <span className="text-black">Tournament</span></h3>
                                        <p className="mb-6 text-center text-gray-600">
                                            Compete in Esega's premier Mobile Legends tournament. 
                                            Show your strategic gameplay and team coordination skills.
                                        </p>
                                        <Link
                                            href={route('register')}
                                            className="px-8 py-4 text-sm font-semibold rounded-lg border transition-colors duration-300 border-primary text-primary hover:bg-primary hover:text-white"
                                        >
                                            Register Now
                                        </Link>
                                    </div>
                                </div>
                                <div 
                                    className="relative rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden" 
                                    data-aos="fade-up" 
                                    data-aos-delay="200"
                                    style={{
                                        backgroundImage: `url('/images/FF-overlay.jpg')`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                >
                                    <div className="relative z-10 flex flex-col items-center p-6 bg-white bg-opacity-90">
                                        <img 
                                            src="/images/FF-logo.png" 
                                            alt="Free Fire Tournament" 
                                            className="w-60 h-50 mb-4 object-contain"
                                        />
                                        <h3 className="mb-2 text-2xl font-bold text-center text-primary">Free Fire <span className="text-black">Tournament</span></h3>
                                        <p className="mb-6 text-center text-gray-600">
                                            Battle it out in an intense Free Fire competition. 
                                            Demonstrate your survival skills and tactical expertise.
                                        </p>
                                        <Link
                                            href={route('register')}
                                            className="px-8 py-4 text-sm font-semibold rounded-lg border transition-colors duration-300 border-primary text-primary hover:bg-primary hover:text-white"
                                        >
                                            Register Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
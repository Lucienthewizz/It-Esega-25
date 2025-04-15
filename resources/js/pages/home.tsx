import { Navbar } from '@/components/navbar';
import { Disclosure } from '@headlessui/react';
import { Head, Link } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { route } from 'ziggy-js';

export default function Home() {
    const navItems = [
        { title: 'Home', href: route('home') },
        { title: 'About', href: route('about') },
        { title: 'Register', href: route('register') },
    ];

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-in-out',
        });
    }, []);

    const faqs = [
        {
            question: 'What is IT-ESEGA?',
            answer: 'IT-ESEGA is the premier technology competition that brings together the brightest minds from universities across the nation.',
        },
        {
            question: 'How can I register?',
            answer: 'You can register for the tournament by clicking the "Register Now" button on our homepage.',
        },
        {
            question: 'What games are included in the tournament?',
            answer: 'The tournament features popular games like Mobile Legends and Free Fire.',
        },
    ];

    return (
        <>
            <Head title="IT-ESEGA 2025 Official Website" />
            <div className="bg-background from-primary to-secondary font-poppins relative min-h-screen text-black">
                {/* Background Overlay */}
                <div
                    className="from-primary to-secondary absolute inset-0 z-0 bg-gradient-to-br opacity-8"
                    style={{
                        backgroundImage: `url('/images/Halftone-1.png'), url('/images/bg-image.png')`,
                        backgroundRepeat: 'repeat, no-repeat',
                        backgroundSize: '400px, contain',
                        backgroundPosition: 'center, top center',
                        backgroundBlendMode: 'overlay',
                    }}
                />

                <div className="relative z-10">
                    <Navbar
                        logo={
                            <div className="flex items-center justify-center">
                                <img src="/images/LogoEsega25.png" alt="IT-ESEGA-25 Logo" className="h-18 w-auto object-contain" />
                            </div>
                        }
                        items={navItems}
                    />

                    {/* Hero Section */}
                    <div className="container mx-auto my-10 px-6 py-25">
                        <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-[1.5fr_1fr]">
                            <div className="text-center md:text-left" data-aos="fade-right">
                                <h1 className="mb-4 text-7xl font-black">
                                    IT-ESEGA <span className="text-secondary inline-block -skew-x-12 transform">2025</span>
                                </h1>
                                <p className="mb-8 text-xl text-black">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi molestias architecto nemo? Dolorem alias cum
                                    fugit inventore tempore fuga perspiciatis, eligendi provident natus non cupiditate labore vero tenetur deserunt
                                    suscipit..
                                </p>
                                <div className="flex justify-center space-x-4 md:justify-start">
                                    <Link
                                        href={route('register')}
                                        className="border-secondary text-secondary hover:bg-secondary rounded-lg border bg-transparent px-8 py-4 text-lg font-semibold transition-colors duration-300 hover:text-white"
                                    >
                                        Register Now!
                                    </Link>
                                </div>
                            </div>
                            <div className="hidden justify-center md:flex md:justify-end" data-aos="fade-left">
                                <img
                                    src="/images/LogoEsega25.png"
                                    alt="IT-ESEGA Logo"
                                    className="animate-float h-60 w-auto object-contain md:h-115"
                                />
                            </div>
                        </div>
                    </div>

                    {/* About Section */}
                    <section className="bg-cover bg-center py-16" style={{ backgroundImage: 'url(/images/backrground.jpg)' }} data-aos="fade-up">
                        <div className="container mx-auto px-6">
                            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_1.2fr]">
                                <div className="flex justify-center md:justify-start" data-aos="fade-right">
                                    <img src="/images/MascotEsega25.png" alt="Mascot" className="h-64 w-auto object-contain md:h-150" />
                                </div>
                                <div className="text-center md:text-left" data-aos="fade-left">
                                    <h2 className="mb-8 text-4xl font-bold">
                                        About <span className="text-red-600">IT-ESEGA</span>
                                    </h2>
                                    <p className="mb-6 text-lg">
                                        IT-ESEGA is the premier technology competition that brings together the brightest minds from universities
                                        across the nation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Competition Section */}
                    <section className="bg-cover bg-center py-16" style={{ backgroundImage: 'url(/images/backrground.jpg)' }} data-aos="fade-up">
                        <div className="relative z-10 container mx-auto px-6 pt-25">
                            <h2 className="mb-8 text-center text-4xl font-bold" data-aos="fade-up">
                                Upcoming Tournament
                            </h2>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                {/* Mobile Legends */}
                                <div
                                    className="relative overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-lg"
                                    data-aos="fade-up"
                                    data-aos-delay="100"
                                    style={{
                                        backgroundImage: `url('/images/ML-overlay.jpg')`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                >
                                    <div className="bg-opacity-90 relative z-10 flex flex-col items-center bg-white p-6">
                                        <img src="/images/ML-logo.png" alt="Mobile Legends Tournament" className="mb-4 h-50 w-60 object-contain" />
                                        <h3 className="text-primary mb-2 text-center text-2xl font-bold">
                                            Mobile Legends <span className="text-black">Tournament</span>
                                        </h3>
                                        <p className="mb-6 text-center text-gray-600">
                                            Compete in Esega's premier Mobile Legends tournament. Show your strategic gameplay and team coordination
                                            skills.
                                        </p>
                                        <Link
                                            href={route('register')}
                                            className="border-primary text-primary hover:bg-primary rounded-lg border px-8 py-4 text-sm font-semibold transition-colors duration-300 hover:text-white"
                                        >
                                            Register Now
                                        </Link>
                                    </div>
                                </div>

                                {/* Free Fire */}
                                <div
                                    className="relative overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-lg"
                                    data-aos="fade-up"
                                    data-aos-delay="200"
                                    style={{
                                        backgroundImage: `url('/images/FF-overlay.jpg')`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                >
                                    <div className="bg-opacity-90 relative z-10 flex flex-col items-center bg-white p-6">
                                        <img src="/images/FF-logo.png" alt="Free Fire Tournament" className="mb-4 h-50 w-60 object-contain" />
                                        <h3 className="text-primary mb-2 text-center text-2xl font-bold">
                                            Free Fire <span className="text-black">Tournament</span>
                                        </h3>
                                        <p className="mb-6 text-center text-gray-600">
                                            Battle it out in an intense Free Fire competition. Demonstrate your survival skills and tactical
                                            expertise.
                                        </p>
                                        <Link
                                            href={route('register')}
                                            className="border-primary text-primary hover:bg-primary rounded-lg border px-8 py-4 text-sm font-semibold transition-colors duration-300 hover:text-white"
                                        >
                                            Register Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Timeline Section */}
                    <section className="bg-cover bg-center py-16" style={{ backgroundImage: 'url(/images/backrground.jpg)' }} data-aos="fade-up">
                        <div className="container mx-auto px-6">
                            <h2 className="mb-16 text-center text-4xl font-extrabold text-gray-900">
                                Event <span className="text-red-600">Timeline</span>
                            </h2>

                            <div className="relative mx-auto flex w-full flex-col items-center">
                                <div className="bg-primary absolute top-0 left-1/2 h-full w-1 -translate-x-1/2 transform" />
                                {[
                                    {
                                        date: 'January 1, 2025',
                                        title: 'Lorem Ipsum Dolor',
                                        description:
                                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula magna ut ante cursus.',
                                    },
                                    {
                                        date: 'February 10, 2025',
                                        title: 'Sit Amet Consectetur',
                                        description:
                                            'Phasellus vitae sapien vel velit dapibus suscipit. Pellentesque habitant morbi tristique senectus.',
                                    },
                                    {
                                        date: 'March 20, 2025',
                                        title: 'Adipisicing Elit',
                                        description:
                                            'Mauris lacinia, nulla in fermentum blandit, urna leo laoreet nulla, eget sodales ligula erat ac elit.',
                                    },
                                    {
                                        date: 'April 5, 2025',
                                        title: 'Dolore Magna Aliqua',
                                        description:
                                            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                                    },
                                ].map((item, index) => {
                                    const isLeft = index % 2 === 0;
                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                            className={`mb-16 flex w-full flex-col items-center md:w-1/2 ${
                                                isLeft ? 'pr-4 md:items-end md:self-start' : 'pl-4 md:items-start md:self-end'
                                            }`}
                                        >
                                            <div className="relative max-w-md rounded-xl border bg-white p-6 shadow-md">
                                                <span className="bg-primary absolute -top-3 left-1/2 h-5 w-5 -translate-x-1/2 transform rounded-full border-4 border-white shadow-lg"></span>
                                                <p className="mb-1 text-sm text-gray-500">{item.date}</p>
                                                <h4 className="text-primary mb-2 text-xl font-semibold">{item.title}</h4>
                                                <p className="text-gray-700">{item.description}</p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="bg-cover bg-center py-16" style={{ backgroundImage: 'url(/images/backrground.jpg)' }} data-aos="fade-up">
                        <div className="container mx-auto px-4">
                            <div className="mx-auto max-w-3xl">
                                <h2 className="mb-10 text-center text-4xl font-extrabold text-gray-900">
                                    Frequently <span className="text-red-600">Asked Questions</span>
                                </h2>
                                <div className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-gray-50 shadow-sm">
                                    {faqs.map((faq, index) => (
                                        <Disclosure key={index}>
                                            {({ open }) => (
                                                <div className="px-6 py-5 transition-all hover:bg-gray-100">
                                                    <Disclosure.Button className="flex w-full items-center justify-between text-left text-lg font-medium text-gray-800 focus:outline-none">
                                                        <span>{faq.question}</span>
                                                        <span className="ml-4 flex-shrink-0 text-gray-500 transition-transform duration-300 ease-in-out">
                                                            <svg
                                                                className={`h-5 w-5 transform transition-transform duration-300 ${
                                                                    open ? 'rotate-180' : ''
                                                                }`}
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </span>
                                                    </Disclosure.Button>
                                                    <Disclosure.Panel className="mt-2 text-sm leading-relaxed text-gray-700">
                                                        {faq.answer}
                                                    </Disclosure.Panel>
                                                </div>
                                            )}
                                        </Disclosure>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="border-t border-gray-200 bg-gray-100 py-10">
                        <div className="container mx-auto px-4">
                            <div className="flex flex-col items-center justify-center space-y-6 text-center">
                                <img src="/images/LogoEsega25.png" alt="IT-ESEGA Logo" className="h-14 w-auto" />

                                <div className="flex space-x-6">
                                    <Link
                                        href={route('home')}
                                        className="hover:text-primary text-sm font-medium text-gray-600 transition duration-300"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        href={route('about')}
                                        className="hover:text-primary text-sm font-medium text-gray-600 transition duration-300"
                                    >
                                        About
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="hover:text-primary text-sm font-medium text-gray-600 transition duration-300"
                                    >
                                        Register
                                    </Link>
                                </div>

                                <div className="text-sm font-medium text-gray-500">
                                    &copy; {new Date().getFullYear()} IT-ESEGA. All rights reserved.
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}

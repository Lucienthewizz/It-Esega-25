"use client"

import { Navbar } from '@/components/navbar';
import { UserType } from '@/types/user';
import { Disclosure } from '@headlessui/react';
import { Head, Link, usePage } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { route } from 'ziggy-js';

export default function Home() {
    const { user } = usePage<{ user: { data: UserType } }>().props;
    // const auth = user;

    console.log('Dari Home', user);

    // console.log(auth?.roles?.[0]?.name)

    const navItems = [
        { title: 'Home', href: route('home') },
        { title: 'About', href: '#about' },
        { title: 'FAQ', href: '#faq' },
        { title: 'Contact', href: '#contact' },
        { title: 'Register', href: '#register' },
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
            <div className="font-poppins relative min-h-screen rounded-lg bg-white text-black shadow-md">
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
                        user={user}
                        logo={
                            <div className="flex items-center justify-center">
                                <img src="/images/LogoEsega25.png" alt="IT-ESEGA-25 Logo" className="h-18 w-auto object-contain" />
                            </div>
                        }
                        items={navItems}
                    />

                    {/* Hero Section */}
                    <div className="container mx-auto px-6 py-30 pt-35">
                        <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-[1.5fr_1fr]">
                            <div className="text-center md:text-left" data-aos="fade-right">
                                <h1 className="mb-4 text-7xl font-black text-[#333]">
                                    IT-ESEGA <span className="text-secondary inline-block -skew-x-12 transform">2025</span>
                                </h1>
                                <p className="mb-8 text-xl text-[#333]">
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
                                    <button
                                        onClick={() => setIsOpen(true)}
                                        className="group inline-flex items-center px-5 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-medium
                                            text-red-600 rounded-lg transition-all duration-300 relative
                                            hover:text-red-700 border border-red-200 hover:border-red-300 hover:shadow-md
                                            after:absolute after:inset-0 after:bg-red-50/0 hover:after:bg-red-50/80 after:transition-colors after:duration-300 after:rounded-lg overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center">
                                            <span className="mr-2">How to Register</span>
                                            <div className="relative w-6 h-6">
                                                <div className="absolute inset-0 bg-red-100 rounded-full transition-opacity duration-300 group-hover:bg-red-200"></div>
                                                <svg
                                                    className="relative w-6 h-6 text-red-600 group-hover:text-red-700 transition-colors duration-300"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div className="hidden justify-center md:flex md:justify-end" data-aos="fade-left">
                                <img
                                    src="/images/LogoEsega25.png"
                                    alt="IT-ESEGA Logo"
                                    className="w-auto h-[420px] object-contain"
                                    style={{ 
                                        maxWidth: '100%',
                                        willChange: 'transform',
                                        backfaceVisibility: 'hidden',
                                        transform: 'translateZ(0)'
                                    }}
                                    animate={{
                                        y: [0, -10, 0],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        type: "tween"
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* About Section */}
                    <section id="about" className="bg-white bg-cover bg-center py-16" data-aos="fade-up">
                        <div className="container mx-auto px-6">
                            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[1fr_1.2fr]">
                                <div className="flex justify-center md:justify-start" data-aos="fade-right">
                                    <img src="/images/MascotEsega25.png" alt="Mascot" className="h-64 w-auto object-contain md:h-150" />
                                </div>
                                <div className="text-center md:text-left" data-aos="fade-left">
                                    <h2 className="mb-8 text-4xl font-bold text-[#333]">
                                        About <span className="text-red-600">IT-ESEGA</span>
                                    </h2>
                                    <p className="mb-6 text-lg text-[#333]">
                                        IT-ESEGA is the premier technology competition that brings together the brightest minds from universities
                                        across the nation.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Event Teaser*/}
                    <section className="bg-cover bg-center py-16" data-aos="fade-up">
                        <div className="container mx-auto px-6">
                            <h2 className="mb-8 text-center text-4xl font-bold text-[#333]">
                                Event <span className="text-red-600">Teaser</span>
                            </h2>
                            <div className="flex justify-center">
                                <iframe
                                    width="560"
                                    height="315"
                                    src="https://www.youtube.com/embed/your-video-id"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allowFullScreen
                                    className="rounded-lg shadow-lg"
                                ></iframe>
                            </div>
                            <div className="mt-8 text-center">
                                <p className="text-lg text-[#333]">
                                    Join us for an unforgettable experience filled with excitement, competition, and camaraderie.
                                </p>
                                <p className="text-lg text-[#333]">Stay tuned for more updates and get ready to showcase your skills!</p>
                            </div>
                        </div>
                    </section>

                    {/* Prizepool Section */}
                    <section className="bg-cover bg-center py-16" data-aos="fade-up">
                        <div className="container mx-auto px-6">
                            <h2 className="mb-8 text-center text-4xl font-bold text-[#333]">
                                Prize <span className="text-red-600">Pool</span>
                            </h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                {[
                                    {
                                        title: '1st Place',
                                        amount: '$1000',
                                        description: 'Champion of the tournament.',
                                        delay: 100,
                                    },
                                    {
                                        title: '2nd Place',
                                        amount: '$500',
                                        description: 'Runner-up of the tournament.',
                                        delay: 200,
                                    },
                                    {
                                        title: '3rd Place',
                                        amount: '$250',
                                        description: 'Third place in the tournament.',
                                        delay: 300,
                                    },
                                ].map((prize, i) => (
                                    <div
                                        key={i}
                                        className="group relative flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                                        data-aos="fade-up"
                                        data-aos-delay={prize.delay}
                                    >
                                        <h3 className="mb-4 text-2xl font-semibold text-gray-800">{prize.title}</h3>
                                        <p className="mb-2 text-lg font-bold text-red-600">{prize.amount}</p>
                                        <p className="text-sm text-gray-500">{prize.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Competition Section */}
                    <section className="bg-[#ffff] bg-cover bg-center py-24" data-aos="fade-up">
                        <div className="container mx-auto px-4">
                            <h2 className="mb-16 text-center text-4xl font-bold tracking-tight text-gray-800" data-aos="fade-up">
                                Upcoming <span className="text-secondary">Tournament</span>
                            </h2>

                            <div className="grid grid-cols-1 justify-items-center gap-12 md:grid-cols-2">
                                {[
                                    {
                                        title: 'Mobile Legends',
                                        description:
                                            "Compete in Esega's premier Mobile Legends tournament. Showcase your strategic gameplay and team coordination skills to become the champion.",
                                        image: '/images/ML-logo.png',
                                        delay: 100,
                                        link: 'registerml', // Specify route for Mobile Legends
                                    },
                                    {
                                        title: 'Free Fire',
                                        description:
                                            'Battle it out in an intense Free Fire competition. Demonstrate your survival skills and tactical expertise to claim victory.',
                                        image: '/images/FF-logo.png',
                                        delay: 200,
                                        link: 'registerff',
                                    },
                                ].map((game, i) => (
                                    <div
                                        key={i}
                                        className="group relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                                        data-aos="fade-up"
                                        data-aos-delay={game.delay}
                                    >
                                        {/* Background Hover Overlay */}
                                        <div className="from-secondary/10 to-secondary/5 absolute inset-0 bg-gradient-to-b opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                        <div className="relative z-10 p-8">
                                            <div className="mb-6 flex justify-center">
                                                <img
                                                    src={game.image}
                                                    alt={`${game.title} Tournament`}
                                                    className="h-40 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                                                />
                                            </div>

                                            {/* Hidden content until hover */}
                                            <div className="translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                                                <h3 className="mb-4 text-center text-2xl font-semibold text-gray-800">
                                                    <span className="text-red-600">{game.title}</span> Tournament
                                                </h3>

                                                <p className="mb-6 text-center text-sm leading-relaxed text-gray-500">{game.description}</p>

                                                <div className="flex justify-center">
                                                    <Link
                                                        href={route(game.link)} // Use dynamic route based on the game
                                                        className="hover:bg-primary/90 inline-block rounded-lg bg-red-600 px-6 py-2.5 text-sm font-medium text-white transition hover:shadow-md"
                                                    >
                                                        Register Now
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Timeline Section */}
                    <section className="bg-cover bg-center py-16" data-aos="fade-up">
                        <div className="container mx-auto px-6">
                            <h2 className="mb-16 text-center text-4xl font-extrabold text-gray-900">
                                Event <span className="text-red-600">Timeline</span>
                            </h2>

                            <div className="relative mx-auto flex w-full flex-col items-center">
                                {/* Vertical Line */}
                                <div className="absolute top-0 left-1/2 h-full w-1 -translate-x-1/2 transform bg-red-600" />

                                <div className="flex w-full flex-col items-center">
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
                                                    <span className="absolute -top-3 left-1/2 h-5 w-5 -translate-x-1/2 transform rounded-full border-4 border-white bg-red-600 shadow-lg"></span>
                                                    <p className="mb-1 text-sm text-gray-500">{item.date}</p>
                                                    <h4 className="mb-2 text-xl font-semibold text-red-600">{item.title}</h4>
                                                    <p className="text-gray-700">{item.description}</p>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section id="faq" className="bg-cover bg-center py-40" data-aos="fade-up">
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

                    {/* Contact Person inti esega*/}
                    <section id="contact" className="bg-cover bg-center py-16" data-aos="fade-up">
                        <div className="container mx-auto px-4">
                            <h2 className="mb-8 text-center text-4xl font-bold text-[#333]">
                                Contact <span className="text-red-600">Persons</span>
                            </h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                {[
                                    {
                                        name: 'John Doe',
                                        role: 'Admin',
                                        phone: '+1234567890',
                                        delay: 100,
                                    },
                                    {
                                        name: 'Jane Smith',
                                        role: 'Admin',
                                        phone: '+0987654321',
                                        delay: 200,
                                    },
                                    {
                                        name: 'Alice Johnson',
                                        role: 'Admin',
                                        phone: '+1122334455',
                                        delay: 300,
                                    },
                                ].map((person, i) => (
                                    <div
                                        key={i}
                                        className="group relative flex flex-col items-center justify-center rounded-lg bg-white p-6 shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                                        data-aos="fade-up"
                                        data-aos-delay={person.delay}
                                    >
                                        <h3 className="mb-4 text-lg font-semibold text-gray-800">{person.name}</h3>
                                        <p className="mb-2 text-sm text-gray-500">{person.role}</p>
                                        <a href={`https://wa.me/${person.phone}`} className="text-blue-500 hover:text-blue-700">
                                            {person.phone}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <Footer />
                </div>
            </div>
        </>
    );
}

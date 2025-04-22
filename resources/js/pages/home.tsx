import { Navbar } from '@/components/navbar';
import { UserType } from '@/types/user';
import { Disclosure } from '@headlessui/react';
import { Head, Link, usePage } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { title } from 'process';
import { useEffect } from 'react';
import { route } from 'ziggy-js';

export default function Home() {
    const { user } = usePage<{ user: { data: UserType } }>().props;
    // const auth = user;


    console.log('Dari Home', user);

    // console.log(auth?.roles?.[0]?.name)



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
                    <section className="bg-cover bg-center py-16 bg-white" data-aos="fade-up">
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

                    {/* Competition Section */}
                    <section className="bg-[#f9f9f9] bg-cover bg-center py-24" data-aos="fade-up">
                        <div className="container mx-auto px-4">
                            <h2 className="mb-16 text-center text-4xl font-bold tracking-tight text-gray-800" data-aos="fade-up">
                                Upcoming <span className="text-secondary">Tournament</span>
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center">
                                {[{
                                    title: "Mobile Legends",
                                    description: "Compete in Esega's premier Mobile Legends tournament. Showcase your strategic gameplay and team coordination skills to become the champion.",
                                    image: "/images/ML-logo.png",
                                    delay: 100,
                                }, {
                                    title: "Free Fire",
                                    description: "Battle it out in an intense Free Fire competition. Demonstrate your survival skills and tactical expertise to claim victory.",
                                    image: "/images/FF-logo.png",
                                    delay: 200,
                                }].map((game, i) => (
                                    <div
                                        key={i}
                                        className="group relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                                        data-aos="fade-up"
                                        data-aos-delay={game.delay}
                                    >
                                        {/* Background Hover Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-secondary/10 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <div className="relative z-10 p-8">
                                            <div className="flex justify-center mb-6">
                                                <img
                                                    src={game.image}
                                                    alt={`${game.title} Tournament`}
                                                    className="h-40 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                                                />
                                            </div>

                                            {/* Hidden content until hover */}
                                            <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                                <h3 className="text-center text-2xl font-semibold mb-4 text-gray-800">
                                                    <span className="text-primary">{game.title}</span> Tournament
                                                </h3>

                                                <p className="text-center text-gray-500 leading-relaxed mb-6 text-sm">
                                                    {game.description}
                                                </p>

                                                <div className="flex justify-center">
                                                    <Link
                                                        href={route('register')}
                                                        className="inline-block rounded-lg bg-primary px-6 py-2.5 text-white text-sm font-medium transition hover:bg-primary/90 hover:shadow-md"
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
                                            className={`mb-16 flex w-full flex-col items-center md:w-1/2 ${isLeft ? 'pr-4 md:items-end md:self-start' : 'pl-4 md:items-start md:self-end'
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
                    <section id="faq" className="bg-cover bg-center py-40" style={{ backgroundImage: 'url(/images/backrground.jpg)' }} data-aos="fade-up">
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
                                                                className={`h-5 w-5 transform transition-transform duration-300 ${open ? 'rotate-180' : ''
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
                    <footer className="bg-gradient-to-b from-red-400 to-red-900 py-20">
                        <div className="container mx-auto px-6">
                            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-8">
                                {/* Logo and Description */}
                                <div className="text-white">
                                    <img src="/images/LogoEsega25.png" alt="BUILD-IT 2024" className="h-24 w-auto mb-4" />
                                    <p className='text-2xl font-bold mb-3'>IT-ESEGA 2025</p>
                                    <p className="text-base leading-relaxed mr-70">
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure, sed mollitia at aperiam explicabo ullam odio temporibus obcaecati rerum dolorum.
                                    </p>
                                    <div className="flex space-x-4 mt-6">
                                        <a href="https://facebook.com" className="text-white hover:text-secondary transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                            </svg>
                                        </a>
                                        <a href="https://twitter.com" className="text-white hover:text-secondary transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                                            </svg>
                                        </a>
                                        <a href="https://instagram.com" className="text-white hover:text-secondary transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                            </svg>
                                        </a>
                                        <a href="https://youtube.com" className="text-white hover:text-secondary transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube">
                                                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                                                <path d="m10 15 5-3-5-3z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                                {/* Quick Links */}
                                <div>
                                    <h3 className="text-white text-2xl font-semibold mb-4">Quick Links</h3>
                                    <div className="flex flex-col space-y-4">
                                        <Link
                                            href={route('home')}
                                            className="text-white hover:text-secondary transition-colors flex items-center group"
                                        >
                                            Home
                                            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                                    <path fillRule="evenodd" d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        </Link>
                                        <Link
                                            href={route('about')}
                                            className="text-white hover:text-secondary transition-colors flex items-center group"
                                        >
                                            About
                                            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                                    <path fillRule="evenodd" d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                {/* Competition */}
                                <div>
                                    <h3 className="text-white text-2xl font-semibold mb-4">Competition</h3>
                                    <div className="flex flex-col space-y-4">
                                        <Link
                                            href="#"
                                            className="text-white hover:text-secondary transition-colors flex items-center group"
                                        >
                                            Mobile Legends
                                            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                                    <path fillRule="evenodd" d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        </Link>
                                        <Link
                                            href="#"
                                            className="text-white hover:text-secondary transition-colors flex items-center group"
                                        >
                                            Free Fire
                                            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                                    <path fillRule="evenodd" d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/20 text-center text-white">
                                <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}

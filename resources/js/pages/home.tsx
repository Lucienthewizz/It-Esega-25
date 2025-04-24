import { Navbar } from '@/components/navbar';
import { UserType } from '@/types/user';
import { Disclosure } from '@headlessui/react';
import { Head, Link, usePage } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { route } from 'ziggy-js';
import { Footer } from '@/components/footer';

export default function Home() {
    const { user } = usePage<{ user: { data: UserType } }>().props;
    // const auth = user;


    console.log('Dari Home', user);

    // console.log(auth?.roles?.[0]?.name)



    const navItems = [
        { title: 'Home', href: route('home') },
        { title: 'About', href: route('about') },
        { title: 'FAQ', href: '#faq' },
        { title: 'Contact', href: '#contact' },
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

    const footerSections = [
        {
            title: "Quick Links",
            links: [
                { title: "Home", href: route('home') },
                { title: "About", href: route('about') },
                { title: "FAQ", href: "#faq" },
                { title: "Contact", href: "#contact" },
            ]
        },
        {
            title: "Competition",
            links: [
                { title: "Mobile Legends", href: "#" },
                { title: "Free Fire", href: "#" }
            ]
        }
    ];

    const socialMedia = [
        {
            name: "Facebook",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
            ),
            href: "https://facebook.com"
        },
        {
            name: "TikTok",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
            ),
            href: "https://tiktok.com"
        },
        {
            name: "Instagram",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
            ),
            href: "https://instagram.com"
        },
        {
            name: "YouTube",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                    <path d="m10 15 5-3-5-3z" />
                </svg>
            ),
            href: "https://youtube.com"
        }
    ];

    return (
        <>
            <Head title="IT-ESEGA 2025 Official Website" />
            <div className="bg-background from-primary to-secondary font-poppins relative min-h-screen text-black overflow-hidden">

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
                    <div className="container mx-auto px-6 py-25">
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

                    {/* Competition Section */}
                    <section className="bg-gradient-to-b from-white to-red-50/50 py-32 relative overflow-hidden">
                        {/* Cross Shape Blob 1 */}
                        <div className="absolute -right-16 top-32 w-64 h-64 opacity-10 pointer-events-none">
                            <motion.div
                                animate={{
                                    rotate: [0, 360],
                                }}
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="w-full h-full"
                            >
                                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-red-500">
                                    <path d="M85,40 h30 v45 h45 v30 h-45 v45 h-30 v-45 h-45 v-30 h45 z"/>
                                </svg>
                            </motion.div>
                                </div>

                        {/* Cross Shape Blob 2 */}
                        <div className="absolute -left-16 bottom-32 w-48 h-48 opacity-10 pointer-events-none">
                            <motion.div
                                animate={{
                                    rotate: [0, -360],
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{
                                    duration: 25,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="w-full h-full"
                            >
                                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-red-500">
                                    <path d="M85,40 h30 v45 h45 v30 h-45 v45 h-30 v-45 h-45 v-30 h45 z"/>
                                </svg>
                            </motion.div>
                        </div>

                        <div className="container mx-auto px-4">
                            <div className="text-center mb-20">
                                <h2 className="text-4xl font-bold tracking-tight text-gray-800 mb-4" data-aos="fade-down">
                                    Upcoming <span className="text-red-600">Tournament</span>
                            </h2>
                                <div className="w-24 h-1 bg-red-600 mx-auto rounded-full" data-aos="fade-down"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 justify-items-center">
                                {[{
                                    title: "Mobile Legends",
                                    slots: "64 SLOTS",
                                    type: "SINGLE SLOT",
                                    scope: "NATIONAL COMPETITION",
                                    date: "JULY 1st, 2nd, 8th, 9th",
                                    mode: "ONLINE",
                                    image: "/images/ML-logo.png",
                                    bgImage: "/images/ml-bg.png",
                                    delay: 100,
                                    animation: "fade-right"
                                }, {
                                    title: "Free Fire",
                                    slots: "64 SLOTS",
                                    type: "SINGLE SLOT",
                                    scope: "NATIONAL COMPETITION",
                                    date: "JULY 1st, 2nd, 8th, 9th",
                                    mode: "ONLINE",
                                    image: "/images/FF-logo.png",
                                    bgImage: "/images/FF-bg.jpg",
                                    delay: 200,
                                    animation: "fade-left"
                                }].map((game, i) => (
                                    <div
                                        key={i}
                                        className="group relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:shadow-2xl border-2 border-red-500/50 hover:border-red-500 p-3"
                                        data-aos={game.animation}
                                        data-aos-delay={game.delay}
                                        style={{
                                            height: '540px',
                                        }}
                                    >
                                        {/* Background Game Image */}
                                        <div 
                                            className="absolute inset-0 m-3 rounded-xl bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                            style={{
                                                backgroundImage: `url(${game.bgImage})`,
                                            }}
                                        />
                                        
                                        {/* Dark Overlay on Hover */}
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/90 via-black/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                        {/* Content Container */}
                                        <div className="relative h-full w-full flex flex-col items-center justify-center">
                                            {/* Game Logo Container - Always on top */}
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                                                <div className="flex justify-center items-center rounded-full p-8 transition-all duration-500 group-hover:-translate-y-[60%]">
                                                <img
                                                    src={game.image}
                                                        alt={`${game.title} Logo`}
                                                        className="h-42 w-auto object-contain transition-all duration-500 group-hover:scale-140"
                                                />
                                                </div>
                                            </div>

                                            {/* Content that appears on hover */}
                                            <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center p-8 my-5 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                                                <h3 className="text-center text-2xl font-bold mb-4 text-white">
                                                    {game.title} <span className="text-red-400">Tournament</span>
                                                    <div className="w-64 h-0.5 mt-2 bg-red-400 mx-auto rounded-full"></div>
                                                </h3>

                                                <div className="space-y-2 mb-6 text-center">
                                                    <p className="text-white/90 text-lg font-bold">{game.slots}</p>
                                                    <p className="text-white/90 text-base">{game.type}</p>
                                                    <p className="text-white/90 text-base">{game.scope}</p>
                                                    <p className="text-white/90 text-base font-semibold">{game.date}</p>
                                                    <p className="text-white/90 text-base font-bold">{game.mode}</p>
                                                </div>

                                                    <Link
                                                        href={route('register')}
                                                    className="inline-block rounded-lg bg-red-600 px-8 py-3 text-white text-base font-semibold transition-all duration-300 hover:bg-red-700 hover:shadow-lg transform hover:scale-105"
                                                    >
                                                        Register Now
                                                    </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Prizepool Section */}
                    <section className="bg-gradient-to-b from-red-50/50 to-white py-32 relative overflow-hidden">
                        {/* Cross Shape Blob */}
                        <div className="absolute -right-16 top-32 w-64 h-64 opacity-10 pointer-events-none">
                            <motion.div
                                animate={{
                                    rotate: [0, -360],
                                }}
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="w-full h-full"
                            >
                                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-red-500">
                                    <path d="M85,40 h30 v45 h45 v30 h-45 v45 h-30 v-45 h-45 v-30 h45 z"/>
                                </svg>
                            </motion.div>
                        </div>

                        <div className="container mx-auto px-4">
                            <div className="text-center mb-20">
                                <h2 className="text-4xl font-bold tracking-tight text-gray-800 mb-4" data-aos="fade-down">
                                    Total <span className="text-red-600">Prizepool</span>
                                </h2>
                                <div className="w-24 h-1 bg-red-600 mx-auto rounded-full" data-aos="fade-down"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 justify-items-center">
                                {[{
                                    title: "Mobile Legends",
                                    prizepool: "Rp 10.000.000",
                                    prizes: [
                                        { position: "1st Place", amount: "Rp 5.000.000" },
                                        { position: "2nd Place", amount: "Rp 3.000.000" },
                                        { position: "3rd Place", amount: "Rp 2.000.000" }
                                    ],
                                    animation: "fade-right"
                                }, {
                                    title: "Free Fire",
                                    prizepool: "Rp 8.000.000",
                                    prizes: [
                                        { position: "1st Place", amount: "Rp 4.000.000" },
                                        { position: "2nd Place", amount: "Rp 2.500.000" },
                                        { position: "3rd Place", amount: "Rp 1.500.000" }
                                    ],
                                    animation: "fade-left"
                                }].map((game, i) => (
                                    <div
                                        key={i}
                                        className="w-full max-w-md bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border-2 border-red-500/50 hover:border-red-500 overflow-hidden"
                                        data-aos={game.animation}
                                    >
                                        <div className="bg-gradient-to-br from-red-600 to-red-700 p-8 text-center text-white">
                                            <h3 className="text-2xl font-bold mb-4">{game.title}</h3>
                                            <div className="text-4xl font-black">{game.prizepool}</div>
                                        </div>
                                        <div className="p-8">
                                            <div className="space-y-6">
                                                {game.prizes.map((prize, index) => (
                                                    <div 
                                                        key={index}
                                                        className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            {index === 0 ? (
                                                                <span className="text-yellow-500">🏆</span>
                                                            ) : index === 1 ? (
                                                                <span className="text-gray-400">🥈</span>
                                                            ) : (
                                                                <span className="text-amber-700">🥉</span>
                                                            )}
                                                            <span className="font-semibold text-gray-700">{prize.position}</span>
                                                        </div>
                                                        <span className="text-red-600 font-bold">{prize.amount}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Timeline Section */}
                    <section className="bg-gradient-to-b from-white to-red-50/50 py-32">
                        <div className="container mx-auto px-6">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl font-extrabold text-gray-900 mb-4" data-aos="fade-down">
                                Event <span className="text-red-600">Timeline</span>
                            </h2>
                                <div className="w-24 h-1 bg-red-600 mx-auto rounded-full" data-aos="fade-down"></div>
                            </div>

                            <div className="relative mx-auto flex w-full flex-col items-center">
                                <div className="bg-red-500 absolute top-0 left-1/2 h-full w-1 -translate-x-1/2 transform" data-aos="fade-down" data-aos-duration="1500" />
                                {[
                                    {
                                        date: 'January 1, 2025',
                                        title: 'Lorem Ipsum Dolor',
                                        description:
                                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula magna ut ante cursus.',
                                        icon: (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        )
                                    },
                                    {
                                        date: 'February 10, 2025',
                                        title: 'Sit Amet Consectetur',
                                        description:
                                            'Phasellus vitae sapien vel velit dapibus suscipit. Pellentesque habitant morbi tristique senectus.',
                                        icon: (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        )
                                    },
                                    {
                                        date: 'March 20, 2025',
                                        title: 'Adipisicing Elit',
                                        description:
                                            'Mauris lacinia, nulla in fermentum blandit, urna leo laoreet nulla, eget sodales ligula erat ac elit.',
                                        icon: (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        )
                                    },
                                    {
                                        date: 'April 5, 2025',
                                        title: 'Dolore Magna Aliqua',
                                        description:
                                            'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
                                        icon: (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        )
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
                                            <div className="relative max-w-md rounded-xl border border-red-100 bg-white p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                                {/* Animated Circle */}
                                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
                                                    <div className="relative">
                                                        {/* Outer pulse animation */}
                                                        <div className="absolute -inset-4 rounded-full bg-red-500/20 animate-pulse"></div>
                                                        {/* Inner circle with icon */}
                                                        <div className="relative">
                                                            <div className="bg-red-500 h-10 w-10 rounded-full border-4 border-white shadow-lg flex items-center justify-center animate-bounce">
                                                                <div className="text-white">
                                                                    {item.icon}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="mb-2 text-sm font-medium text-red-500">{item.date}</p>
                                                <h4 className="text-red-600 mb-3 text-xl font-semibold">{item.title}</h4>
                                                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section id="faq" className="bg-white py-32">
                        <div className="container mx-auto px-4">
                            <div className="mx-auto max-w-3xl">
                                <div className="text-center mb-10">
                                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4" data-aos="fade-down">
                                    Frequently <span className="text-red-600">Asked Questions</span>
                                </h2>
                                    <div className="w-24 h-1 bg-red-600 mx-auto rounded-full" data-aos="fade-down"></div>
                                </div>
                                <div className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-gray-50 shadow-sm" data-aos="fade-up" data-aos-delay="100">
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

                    {/* Contact Person Section */}
                    <section id="contact" className="bg-gradient-to-b from-red-50 to-white py-32">
                        <div className="container mx-auto px-4">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl font-bold mb-4" data-aos="fade-down">
                                    <span className="text-red-600">CONTACT</span>{" "}
                                    <span className="text-red-400">PERSON</span>
                                </h2>
                                <div className="w-24 h-1 bg-red-600 mx-auto rounded-full" data-aos="fade-down"></div>
                                <p className="text-gray-600 text-lg max-w-2xl mx-auto mt-4" data-aos="fade-up" data-aos-delay="100">
                                    Jika Anda memiliki pertanyaan lebih lanjut, jangan ragu untuk menghubungi narahubung yang tertera di bawah ini.
                                </p>
                                </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    {
                                        name: "Damar",
                                        wa: "-",
                                        line: "-",
                                        animation: "fade-right"
                                    },
                                    {
                                        name: "Mita",
                                        wa: "-",
                                        line: "-",
                                        animation: "fade-up"
                                    },
                                    {
                                        name: "Yoga",
                                        wa: "-",
                                        line: "-",
                                        animation: "fade-left"
                                    }
                                ].map((contact, index) => (
                                    <div 
                                        key={index} 
                                        className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-red-100"
                                        data-aos={contact.animation}
                                        data-aos-delay={index * 100}
                                    >
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-md">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-semibold text-red-600">{contact.name}</h3>
                                    </div>
                                        <div className="space-y-3">
                                            <a href={`https://wa.me/${contact.wa}`} target="_blank" rel="noopener noreferrer" 
                                               className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors duration-300">
                                                <span className="font-semibold">WA:</span>
                                                <span className="hover:underline">{contact.wa}</span>
                                            </a>
                                            <p className="flex items-center gap-2 text-gray-600">
                                                <span className="font-semibold">LINE:</span>
                                                <span>{contact.line}</span>
                                            </p>
                                </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <Footer 
                        logo={
                            <img 
                                src="/images/LogoEsega25.png" 
                                alt="IT-ESEGA-25" 
                                className="h-20 w-auto object-contain hover:scale-105 transition-transform duration-300" 
                            />
                        }
                        description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure, sed mollitia at aperiam explicabo ullam odio temporibus obcaecati rerum dolorum."
                        sections={footerSections}
                        socialMedia={socialMedia}
                    />
                </div>
            </div>
        </>
    );
}

"use client"

import { Navbar } from '@/components/navbar';
import { UserType } from '@/types/user';
import { Disclosure } from '@headlessui/react';
import { Head, Link, usePage } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { useEffect, useState, Fragment } from 'react';
import { route } from 'ziggy-js';
import { Footer } from '@/components/footer';
import { Dialog, Transition } from '@headlessui/react';

export default function Home() {
    const { user } = usePage<{ user: { data: UserType } }>().props;
    const [isOpen, setIsOpen] = useState(false);
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
            duration: 800,
            once: true,
            easing: 'ease-out-cubic',
            offset: 100,
            delay: 0,
            mirror: false,
            anchorPlacement: 'top-bottom',
        });
    }, []);

    const faqs = [
        {
            question: 'Apa itu  IT-ESEGA?',
            answer: 'IT-ESEGA adalah ajang kompetisi teknologi bergengsi yang jadi tempat berkumpulnya para mahasiswa terbaik dari berbagai universitas di seluruh Indonesia.',
        },
        {
            question: 'Bagaimana saya bisa mendaftar?',
            answer: 'Kamu bisa mendaftar untuk turnamen ini dengan mengklik tombol "Daftar Sekarang" di halaman utama kami.',
        },
        {
            question: 'Game apa saja yang dimainkan dalam turnamen ini?',
            answer: 'Turnamen ini menghadirkan game-game populer seperti Mobile Legends dan Free Fire.',
        },
    ];

    return (
        <>
            <Head title="IT-ESEGA 2025 Official Website" />
            <div className="bg-white from-primary to-secondary font-poppins relative min-h-screen text-black overflow-hidden">

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
                            <div className="flex items-center justify-start">
                                <img src="/images/LogoEsega25.png" alt="IT-ESEGA-25 Logo" className="h-18 w-auto object-contain" />
                            </div>
                        }
                        items={navItems}
                    />

                    {/* Hero Section */}
                    <div className="max-w-[1350px] mx-auto px-4 md:px-8 lg:px-12 pt-35 md:pt-45 pb-16 md:pb-40">
                        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1.5fr_1fr] relative z-10 w-full">
                            <div className="text-center md:text-left" data-aos="fade-up">
                                <h1 className="mb-4 text-4xl sm:text-7xl font-black text-[#333] leading-tight">
                                    IT-ESEGA <span className="text-red-600 inline-block transform -skew-x-12">2025</span>
                                </h1>
                                <p className="mb-6 sm:mb-8 text-base sm:text-xl text-[#333] max-w-2xl mx-auto md:mx-0 leading-relaxed">
                                    Bergabunglah dalam perlombaan eSport bergengsi. Daftarkan timmu, taklukkan bracket, dan menangkan hadiah jutaan rupiah! Ayo Menjadi Juara dalam IT-ESEGA 2025
                                </p>
                                <div className="flex justify-center space-x-4 md:justify-start">
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold
                                            bg-red-600 text-white rounded-lg transform transition-all duration-300
                                            hover:bg-red-700 hover:scale-105 hover:shadow-lg"
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
                            <div className="hidden justify-center md:flex md:justify-end" data-aos="fade-up" data-aos-delay="100">
                                <motion.img
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

                    {/* Video Tutorial Modal */}
                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog
                            as="div"
                            className="fixed inset-0 z-[60] overflow-y-auto"
                            onClose={() => setIsOpen(false)}
                        >
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-200"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-150"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0">
                                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
                                </div>
                            </Transition.Child>

                            <div className="fixed inset-0 flex items-center justify-center p-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-200"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-150"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                                        <div className="relative">
                                            {/* Header */}
                                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-xl font-semibold leading-6 text-gray-900"
                                                >
                                                    How to Register
                                                </Dialog.Title>
                                                <button
                                                    onClick={() => setIsOpen(false)}
                                                    className="rounded-full p-1.5 text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-all duration-200"
                                                >
                                                    <span className="sr-only">Close</span>
                                                    <svg
                                                        className="h-5 w-5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* Video Container */}
                                            <div className="relative bg-black">
                                                <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                                                    <iframe
                                                        className="absolute inset-0 w-full h-full"
                                                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                                        title="How to Register IT-ESEGA 2025"
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                            </div>

                                            {/* Footer */}
                                            <div className="bg-gray-50 px-6 py-4">
                                                <div className="flex justify-between items-center">
                                                    <div className="text-sm text-gray-600">
                                                        Watch the tutorial carefully to understand the registration process
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors duration-200"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        Got it
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition>

                    {/* Competition Section */}
                    <section className="relative overflow-hidden py-16 md:py-24">
                        {/* Background Layer */}
                        <div className="absolute inset-0 bg-white"></div>
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white via-red-50/40 to-red-100/30"></div>

                        {/* Cross Blob - Top Left Competition */}
                        <div className="absolute -left-12 top-24 w-28 h-28 opacity-5 pointer-events-none">
                            <motion.div
                                animate={{
                                    rotate: [0, -360],
                                }}
                                transition={{
                                    duration: 28,
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

                        {/* Cross Blob - Bottom Right Competition */}
                        <div className="absolute right-8 bottom-16 w-20 h-20 opacity-5 pointer-events-none">
                            <motion.div
                                animate={{
                                    rotate: [360, 0],
                                }}
                                transition={{
                                    duration: 22,
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
                        
                        {/* Content Container */}
                        <div className="relative z-10 max-w-[1350px] mx-auto px-4 md:px-8 lg:px-12">
                            <div className="text-center mb-8 md:mb-12">
                                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-800 mb-4" data-aos="fade-up">
                                    Upcoming <span className="text-red-600">Tournament</span>
                            </h2>
                                <div className="w-20 sm:w-24 h-1 bg-red-600 mx-auto rounded-full" data-aos="fade-up" data-aos-delay="50"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 justify-items-center">
                                {[{
                                    title: "Mobile Legends",
                                    slots: "64 SLOTS",
                                    type: "SINGLE SLOT",
                                    scope: "NATIONAL COMPETITION",
                                    date: "JULY 1st, 2nd, 8th, 9th",
                                    mode: "ONLINE",
                                    image: "/images/ML-logo.png",
                                    bgImage: "/images/ml-bg.png",
                                    delay: 0,
                                    animation: "fade-up"
                                }, {
                                    title: "Free Fire",
                                    slots: "64 SLOTS",
                                    type: "SINGLE SLOT",
                                    scope: "NATIONAL COMPETITION",
                                    date: "JULY 1st, 2nd, 8th, 9th",
                                    mode: "ONLINE",
                                    image: "/images/FF-logo.png",
                                    bgImage: "/images/FF-bg.jpg",
                                    delay: 100,
                                    animation: "fade-up"
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

                    {/* Video Teaser Section */}
                    <section className="relative overflow-hidden py-16 md:py-24">
                        <div className="absolute inset-0 bg-gradient-to-b from-red-100/30 via-white to-red-50/40"></div>
                        <div className="relative z-10 max-w-[1350px] mx-auto px-4 md:px-8 lg:px-12">
                            <div className="text-center mb-8 md:mb-12">
                                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-800 mb-4" data-aos="fade-up">
                                    IT-ESEGA <span className="text-red-600">Teaser</span>
                                </h2>
                                <div className="w-20 sm:w-24 h-1 bg-red-600 mx-auto rounded-full mb-6 sm:mb-8" data-aos="fade-up" data-aos-delay="50"></div>
                                <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
                                    Saksikan keseruan dan kemeriahan IT-ESEGA dalam video teaser berikut ini
                                </p>
                            </div>

                            <div className="max-w-4xl mx-auto px-4 sm:px-0">
                                <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-red-500/20 hover:border-red-500/40 transition-all duration-500" data-aos="fade-up" data-aos-delay="150">
                                    {/* Video Container dengan Aspect Ratio 16:9 */}
                                    <div className="relative w-full pt-[56.25%] bg-black">
                                        <iframe
                                            className="absolute top-0 left-0 w-full h-full"
                                            src="https://www.youtube.com/embed/YOUR_TEASER_VIDEO_ID"
                                            title="IT-ESEGA 2025 Official Teaser"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                        ></iframe>
                                    </div>

                                    {/* Video Info */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                        <div className="flex items-center justify-between text-white">
                                            <div>
                                                <h3 className="text-xl font-bold mb-2">IT-ESEGA 2025 Official Teaser</h3>
                                                <p className="text-sm text-gray-300">Experience the Next Level of Gaming Competition</p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="inline-flex items-center bg-red-600/80 px-3 py-1 rounded-full text-sm">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                    </svg>
                                                    Official Teaser
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Prizepool Section */}
                    <section className="relative overflow-hidden py-16 md:py-24">
                        <div className="absolute inset-0 bg-gradient-to-b from-red-50/40 via-red-100/30 to-white"></div>
                        <div className="relative z-10 max-w-[1350px] mx-auto px-4 md:px-8 lg:px-12">
                            <div className="text-center mb-8 md:mb-12">
                                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-800 mb-4" data-aos="fade-up">
                                    Total <span className="text-red-600">Prizepool</span>
                                </h2>
                                <div className="w-20 sm:w-24 h-1 bg-red-600 mx-auto rounded-full" data-aos="fade-up" data-aos-delay="50"></div>
                            </div>

                            <div className="max-w-lg mx-auto">
                                <div
                                    className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-500 border-2 border-red-500/50 hover:border-red-500"
                                    data-aos="fade-up" data-aos-delay="100"
                                >
                                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-red-600"></div>
                                    <div className="px-6 py-8 sm:px-8 sm:py-10">
                                        <div className="flex flex-col items-center">
                                            <div className="mb-3 rounded-full bg-red-50 p-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-medium text-gray-500 mb-1">Total Hadiah</p>
                                                <h3 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">Rp 10.000.000</h3>
                                                <div className="flex items-center justify-center gap-2 text-gray-600">
                                                    <span className="text-2xl">🏆</span>
                                                    <p className="text-sm">Mobile Legends & Free Fire</p>
                                                </div>
                                            </div>
                                            <Link
                                                href={route('register')}
                                                className="mt-6 inline-flex items-center px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
                                            >
                                                Daftar Sekarang
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Timeline Section */}
                    <section className="relative overflow-hidden py-16 md:py-24">
                        <div className="absolute inset-0 bg-gradient-to-b from-white via-red-50/40 to-red-100/30"></div>
                        <div className="relative z-10 max-w-[1350px] mx-auto px-4 md:px-8 lg:px-12">
                            <div className="text-center mb-8 md:mb-12">
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4" data-aos="fade-up">
                                Event <span className="text-red-600">Timeline</span>
                            </h2>
                                <div className="w-20 sm:w-24 h-1 bg-red-600 mx-auto rounded-full" data-aos="fade-up" data-aos-delay="50"></div>
                            </div>

                            <div className="relative mx-auto flex w-full flex-col items-center">
                                {/* Timeline Line */}
                                <div 
                                    className="bg-red-500 absolute top-0 left-1/2 h-full w-1 -translate-x-1/2 transform md:block hidden" 
                                    data-aos="fade-down" 
                                    data-aos-duration="1500"
                                    data-aos-delay="200"
                                    data-aos-easing="ease-out-cubic"
                                />
                                {/* Mobile Timeline Line */}
                                <div 
                                    className="bg-red-500 absolute top-0 left-6 h-full w-1 md:hidden" 
                                    data-aos="fade-down" 
                                    data-aos-duration="1500"
                                    data-aos-delay="200"
                                    data-aos-easing="ease-out-cubic"
                                />
                                {[
                                    {
                                        date: 'January 1, 2025',
                                        title: 'Lorem Ipsum Dolor',
                                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula magna ut ante cursus.',
                                        icon: (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        )
                                    },
                                    {
                                        date: 'February 10, 2025',
                                        title: 'Sit Amet Consectetur',
                                        description: 'Phasellus vitae sapien vel velit dapibus suscipit. Pellentesque habitant morbi tristique senectus.',
                                        icon: (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        )
                                    },
                                    {
                                        date: 'March 20, 2025',
                                        title: 'Adipisicing Elit',
                                        description: 'Mauris lacinia, nulla in fermentum blandit, urna leo laoreet nulla, eget sodales ligula erat ac elit.',
                                        icon: (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        )
                                    },
                                    {
                                        date: 'April 5, 2025',
                                        title: 'Dolore Magna Aliqua',
                                        description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
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
                                            className={`mb-8 md:mb-16 flex w-full flex-col ${
                                                isLeft 
                                                    ? 'md:pr-4 md:items-end md:self-start pl-12 md:pl-0' 
                                                    : 'md:pl-4 md:items-start md:self-end pl-12 md:pl-0'
                                            } md:w-1/2 items-start`}
                                        >
                                            <div className="relative max-w-md w-full rounded-xl border border-red-100 bg-white p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                                {/* Animated Circle - Desktop */}
                                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform md:block hidden">
                                                    <div className="relative">
                                                        <div className="absolute -inset-4 rounded-full bg-red-500/20 animate-pulse"></div>
                                                        <div className="relative">
                                                            <div className="bg-red-500 h-10 w-10 rounded-full border-4 border-white shadow-lg flex items-center justify-center animate-bounce">
                                                                <div className="text-white">
                                                                    {item.icon}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Animated Circle - Mobile */}
                                                <div className="absolute -left-[2.4rem] top-2 md:hidden">
                                                    <div className="relative">
                                                        <div className="absolute -inset-1 rounded-full bg-red-500/20 animate-pulse"></div>
                                                        <div className="relative">
                                                            <div className="bg-red-500 h-7 w-7 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                                                                <div className="text-white scale-75">
                                                                    {item.icon}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="mb-2 text-sm font-medium text-red-500">{item.date}</p>
                                                <h4 className="text-red-600 mb-2 text-lg sm:text-xl font-semibold">{item.title}</h4>
                                                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{item.description}</p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section id="faq" className="relative overflow-hidden py-16 md:py-24">
                        <div className="absolute inset-0 bg-gradient-to-b from-red-100/30 via-white to-red-50/40"></div>
                        <div className="relative z-10 max-w-[1350px] mx-auto px-4 md:px-8 lg:px-12">
                            <div className="mx-auto max-w-3xl">
                                <div className="text-center mb-8 md:mb-12">
                                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4" data-aos="fade-up">
                                    Frequently <span className="text-red-600">Asked Questions</span>
                                </h2>
                                    <div className="w-20 sm:w-24 h-1 bg-red-600 mx-auto rounded-full" data-aos="fade-up" data-aos-delay="50"></div>
                                </div>
                                <div className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-gray-50 shadow-sm" data-aos="fade-up" data-aos-delay="100">
                                    {faqs.map((faq, index) => (
                                        <Disclosure key={index}>
                                            {({ open }: { open: boolean }) => (
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

                    {/* Contact Person Section */}
                    <section id="contact" className="relative overflow-hidden py-16 md:py-24">
                        <div className="absolute inset-0 bg-gradient-to-b from-red-50/40 via-red-100/30 to-white"></div>
                        <div className="relative z-10 max-w-[1350px] mx-auto px-4 md:px-8 lg:px-12">
                            <div className="text-center mb-8 md:mb-12">
                                <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-aos="fade-up">
                                    <span className="text-red-600">CONTACT</span>{" "}
                                    <span className="text-red-400">PERSON</span>
                                </h2>
                                <div className="w-20 sm:w-24 h-1 bg-red-600 mx-auto rounded-full" data-aos="fade-up" data-aos-delay="50"></div>
                                <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mt-4" data-aos="fade-up" data-aos-delay="100">
                                    Jika Anda memiliki pertanyaan lebih lanjut, jangan ragu untuk menghubungi narahubung yang tertera di bawah ini.
                                </p>
                                </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                                {[
                                    {
                                        name: "Damar",
                                        wa: "089666401388",
                                        line: "komang.damar",
                                        animation: "fade-up",
                                        delay: 0
                                    },
                                    {
                                        name: "Mita",
                                        wa: "087861081640",
                                        line: "pramitawindari",
                                        animation: "fade-up",
                                        delay: 100
                                    },
                                    {
                                        name: "Yoga",
                                        wa: "082145175076",
                                        line: "dewaanoc135",
                                        animation: "fade-up",
                                        delay: 200
                                    }
                                ].map((contact, index) => (
                                    <div 
                                        key={index} 
                                        className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-red-100"
                                        data-aos={contact.animation}
                                        data-aos-delay={contact.delay}
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
                    <Footer />
                </div>
            </div>
        </>
    );
}

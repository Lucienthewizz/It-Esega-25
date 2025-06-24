'use client';

import { Footer } from '@/components/footer';
import TimelineSection from '@/components/home/timeline';
import { Navbar } from '@/components/navbar';
import { Event } from '@/types/event';
import { UserType } from '@/types/user';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { Head, Link, usePage } from '@inertiajs/react';
import * as AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { Fragment, useEffect, useState } from 'react';
import { route } from 'ziggy-js';

export default function Home() {
    const { user, flash, event = { data: [] }, showSecondTeamRegistration } = usePage<{ 
        user: { data: UserType }, 
        flash: { success?: string; error?: string; info?: string }; 
        event: { data: Event[] },
        showSecondTeamRegistration?: boolean
    }>().props;
    const [isOpen, setIsOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showDoubleSlotNotification, setShowDoubleSlotNotification] = useState(false);

    // Debugging data timeline
    console.log('Timeline data dari API:', event);

    // const auth = user;

    console.log('Dari Home', user);

    // console.log(auth?.roles?.[0]?.name)

    useEffect(() => {
        // Jika ada flash success message, tampilkan animasi
        if (flash?.success) {
            setShowSuccess(true);
            // Otomatis hilangkan animasi setelah 5 detik
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [flash?.success]);
    
    // Cek apakah user perlu mendaftar tim kedua (double slot)
    useEffect(() => {
        if (showSecondTeamRegistration) {
            setShowDoubleSlotNotification(true);
            // Notifikasi akan tetap ada sampai user mengklik tombol close
        }
    }, [showSecondTeamRegistration]);

    const navItems = [
        { title: 'Home', href: route('home') },
        { title: 'About', href: route('about') },
        { title: 'FAQ', href: '#faq' },
        { title: 'Contact', href: '#contact' },
        { title: 'Bracket', href: route('bracket') },
        { title: 'Register', href: route('register') },
    ];

    useEffect(() => {
        // Inisialisasi AOS hanya sekali saat komponen di-mount
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out-cubic',
            offset: 100,
            delay: 0,
            mirror: false,
            anchorPlacement: 'top-bottom',
            disable: 'mobile' // Opsional: menonaktifkan pada perangkat mobile jika perlu
        });
    }, []); // Empty dependency array ensures this runs only once on mount

    const faqs = [
        {
            question: 'Apa itu IT-ESEGA?',
            answer: 'IT-ESEGA adalah ajang kompetisi teknologi bergengsi yang jadi tempat berkumpulnya para peserta terbaik dari berbagai daerah di seluruh Indonesia.',
        },
        {
            question: 'Bagaimana saya bisa mendaftar?',
            answer: 'Kamu bisa mendaftar untuk turnamen ini dengan mengklik tombol "Daftar Sekarang" di halaman utama kami.',
        },
        {
            question: 'Game apa saja yang dimainkan dalam turnamen ini?',
            answer: 'Turnamen ini menghadirkan game-game populer seperti Mobile Legends dan Free Fire.',
        },
        {
            question: 'Berapa total prize pool IT-ESEGA?',
            answer: 'Total prize pool IT-ESEGA adalah sebesar IDR 12.000.000.',
        },
        {
            question: 'Berapa biaya registrasi setiap game?',
            answer: 'Biaya registrasi untuk setiap game adalah IDR 100.000.',
        },
        {
            question: 'Apakah bisa mendaftar lebih dari satu game?',
            answer: 'Ya, kamu bisa mendaftar lebih dari satu game selama memenuhi syarat dan membayar biaya masing-masing.',
        },
        {
            question: 'Siapa saja yang boleh ikut serta?',
            answer: 'Turnamen ini terbuka untuk umum dan dapat diikuti oleh siapa saja dari seluruh Indonesia, tidak terbatas hanya mahasiswa.',
        },
    ];

    return (
        <>
            <Head title="IT-ESEGA 2025 Official Website" />
            
            {/* Notifikasi Double Slot */}
            <Transition
                show={showDoubleSlotNotification}
                as={Fragment}
                enter="transform transition duration-500"
                enterFrom="translate-y-full opacity-0"
                enterTo="translate-y-0 opacity-100"
                leave="transform transition duration-500"
                leaveFrom="translate-y-0 opacity-100"
                leaveTo="translate-y-full opacity-0"
            >
                <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-xl shadow-lg">
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <span className="font-medium block">Pendaftaran Double Slot</span>
                            <span className="text-sm">Anda telah mendaftar tim pertama dengan Double Slot. Silakan mendaftar untuk tim kedua Anda sekarang!</span>
                        </div>
                        <Link
                            href={route('register')}
                            className="ml-2 bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium hover:bg-blue-50 transition-colors"
                        >
                            Daftar Tim Kedua
                        </Link>
                        <button
                            onClick={() => setShowDoubleSlotNotification(false)}
                            className="ml-2 text-white hover:text-blue-100 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </Transition>
            
            {/* Notifikasi Sukses dengan Animasi */}
            <Transition
                show={showSuccess}
                as={Fragment}
                enter="transform transition duration-500"
                enterFrom="translate-y-full opacity-0"
                enterTo="translate-y-0 opacity-100"
                leave="transform transition duration-500"
                leaveFrom="translate-y-0 opacity-100"
                leaveTo="translate-y-full opacity-0"
            >
                <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 text-white shadow-lg">
                    <div className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-medium">{flash?.success}</span>
                        <button onClick={() => setShowSuccess(false)} className="ml-4 text-white transition-colors hover:text-green-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </Transition>

            <div className="from-primary to-secondary font-poppins relative min-h-screen overflow-hidden bg-white text-black">
                {/* Background Overlay */}
                <div
                    className="from-primary to-secondary absolute inset-0 z-0 bg-gradient-to-br opacity-8"
                    style={{
                        backgroundImage: `url('/Images/bg-image.png')`,
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
                                <img src="/Images/LogoEsega25.png" alt="IT-ESEGA-25 Logo" className="h-18 w-auto object-contain" />
                            </div>
                        }
                        items={navItems}
                    />

                    {/* Hero Section */}
                    <div className="mx-auto max-w-[1350px] px-4 pt-35 pb-16 md:px-8 md:pt-45 md:pb-40 lg:px-12">
                        <div className="relative z-10 grid w-full grid-cols-1 items-center gap-8 md:grid-cols-[1.5fr_1fr]">
                            <div className="text-center md:text-left" data-aos="fade-up">
                                <h1 className="mb-4 text-4xl leading-tight font-black text-[#333] sm:text-7xl">
                                    IT-ESEGA <span className="inline-block -skew-x-12 transform text-red-600">2025</span>
                                </h1>
                                <p className="mx-auto mb-6 max-w-2xl text-base leading-relaxed text-[#333] sm:mb-8 sm:text-xl md:mx-0">
                                    Bergabunglah dalam perlombaan eSport bergengsi. Daftarkan timmu, taklukkan bracket, dan menangkan hadiah jutaan
                                    rupiah! Ayo Menjadi Juara dalam IT-ESEGA 2025
                                </p>
                                <div className="flex justify-center space-x-4 md:justify-start">
                                    <Link
                                        href={route('register')}
                                        className="inline-flex transform items-center rounded-lg bg-red-600 px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-lg sm:px-8 sm:py-4 sm:text-lg"
                                    >
                                        Register Now!
                                    </Link>
                                    <a
                                        href="https://www.instagram.com/reel/DJx6DmICh5B/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold
                                            bg-white text-red-600 border-2 border-red-600 rounded-lg transform transition-all duration-300
                                            hover:bg-red-50 hover:scale-105 hover:shadow-lg"
                                    >
                                        How to Register
                                    </a>
                                </div>
                            </div>
                            <div className="hidden justify-center md:flex md:justify-end" data-aos="fade-up" data-aos-delay="100">
                                <motion.img
                                    src="/Images/LogoEsega25.png"
                                    alt="IT-ESEGA Logo"
                                    className="h-[420px] w-auto object-contain"
                                    style={{
                                        maxWidth: '100%',
                                        willChange: 'transform',
                                        backfaceVisibility: 'hidden',
                                        transform: 'translateZ(0)',
                                    }}
                                    animate={{
                                        y: [0, -10, 0],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                        type: 'tween',
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Video Tutorial Modal */}
                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog as="div" className="fixed inset-0 z-[60] overflow-y-auto" onClose={() => setIsOpen(false)}>
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
                                            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                                                <Dialog.Title as="h3" className="text-xl leading-6 font-semibold text-gray-900">
                                                    How to Register
                                                </Dialog.Title>
                                                <button
                                                    onClick={() => setIsOpen(false)}
                                                    className="rounded-full p-1.5 text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-500"
                                                >
                                                    <span className="sr-only">Close</span>
                                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* Video Container */}
                                            <div className="relative bg-black">
                                                <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                                                    <iframe
                                                        className="absolute inset-0 w-full h-full"
                                                        src=""
                                                        title="How to Register IT-ESEGA 2025"
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                            </div>

                                            {/* Footer */}
                                            <div className="bg-gray-50 px-6 py-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="text-sm text-gray-600">
                                                        Watch the tutorial carefully to understand the registration process
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-red-700"
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
                        <div className="pointer-events-none absolute top-24 -left-12 h-28 w-28 opacity-5">
                            <motion.div
                                animate={{
                                    rotate: [0, -360],
                                }}
                                transition={{
                                    duration: 28,
                                    repeat: Infinity,
                                    ease: 'linear',
                                }}
                                className="h-full w-full"
                            >
                                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full fill-red-500">
                                    <path d="M85,40 h30 v45 h45 v30 h-45 v45 h-30 v-45 h-45 v-30 h45 z" />
                                </svg>
                            </motion.div>
                        </div>

                        {/* Cross Blob - Bottom Right Competition */}
                        <div className="pointer-events-none absolute right-8 bottom-16 h-20 w-20 opacity-5">
                            <motion.div
                                animate={{
                                    rotate: [360, 0],
                                }}
                                transition={{
                                    duration: 22,
                                    repeat: Infinity,
                                    ease: 'linear',
                                }}
                                className="h-full w-full"
                            >
                                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full fill-red-500">
                                    <path d="M85,40 h30 v45 h45 v30 h-45 v45 h-30 v-45 h-45 v-30 h45 z" />
                                </svg>
                            </motion.div>
                        </div>

                        {/* Content Container */}
                        <div className="relative z-10 mx-auto max-w-[1350px] px-4 md:px-8 lg:px-12">
                            <div className="mb-8 text-center md:mb-12">
                                <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl" data-aos="fade-up">
                                    Upcoming <span className="text-red-600">Tournament</span>
                                </h2>
                                <div className="mx-auto h-1 w-20 rounded-full bg-red-600 sm:w-24" data-aos="fade-up" data-aos-delay="50"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 justify-items-center">
                                {[{
                                    title: "Mobile Legends",
                                    slots: "64 SLOTS",
                                    type: "DOUBLE SLOT",
                                    scope: "NATIONAL COMPETITION",
                                    date: "JULY 12th, 18th, 19th",
                                    mode: "ONLINE",
                                    image: "/Images/ML-logo.png",
                                    bgImage: "/Images/ML-bg-high.jpeg",
                                    delay: 0,
                                    animation: "fade-up",
                                    fee: "Rp 100.000"
                                }, {
                                    title: "Free Fire",
                                    slots: "48 SLOTS",
                                    type: "SINGLE SLOT",
                                    scope: "NATIONAL COMPETITION",
                                    date: "JULY 5th",
                                    mode: "ONLINE",
                                    image: "/Images/FF-logo.png",
                                    bgImage: "/Images/FF-bg-high.jpeg",
                                    delay: 100,
                                    animation: "fade-up",
                                    fee: "Rp 100.000"
                                }].map((game, i) => (
                                    <div
                                        key={i}
                                        className="group relative w-full max-w-md overflow-hidden rounded-2xl border-2 border-red-500/50 bg-white p-3 shadow-lg transition-all duration-500 hover:border-red-500 hover:shadow-2xl"
                                        data-aos={game.animation}
                                        data-aos-delay={game.delay}
                                        style={{ height: '600px' }}
                                    >
                                        {/* Background Game Image */}
                                        <div
                                            className="absolute inset-0 m-3 rounded-xl bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                            style={{ backgroundImage: `url(${game.bgImage})` }}
                                        />

                                        {/* Static Dark Overlay for Mobile View Only */}
                                        <div className="absolute inset-0 block rounded-xl bg-black/60 md:hidden" />

                                        {/* Dark Overlay (only on desktop hover) */}
                                        <div className="absolute inset-0 hidden rounded-xl bg-gradient-to-t from-black/90 via-black/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:block" />

                                        {/* Content Container */}
                                        <div className="relative flex h-full w-full flex-col items-center justify-center">
                                            {/* Game Logo */}
                                            <div className="absolute -top-1 left-1/2 z-20 -translate-x-1/2 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
                                                <div className="flex items-center justify-center rounded-full p-8 transition-all duration-500 md:group-hover:-translate-y-[80%]">
                                                    <img
                                                        src={game.image}
                                                        alt={`${game.title} Logo`}
                                                        className="h-42 w-auto object-contain transition-all duration-500 md:group-hover:scale-140"
                                                    />
                                                </div>
                                            </div>

                                            {/* Content (shown on mobile and on hover in desktop) */}
                                            <div className="absolute right-0 bottom-0 left-0 my-5 flex translate-y-0 flex-col items-center p-8 opacity-100 transition-all duration-500 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                                                <h3 className="mb-4 text-center text-2xl font-bold text-white">
                                                    {game.title} <span className="text-red-400">Tournament</span>
                                                    <div className="mx-auto mt-2 h-0.5 w-64 rounded-full bg-red-400"></div>
                                                </h3>

                                                <div className="mb-6 space-y-2 text-center">
                                                    <p className="text-lg font-bold text-white/90">{game.slots}</p>
                                                    <p className="text-base text-white/90">{game.type}</p>
                                                    <p className="text-base text-white/90">{game.scope}</p>
                                                    <p className="text-base font-semibold text-white/90">{game.date}</p>
                                                    <p className="text-base font-bold text-white/90">{game.mode}</p>
                                                    <div className="mt-2 border-t border-red-400/30 pt-2">
                                                        <p className="text-sm text-white/90">Registration Fee</p>
                                                        <p className="text-base font-semibold text-white">{game.fee}</p>
                                                    </div>
                                                </div>

                                                <Link
                                                    href={route('register')}
                                                    className="inline-block transform rounded-lg bg-red-600 px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-red-700 hover:shadow-lg"
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
                        <div className="relative z-10 mx-auto max-w-[1350px] px-4 md:px-8 lg:px-12">
                            <div className="mb-8 text-center md:mb-12">
                                <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl" data-aos="fade-up">
                                    IT-ESEGA <span className="text-red-600">Teaser</span>
                                </h2>
                                <div
                                    className="mx-auto mb-6 h-1 w-20 rounded-full bg-red-600 sm:mb-8 sm:w-24"
                                    data-aos="fade-up"
                                    data-aos-delay="50"
                                ></div>
                                <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg" data-aos="fade-up" data-aos-delay="100">
                                    Saksikan keseruan dan kemeriahan IT-ESEGA dalam video teaser berikut ini
                                </p>
                            </div>

                            <div className="max-w-4xl mx-auto px-4 sm:px-0">
                                <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-red-500/20 hover:border-red-500/40 transition-all duration-500" data-aos="fade-up" data-aos-delay="150">
                                    {/* Instagram Reel Embed */}
                                    <div className="relative w-full pt-[125%] bg-black">
                                        <iframe
                                            className="absolute top-0 left-0 w-full h-full"
                                            src="https://www.instagram.com/reel/DIlLmrxSbpP/embed/"
                                            frameBorder="0"
                                            scrolling="no"
                                            allowTransparency={true}
                                            allowFullScreen={true}
                                        ></iframe>
                                    </div>

                                    {/* Video Info */}
                                    <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                        <div className="flex items-center justify-between text-white">
                                            <div>
                                                <h3 className="mb-2 text-xl font-bold">IT-ESEGA 2025 Official Teaser</h3>
                                                <p className="text-sm text-gray-300">Experience the Next Level of Gaming Competition</p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="inline-flex items-center rounded-full bg-red-600/80 px-3 py-1 text-sm">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="mr-1 h-4 w-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                                        />
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
                        <div className="relative z-10 mx-auto max-w-[1350px] px-4 md:px-8 lg:px-12">
                            <div className="mb-8 text-center md:mb-12">
                                <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl" data-aos="fade-up">
                                    Total <span className="text-red-600">Prizepool</span>
                                </h2>
                                <div className="mx-auto h-1 w-20 rounded-full bg-red-600 sm:w-24" data-aos="fade-up" data-aos-delay="50"></div>
                            </div>

                            <div className="mx-auto max-w-lg">
                                <div
                                    className="relative overflow-hidden rounded-2xl border-2 border-red-500/50 bg-white shadow-lg transition-all duration-500 hover:border-red-500 hover:shadow-xl"
                                    data-aos="fade-up"
                                    data-aos-delay="100"
                                >
                                    <div className="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-red-500 to-red-600"></div>
                                    <div className="px-6 py-8 sm:px-8 sm:py-10">
                                        <div className="flex flex-col items-center">
                                            <div className="mb-3 rounded-full bg-red-50 p-3">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-8 w-8 text-red-600"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="text-center">
                                                <p className="mb-1 text-sm font-medium text-gray-500">Total Hadiah</p>
                                                <h3 className="mb-3 text-4xl font-bold text-gray-900 sm:text-5xl">Rp 12.000.000</h3>
                                                <div className="flex items-center justify-center gap-2 text-gray-600">
                                                    <span className="text-2xl">🏆</span>
                                                    <p className="text-sm">Mobile Legends & Free Fire</p>
                                                </div>
                                            </div>
                                            <Link
                                                href={route('register')}
                                                className="mt-6 inline-flex transform items-center rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-red-600 hover:to-red-700"
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
                    <TimelineSection timeline={event.data || []} />

                    {/* FAQ Section */}
                    <section id="faq" className="relative overflow-hidden py-16 md:py-24">
                        <div className="absolute inset-0 bg-gradient-to-b from-red-100/30 via-white to-red-50/40"></div>
                        <div className="relative z-10 mx-auto max-w-[1350px] px-4 md:px-8 lg:px-12">
                            <div className="mx-auto max-w-3xl">
                                <div className="mb-8 text-center md:mb-12">
                                    <h2 className="mb-4 text-3xl font-extrabold text-gray-900 sm:text-4xl" data-aos="fade-up">
                                        Frequently <span className="text-red-600">Asked Questions</span>
                                    </h2>
                                    <div className="mx-auto h-1 w-20 rounded-full bg-red-600 sm:w-24" data-aos="fade-up" data-aos-delay="50"></div>
                                    <p className="mx-auto mt-6 max-w-2xl text-base text-gray-600 sm:text-lg" data-aos="fade-up" data-aos-delay="100">
                                        Temukan jawaban untuk pertanyaan umum tentang IT-ESEGA 2025 dan proses pendaftaran turnamen
                                    </p>
                                </div>

                                <div className="space-y-4" data-aos="fade-up" data-aos-delay="150">
                                    {faqs.map((faq, index) => (
                                        <Disclosure
                                            key={index}
                                            as="div"
                                            className="overflow-hidden rounded-xl border border-gray-200/70 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
                                        >
                                            {({ open }: { open: boolean }) => (
                                                <>
                                                    <Disclosure.Button className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none focus-visible:ring focus-visible:ring-red-500/50">
                                                        <span className={`text-lg font-medium ${open ? 'text-red-600' : 'text-gray-800'}`}>
                                                            {faq.question}
                                                        </span>
                                                        <div
                                                            className={`ml-4 flex-shrink-0 rounded-full p-1.5 ${open ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-500'}`}
                                                        >
                                                            <svg
                                                                className={`h-5 w-5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                            </svg>
                                                        </div>
                                                    </Disclosure.Button>

                                                    <Disclosure.Panel className="px-6 pb-5">
                                                        <div className="border-t border-gray-100 pt-3 text-base leading-relaxed text-gray-600">
                                                            {faq.answer}
                                                        </div>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                                </div>

                                <div className="mt-12 text-center" data-aos="fade-up" data-aos-delay="200">
                                    <p className="mb-4 text-gray-600">Masih punya pertanyaan lain?</p>
                                    <a
                                        href="#contact"
                                        className="inline-flex items-center rounded-lg bg-red-50 px-5 py-2.5 text-sm font-medium text-red-600 transition-colors duration-300 hover:bg-red-100 hover:text-red-700"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Hubungi Kami
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Contact Person Section */}
                    <section id="contact" className="relative overflow-hidden py-16 md:py-24">
                        <div className="absolute inset-0 bg-gradient-to-b from-red-50/40 via-red-100/30 to-white"></div>
                        <div className="relative z-10 mx-auto max-w-[1350px] px-4 md:px-8 lg:px-12">
                            <div className="mb-8 text-center md:mb-12">
                                <h2 className="mb-4 text-3xl font-bold sm:text-4xl" data-aos="fade-up">
                                    <span className="text-red-600">CONTACT</span> <span className="text-red-400">PERSON</span>
                                </h2>
                                <div className="mx-auto h-1 w-20 rounded-full bg-red-600 sm:w-24" data-aos="fade-up" data-aos-delay="50"></div>
                                <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 sm:text-lg" data-aos="fade-up" data-aos-delay="100">
                                    Jika Anda memiliki pertanyaan lebih lanjut, jangan ragu untuk menghubungi narahubung yang tertera di bawah ini.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
                                {[
                                    {
                                        name: 'Damar',
                                        wa: '089666401388',
                                        line: 'komang.damar',
                                        animation: 'fade-up',
                                        delay: 0,
                                    },
                                    {
                                        name: 'Mita',
                                        wa: '087861081640',
                                        line: 'pramitawindari',
                                        animation: 'fade-up',
                                        delay: 100,
                                    },
                                    {
                                        name: 'Yoga',
                                        wa: '082145175076',
                                        line: 'dewaanoc135',
                                        animation: 'fade-up',
                                        delay: 200,
                                    },
                                ].map((contact, index) => (
                                    <div
                                        key={index}
                                        className="rounded-xl border border-red-100 bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
                                        data-aos={contact.animation}
                                        data-aos-delay={contact.delay}
                                    >
                                        <div className="mb-4 flex items-center gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 shadow-md">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6 text-white"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                                    />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-semibold text-red-600">{contact.name}</h3>
                                        </div>
                                        <div className="space-y-3">
                                            <a
                                                href={`https://wa.me/${contact.wa}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-gray-600 transition-colors duration-300 hover:text-red-500"
                                            >
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

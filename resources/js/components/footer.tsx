import { Link, router } from '@inertiajs/react';
import React from 'react';
import { route } from 'ziggy-js';

interface FooterLink {
    title: string;
    href: string;
}

interface FooterSection {
    title: string;
    links: FooterLink[];
}

interface SocialMedia {
    name: string;
    icon: React.ReactNode;
    href: string;
}

interface FooterProps {
    customDescription?: string;
    customSections?: FooterSection[];
    customSocialMedia?: SocialMedia[];
    customLogo?: React.ReactNode;
}

// Default footer sections
const defaultFooterSections: FooterSection[] = [
    {
        title: 'Quick Links',
        links: [
            { title: 'Home', href: route('home') },
            { title: 'About', href: '#about' },
            { title: 'FAQ', href: '#faq' },
            { title: 'Contact', href: '#contact' },
            { title: 'Register', href: '#register' },
        ],
    },
    {
        title: 'Competition',
        links: [
            { title: 'Mobile Legends', href: 'registerml' },
            { title: 'Free Fire', href: 'registerff' },
        ],
    },
];

// Default social media links
const defaultSocialMedia: SocialMedia[] = [
    {
        name: 'TikTok',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
            </svg>
        ),
        href: 'https://tiktok.com',
    },
    {
        name: 'Instagram',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
        ),
        href: 'https://instagram.com',
    },
    {
        name: 'YouTube',
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3z" />
            </svg>
        ),
        href: 'https://youtube.com',
    },
];

// Default logo
const defaultLogo = (
    <img src="/images/LogoEsega25.png" alt="IT-ESEGA-25" className="h-20 w-auto object-contain transition-transform duration-300 hover:scale-105" />
);

// Default description
const defaultDescription =
    'IT-ESEGA adalah kompetisi teknologi premier yang mempertemukan pikiran-pikiran cemerlang dari universitas-universitas di seluruh negeri. Kami berkomitmen untuk menciptakan platform yang memungkinkan para gamers dan tech enthusiast untuk menunjukkan bakat mereka dalam kompetisi yang seru dan menantang.';

export function Footer({ customDescription, customSections, customSocialMedia, customLogo }: FooterProps) {
    const currentYear = new Date().getFullYear();

    // Use custom values if provided, otherwise use defaults
    const description = customDescription || defaultDescription;
    const sections = customSections || defaultFooterSections;
    const socialMedia = customSocialMedia || defaultSocialMedia;
    const logo = customLogo || defaultLogo;

    const handleNavigation = (e: React.MouseEvent<Element, MouseEvent>, href: string, title: string) => {
        // Jika link adalah FAQ atau Contact
        if (title === 'FAQ' || title === 'Contact') {
            e.preventDefault();

            // Jika bukan di halaman home, arahkan ke home dulu
            if (window.location.pathname !== '/') {
                router.visit('/', {
                    onSuccess: () => {
                        // Tunggu sebentar untuk memastikan halaman sudah ter-render
                        setTimeout(() => {
                            const element = document.getElementById(href.substring(1));
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                            }
                        }, 100);
                    },
                });
            } else {
                // Jika sudah di halaman home, langsung scroll
                const element = document.getElementById(href.substring(1));
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        } else if (title === 'Home' && window.location.pathname === '/') {
            // Jika di halaman home dan klik home, scroll ke atas
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const scrollToTop = () => {
        if (window.location.pathname === '/') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        } else {
            router.visit('/');
        }
    };

    return (
        <footer className="bg-gradient-to-b from-red-500 to-red-900 py-12 text-white">
            <div className="mx-auto max-w-[1350px] px-4 md:px-8 lg:px-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 gap-10 md:grid-cols-[2.5fr_1fr_1fr]">
                    {/* Description Section */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold">
                            IT-ESEGA {currentYear}
                        </h3>
                        <p className="text-gray-100 max-w-md leading-relaxed">
                            {description}
                        </p>
                        <div className="flex space-x-4">
                            {socialMedia.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="p-2 rounded-full hover:bg-white/10 transition-all duration-300"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Footer Sections */}
                    {sections.map((section, index) => (
                        <div key={index} className="space-y-6">
                            <h3 className="text-xl font-semibold">
                                {section.title}
                            </h3>
                            <div className="flex flex-col space-y-0.3">
                                {section.links.map((link, linkIndex) => (
                                    <Link
                                        key={linkIndex}
                                        href={link.href}
                                        onClick={(e: React.MouseEvent<Element, MouseEvent>) => handleNavigation(e, link.href, link.title)}
                                        className="group -mx-3 flex w-fit items-center rounded-lg px-3 py-2 text-gray-100 transition-all duration-300 hover:bg-white/10 hover:text-white"
                                    >
                                        <span>{link.title}</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Section with Logo, Copyright, and Scroll to Top */}
                <div className="mt-12 border-t border-white/20 pt-8">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        {/* Logo */}
                        <div className="order-1">
                            {logo && (
                                <Link
                                    href={route('home')}
                                    onClick={(e) => {
                                        if (window.location.pathname === '/') {
                                            e.preventDefault();
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }
                                    }}
                                    className="inline-block"
                                >
                                    {logo}
                                </Link>
                            )}
                        </div>

                        {/* Copyright */}
                        <p className="text-gray-100 text-center order-2">
                            &copy; {currentYear} IT-ESEGA. All rights reserved.
                        </p>

                        {/* Scroll to Top Button */}
                        <button
                            onClick={scrollToTop}
                            className="group bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all duration-300 flex items-center gap-2 order-3"
                            aria-label="Scroll to top"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-6 w-6 transform transition-transform duration-300 group-hover:-translate-y-1"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}

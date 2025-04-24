import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import React from 'react';

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
    description: string;
    sections: FooterSection[];
    socialMedia: SocialMedia[];
    logo?: React.ReactNode;
}

export function Footer({ description, sections, socialMedia, logo }: FooterProps) {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="bg-gradient-to-b from-red-500 to-red-900 py-12 text-white">
            <div className="container mx-auto px-6">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 gap-10 md:grid-cols-[2.5fr_1fr_1fr]">
                    {/* Description Section */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold hover:text-red-300 transition-colors duration-300">
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
                                    className="p-2 rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-110"
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
                            <h3 className="text-xl font-semibold hover:text-red-300 transition-colors duration-300">
                                {section.title}
                            </h3>
                            <div className="flex flex-col space-y-0.3">
                                {section.links.map((link, linkIndex) => (
                                    <Link
                                        key={linkIndex}
                                        href={link.href}
                                        className="text-gray-100 hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center rounded-lg py-2 px-3 -mx-3 group w-fit"
                                    >
                                        <span>{link.title}</span>
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            viewBox="0 0 20 20" 
                                            fill="currentColor" 
                                            className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
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
                <div className="mt-12 pt-8 border-t border-white/20">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Logo */}
                        <div className="order-2 md:order-1">
                            {logo && (
                                <Link href={route('home')} className="inline-block">
                                    {logo}
                                </Link>
                            )}
                        </div>

                        {/* Copyright */}
                        <p className="text-gray-100 hover:text-white transition-colors duration-300 text-center order-1 md:order-2">
                            &copy; {currentYear} IT-ESEGA. All rights reserved.
                        </p>

                        {/* Scroll to Top Button */}
                        <button 
                            onClick={scrollToTop}
                            className="group bg-white/10 hover:bg-white/20 p-4 rounded-full transition-all duration-300 flex items-center gap-2 hover:scale-110 order-3"
                            aria-label="Scroll to top"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 20 20" 
                                fill="currentColor" 
                                className="w-6 h-6 transform transition-transform duration-300 group-hover:-translate-y-1"
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
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { Head } from '@inertiajs/react';
import { route } from 'ziggy-js';

const RegisterFF = () => {
    const navItems = [
        { title: 'Home', href: route('home') },
        { title: 'About', href: '#about' },
        { title: 'FAQ', href: '#faq' },
        { title: 'Contact', href: '#contact' },
        { title: 'Register', href: '#register' },
    ];

    return (
        <div>
            <Head title="IT-ESEGA 2025 Official Website" />
            <Navbar
                logo={
                    <div className="flex items-center justify-center">
                        <img src="/images/LogoEsega25.png" alt="IT-ESEGA-25 Logo" className="h-18 w-auto object-contain" />
                    </div>
                }
                items={navItems}
            />

            {/* How to participate video section */}
            <div className="flex flex-col items-center justify-center bg-gray-100 py-10">
                <h2 className="mb-4 text-2xl font-bold text-[#333]">
                    How to <span className="text-red-600">Participate</span>
                </h2>
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/your-video-id"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                <p className="mt-4 text-center text-[#333]">Watch the video to learn how to participate in IT-ESEGA 2025.</p>
            </div>

            {/* Registration form */}

            <Footer />
        </div>
    );
};

export default RegisterFF;

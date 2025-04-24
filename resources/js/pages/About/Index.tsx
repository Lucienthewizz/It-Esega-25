import { Head } from "@inertiajs/react";
import { Navbar } from '@/components/navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { route } from 'ziggy-js';
import { router } from '@inertiajs/react';
import { Footer } from '@/components/footer';

export default function About() {
    console.log('About page is rendering');

    const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        router.visit('/', {
            onSuccess: () => {
                setTimeout(() => {
                    const element = document.getElementById(href.replace('#', ''));
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            },
        });
    };

    const navItems = [
        { title: 'Home', href: route('home') },
        { title: 'About', href: route('about') },
        { 
            title: 'FAQ', 
            href: '#faq',
            onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavigation(e, '#faq')
        },
        { 
            title: 'Contact', 
            href: '#contact',
            onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavigation(e, '#contact')
        },
        { title: 'Register', href: route('register') },
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
    
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: 'ease-in-out',
        });
    }, []);

    const afterEventVideos = [
        {
            year: 2024,
            title: "IT-ESEGA 2024 Highlights",
            description: "Momen-momen terbaik dari kompetisi IT-ESEGA tahun 2024",
            videoUrl: "https://www.youtube.com/embed/your-video-id-2024"
        },
        {
            year: 2023,
            title: "IT-ESEGA 2023 Recap",
            description: "Kilas balik perjalanan sukses IT-ESEGA 2023",
            videoUrl: "https://www.youtube.com/embed/your-video-id-2023"
        },
        {
            year: 2022,
            title: "Best Moments IT-ESEGA 2022",
            description: "Kumpulan momen berkesan dari IT-ESEGA 2022",
            videoUrl: "https://www.youtube.com/embed/your-video-id-2022"
        }
    ];

    return (
        <>
            <Head title="About Us" />
            <div className="bg-background from-primary to-secondary font-poppins relative min-h-screen text-black">

                <div className="relative z-10 mx-auto text-[#333]">
                    <Navbar
                        logo={
                            <div className="flex items-center justify-center">
                                <img src="/images/LogoEsega25.png" alt="IT-ESEGA-25 Logo" className="h-18 w-auto object-contain" />
                            </div>
                        }
                        items={navItems}
                    />

                    <div className="bg-gradient-to-b from-white to-red-50">
                        {/* Hero Section */}
                        <div className="container mx-auto px-6 py-32">
                            <div className="text-center" data-aos="fade-up">
                                <h2 className="mb-8 text-4xl font-bold text-[#333]">
                                    About <span className="text-red-600">IT-ESEGA</span>
                                </h2>
                                <div className="max-w-4xl mx-auto">
                                    <p className="mb-6 text-lg text-[#333] leading-relaxed">
                                        IT-ESEGA adalah kompetisi teknologi premier yang mempertemukan pikiran-pikiran cemerlang dari universitas-universitas di seluruh negeri. Kami berkomitmen untuk menciptakan platform yang memungkinkan para gamers dan tech enthusiast untuk menunjukkan bakat mereka dalam kompetisi yang seru dan menantang.
                                    </p>
                                </div>
                            </div>

                            {/* Vision, Mission, Values Cards */}
                            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3" data-aos="fade-up">
                                <div className="rounded-xl bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-red-100">
                                    <div className="mb-6 flex justify-center">
                                        <div className="rounded-full bg-red-100 p-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="mb-4 text-xl font-semibold text-red-600 text-center">Visi</h3>
                                    <p className="text-gray-600 text-center leading-relaxed">
                                        Menjadi platform utama yang mempertemukan dan mengembangkan bakat esports di kalangan mahasiswa Indonesia.
                                    </p>
                                </div>
                                <div className="rounded-xl bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-red-100">
                                    <div className="mb-6 flex justify-center">
                                        <div className="rounded-full bg-red-100 p-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="mb-4 text-xl font-semibold text-red-600 text-center">Misi</h3>
                                    <p className="text-gray-600 text-center leading-relaxed">
                                        Menyelenggarakan kompetisi berkualitas tinggi yang mendorong sportivitas dan profesionalisme dalam esports.
                                    </p>
                                </div>
                                <div className="rounded-xl bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-red-100">
                                    <div className="mb-6 flex justify-center">
                                        <div className="rounded-full bg-red-100 p-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="mb-4 text-xl font-semibold text-red-600 text-center">Nilai</h3>
                                    <p className="text-gray-600 text-center leading-relaxed">
                                        Integritas, Sportivitas, Inovasi, dan Kebersamaan dalam setiap aspek kompetisi.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Mascot Section */}
                        <div className="container mx-auto px-6 py-32">
                            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                                <div className="order-2 md:order-1" data-aos="fade-right">
                                    <h2 className="mb-6 text-4xl font-bold text-[#333]">
                                        About Our <span className="text-red-600">Mascot</span>
                                    </h2>
                                    <div className="w-24 h-1 bg-red-600 rounded-full mb-8"></div>
                                    <div className="space-y-6 text-gray-600">
                                        <div>
                                            <h3 className="text-2xl font-semibold text-red-600 mb-4">[Nama Maskot]</h3>
                                            <p className="leading-relaxed mb-6">
                                                [Nama Maskot] adalah representasi semangat kompetitif dan inovasi teknologi dari IT-ESEGA. Maskot ini dirancang untuk menjadi simbol yang menginspirasi dan memotivasi para peserta kompetisi.
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <p className="leading-relaxed mb-6">
                                                Desain maskot kami menggabungkan unsur gaming modern dengan sentuhan teknologi futuristik. Warna merah yang dominan melambangkan semangat dan energi yang membara, sementara elemen teknologi yang menyatu dalam desainnya mencerminkan inovasi dan kemajuan yang menjadi inti dari IT-ESEGA.
                                            </p>
                                        </div>

                                    </div>
                                </div>
                                <div className="order-1 md:order-2 flex justify-center" data-aos="fade-left">
                                    <div className="relative">
                                        <div className="absolute"></div>
                                        <img 
                                            src="/images/MascotEsega25.png" 
                                            alt="IT-ESEGA Mascot" 
                                            className="relative w-auto h-[600px] object-contain hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* After Event Videos Section */}
                        <section className="py-32 bg-gradient-to-b from-red-50 to-white">
                            <div className="container mx-auto px-6">
                                <h2 className="text-4xl font-bold text-center mb-16" data-aos="fade-down">
                                    After <span className="text-red-600">Event</span> Videos
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {afterEventVideos.map((video, index) => (
                                        <div 
                                            key={index}
                                            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                                            data-aos="fade-up"
                                            data-aos-delay={index * 100}
                                        >
                                            <div className="relative pb-[56.25%]">
                                                <iframe
                                                    className="absolute top-0 left-0 w-full h-full"
                                                    src={video.videoUrl}
                                                    title={video.title}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                            <div className="p-6">
                                                <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold mb-3">
                                                    {video.year}
                                                </span>
                                                <h3 className="text-xl font-semibold mb-2 text-gray-800">{video.title}</h3>
                                                <p className="text-gray-600">{video.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Footer */}
                    <Footer 
                        logo={
                            <img 
                                src="/images/LogoEsega25.png" 
                                alt="IT-ESEGA-25" 
                                className="h-20 w-auto object-contain hover:scale-105 transition-transform duration-300" 
                            />
                        }
                        description="IT-ESEGA adalah kompetisi teknologi premier yang mempertemukan pikiran-pikiran cemerlang dari universitas-universitas di seluruh negeri."
                        sections={footerSections}
                        socialMedia={socialMedia}
                    />
                </div>
            </div>
        </>
    );
}
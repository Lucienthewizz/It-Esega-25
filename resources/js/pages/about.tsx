import { Head, usePage } from "@inertiajs/react";
import { Navbar } from '@/components/navbar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { route } from 'ziggy-js';
import { router } from '@inertiajs/react';
import { Footer } from '@/components/footer';
import { motion } from 'framer-motion';
import { UserType } from '@/types/user';

interface NavItem {
    title: string;
    href: string;
    isActive?: boolean;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    className?: string;
}

export default function About() {
    const { user } = usePage<{ user: { data: UserType } }>().props;
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

    const navItems: NavItem[] = [
        { title: 'Home', href: route('home') },
        { title: 'About', href: route('about'), isActive: true },
        { 
            title: 'FAQ', 
            href: '#faq',
            onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavigation(e, '#faq')
        },
        { 
            title: 'Contact', 
            href: '#contact',
            onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavigation(e, '#contact')
        }

    ];

    if (!user) {
        navItems.push({ 
            title: 'Register', 
            href: route('register'), 
            className: 'bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-lg transition-colors duration-200' 
        });
    }

    useEffect(() => {
        // Reset scroll position when page loads
        window.scrollTo(0, 0);
        
        // Initialize AOS
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
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
            year: 2023,
            title: "IT-ESEGA 2023 Recap",
            description: "Kilas balik perjalanan sukses IT-ESEGA 2023",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        },
        {
            year: 2022,
            title: "Best Moments IT-ESEGA 2022",
            description: "Kumpulan momen berkesan dari IT-ESEGA 2022",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
        }
    ];

    return (
        <>
            <Head title="Tentang IT-ESEGA 2025 | Kompetisi Teknologi Premier" />
            <div className="home min-h-screen relative overflow-hidden">
                <div className="relative z-10 mx-auto">
                    <Navbar
                        user={user}
                        logo={
                            <div className="flex items-center justify-start">
                                <img src="/images/LogoEsega25.png" alt="IT-ESEGA-25 Logo" className="h-18 w-auto object-contain" />
                            </div>
                        }
                        items={navItems}
                    />

                    <div className="bg-gradient-to-b from-white">
                        {/* Hero Section */}
                        <div className="relative overflow-hidden">
                            {/* Background Layer */}
                            <div className="absolute inset-0 bg-white"></div>
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-red-50/40 via-white to-red-100/30"></div>
                            
                            {/* Pattern Overlay - Lebih halus */}
                            <div className="absolute inset-0 opacity-3" 
                                style={{ 
                                    backgroundImage: 'url("/images/pattern.png")', 
                                    backgroundSize: '200px',
                                    backgroundRepeat: 'repeat',
                                    backgroundBlendMode: 'overlay',
                                    filter: 'blur(1px)'
                                }}>
                            </div>

                            {/* Animated Particles - Jumlahnya dikurangi */}
                            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                                {[...Array(3)].map((_, index) => (
                                    <motion.div 
                                        key={index}
                                        className="absolute w-3 h-3 rounded-full bg-red-500 opacity-15"
                                        style={{ 
                                            top: `${Math.random() * 100}%`, 
                                            left: `${Math.random() * 100}%` 
                                        }}
                                        animate={{
                                            y: [0, -80, 0],
                                            opacity: [0.15, 0.25, 0.15],
                                        }}
                                        transition={{
                                            duration: 10 + Math.random() * 5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: Math.random() * 5
                                        }}
                                    />
                                ))}
                            </div>
                            
                            {/* Content Container */}
                            <div className="relative max-w-[1350px] mx-auto px-4 md:px-8 lg:px-12 pt-28 md:pt-36 pb-16 md:pb-20">
                                <div className="mb-8 text-center" data-aos="fade-up">
                                    <h2 className="text-4xl sm:text-5xl font-bold text-[#333] relative z-10 mb-6">
                                        About <span className="text-red-600">IT-ESEGA</span>
                                    </h2>

                                    <div className="w-20 h-1 bg-red-600 mx-auto rounded-full mb-8" data-aos="zoom-in" data-aos-delay="100"></div>
                                    
                                    <div className="max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                                        <p className="text-base sm:text-lg text-[#333] leading-relaxed">
                                            <span className="font-semibold text-red-600">IT-ESEGA</span> merupakan ajang tahunan bergengsi yang diselenggarakan oleh Himpunan Mahasiswa Teknologi Informasi, Universitas Udayana. Kompetisi ini mempertemukan para gamers dari berbagai kalangan dalam dua cabang E-Sport populer, yaitu Mobile Legends dan Free Fire. IT-ESEGA hadir sebagai representasi semangat kolaborasi, sportivitas, serta wadah untuk mengembangkan potensi, menjalin komunitas, dan mendorong lahirnya atlet E-Sport berbakat yang siap bersaing di tingkat nasional hingga internasional.
                                        </p>
                                    </div>
                                </div>

                                {/* Stats Counter - Desain yang lebih sederhana */}
                                <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 md:mb-16" data-aos="fade-up" data-aos-delay="300">
                                    {[
                                        { number: '5+', label: 'Tahun Pengalaman' },
                                        { number: '1000+', label: 'Peserta' },
                                        { number: '100+', label: 'Tim Berpartisipasi' },
                                        { number: '12jt', label: 'Total Hadiah' }
                                    ].map((stat, index) => (
                                        <div key={index} className="w-36 sm:w-44 p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                                            <div className="text-center">
                                                <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-1">{stat.number}</div>
                                                <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Vision, Mission, Values Cards - Lebih simple */}
                                <div className="mt-8 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3" data-aos="fade-up" data-aos-delay="400">
                                    <div className="rounded-xl bg-white p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                                        <div className="mb-4 flex justify-center">
                                            <div className="rounded-full bg-red-50 p-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <h3 className="mb-3 text-lg font-semibold text-red-600 text-center">Visi</h3>
                                        <p className="text-gray-600 text-center leading-relaxed text-sm">
                                            Menjadi platform utama yang mempertemukan dan mengembangkan bakat esports.
                                        </p>
                                    </div>
                                    <div className="rounded-xl bg-white p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                                        <div className="mb-4 flex justify-center">
                                            <div className="rounded-full bg-red-50 p-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <h3 className="mb-3 text-lg font-semibold text-red-600 text-center">Misi</h3>
                                        <p className="text-gray-600 text-center leading-relaxed text-sm">
                                            Menyelenggarakan kompetisi berkualitas tinggi yang mendorong sportivitas dan profesionalisme dalam esports.
                                        </p>
                                    </div>
                                    <div className="rounded-xl bg-white p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                                        <div className="mb-4 flex justify-center">
                                            <div className="rounded-full bg-red-50 p-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <h3 className="mb-3 text-lg font-semibold text-red-600 text-center">Nilai</h3>
                                        <p className="text-gray-600 text-center leading-relaxed text-sm">
                                            Integritas, Sportivitas, Inovasi, dan Kebersamaan dalam setiap aspek kompetisi.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mascot Section - Lebih simple dan clean */}
                        <div className="relative overflow-hidden pb-0">
                            {/* Background Layer */}
                            <div className="absolute inset-0 bg-gray-50"></div>
                            
                            {/* Content Container */}
                            <div className="relative max-w-[1350px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-20">
                                <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 md:grid-cols-2">
                                    <div className="order-2 md:order-1" data-aos="fade-right">
                                        <h2 className="mb-4 text-3xl font-bold text-[#333]">
                                            About Our <span className="text-red-600">Mascot</span>
                                        </h2>
                                        <div className="w-16 h-1 bg-red-600 rounded-full mb-6"></div>
                                        <div className="space-y-4 text-gray-600">
                                            <div>
                                                <h3 className="text-xl font-semibold text-red-600 mb-3">[VALDRON]</h3>
                                                <p className="leading-relaxed mb-4 text-sm sm:text-base">
                                                    VALDRON adalah simbol dari kekuatan yang tak terhentikan untuk memimpin pertempuran dan menghancurkan batasan. Maskot ini menjadi pemantik semangat, pengobar ambisi, dan penakluk segala rintangan mewakili keberanian untuk keluar dari batas yang dimiliki.
                                                </p>
                                            </div>
                                            
                                            <div>
                                                <p className="leading-relaxed text-sm sm:text-base">
                                                    Desain maskot kami menggabungkan unsur gaming modern dengan sentuhan teknologi futuristik. Warna merah yang dominan melambangkan semangat dan energi yang membara.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="order-1 md:order-2 flex justify-center" data-aos="fade-left">
                                        <motion.img 
                                            src="/images/MascotEsega25.png" 
                                            alt="IT-ESEGA Mascot" 
                                            className="w-auto h-[250px] sm:h-[450px] object-contain"
                                            animate={{
                                                y: [0, -15, 0],
                                            }}
                                            transition={{
                                                duration: 4,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Logo Section - Lebih simple dan clean */}
                        <div className="relative overflow-hidden pt-0">
                            {/* Background Layer */}
                            <div className="absolute inset-0 bg-white"></div>
                            
                            {/* Content Container */}
                            <div className="relative max-w-[1350px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-20">
                                <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 md:grid-cols-2">
                                    <div className="flex justify-center" data-aos="fade-right">
                                        <motion.img 
                                            src="/images/LogoEsega25.png" 
                                            alt="IT-ESEGA Logo" 
                                            className="w-auto h-[220px] sm:h-[400px] object-contain transform-none"
                                            animate={{
                                                y: [0, -15, 0],
                                            }}
                                            transition={{
                                                duration: 4,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                            style={{ 
                                                transform: 'translateZ(0) rotate(0deg)',
                                                rotate: '0deg',
                                                WebkitTransform: 'translateZ(0) rotate(0deg)'
                                            }}
                                            initial={{ rotate: 0 }}
                                        />
                                    </div>
                                    <div data-aos="fade-left">
                                        <h2 className="mb-4 text-3xl font-bold text-[#333]">
                                            About Our <span className="text-red-600">Logo</span>
                                        </h2>
                                        <div className="w-16 h-1 bg-red-600 rounded-full mb-6"></div>
                                        <div className="space-y-4 text-gray-600">
                                            <div>
                                                <h3 className="text-xl font-semibold text-red-600 mb-3">IT-ESEGA 2025</h3>
                                                <p className="leading-relaxed mb-4 text-sm sm:text-base">
                                                    Logo IT-ESEGA 2025 menghadirkan kombinasi warna merah, emas, dan perak yang melambangkan semangat, kejayaan, dan kekuatan. Perisai menunjukan identitas yang kokoh, sementara sayap tajam dan bintang emas menjadi lambang kebebasan serta ambisi.
                                                </p>
                                            </div>

                                            <div>
                                                <p className="leading-relaxed text-sm sm:text-base">
                                                    Setiap elemen dalam logo ini dirancang dengan tujuan untuk menginspirasi para peserta dan memberikan identitas visual yang kuat bagi event ini.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* After Event Videos Section - Lebih simple */}
                        <section className="relative overflow-hidden bg-gray-50 py-16 md:py-20">
                            <div className="max-w-[1350px] mx-auto px-4 md:px-8 lg:px-12">
                                <h2 className="text-3xl font-bold text-center mb-8 md:mb-12" data-aos="fade-up">
                                    After <span className="text-red-600">Event</span> Videos
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {afterEventVideos.map((video, index) => (
                                        <div 
                                            key={index}
                                            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                                            data-aos="fade-up"
                                            data-aos-delay={index * 100}
                                        >
                                            {/* Video Container */}
                                            <div className="relative w-full pt-[56.25%]">
                                                <iframe
                                                    className="absolute top-0 left-0 w-full h-full"
                                                    src={video.videoUrl}
                                                    title={video.title}
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                ></iframe>
                                            </div>
                                            <div className="p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="inline-flex items-center px-2 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium">
                                                        {video.year}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-semibold mb-1 text-gray-800">{video.title}</h3>
                                                <p className="text-gray-600 text-sm">{video.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Footer */}
                    <Footer />
                </div>
            </div>
        </>
    );
} 
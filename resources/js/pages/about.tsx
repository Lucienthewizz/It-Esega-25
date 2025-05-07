import { Head, usePage } from "@inertiajs/react";
import { Navbar } from '@/components/navbar';
import * as AOS from 'aos';
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

    useEffect(() => {
        // Reset scroll position ke atas 
        window.scrollTo(0, 0);
    }, []);

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

    // const afterEventVideos = [
    //     {
    //         year: 2024,
    //         title: "IT-ESEGA 2024 Highlights",
    //         description: "Momen-momen terbaik dari kompetisi IT-ESEGA tahun 2024",
    //         videoUrl: ""
    //     },
    //     {
    //         year: 2023,
    //         title: "IT-ESEGA 2023 Recap",
    //         description: "Kilas balik perjalanan sukses IT-ESEGA 2023",
    //         videoUrl: ""
    //     },
    //     {
    //         year: 2022,
    //         title: "Best Moments IT-ESEGA 2022",
    //         description: "Kumpulan momen berkesan dari IT-ESEGA 2022",
    //         videoUrl: ""
    //     }
    // ];

    return (
        <>
            <Head title="Tentang IT-ESEGA 2025 | Kompetisi Teknologi Premier" />
            <div className="home min-h-screen relative overflow-hidden">
                <div className="relative z-10 mx-auto">
                    <Navbar
                        user={user}
                        logo={
                            <div className="flex items-center justify-start">
                                <img src="/Images/LogoEsega25.png" alt="IT-ESEGA-25 Logo" className="h-18 w-auto object-contain" />
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
                            <div className="absolute inset-0 bg-gradient-to-b from-white via-red-50/40 to-red-100/30"></div>

                            {/* Cross Blob - Top Left */}
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

                            {/* Cross Blob - Bottom Right */}
                            <div className="absolute -right-8 bottom-16 w-20 h-20 opacity-5 pointer-events-none">
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
                            <div className="relative max-w-[1350px] mx-auto px-4 md:px-8 lg:px-12 pt-28 md:pt-36 pb-16 md:pb-24">
                                <div className="text-center" data-aos="fade-up">
                                    <h2 className="mb-6 sm:mb-8 text-3xl sm:text-5xl font-bold text-[#333]">
                                        About <span className="text-red-600">IT-ESEGA</span>
                                    </h2>
                                    <div className="max-w-4xl mx-auto">
                                        <p className="mb-8 text-base sm:text-lg text-[#333] leading-relaxed px-4 sm:px-0">
                                            IT-ESEGA(Information Technology Electronic Sport Based On Excellent Games) merupakan ajang tahunan bergengsi yang diselenggarakan oleh Himpunan Mahasiswa Teknologi Informasi, Universitas Udayana. Kompetisi ini mempertemukan para gamers dari berbagai kalangan dalam dua cabang E-Sport populer, yaitu Mobile Legends dan Free Fire. IT-ESEGA hadir sebagai representasi semangat kolaborasi, sportivitas, serta wadah untuk mengembangkan potensi, menjalin komunitas, dan mendorong lahirnya atlet E-Sport berbakat yang siap bersaing di tingkat nasional hingga internasional.
                                        </p>
                                    </div>
                                </div>

                                {/* Vision, Mission, Values Cards */}
                                <div className="mt-12 sm:mt-16 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3" data-aos="fade-up">
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
                                            Menjadi platform utama yang mempertemukan dan mengembangkan bakat esports.
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
                        </div>

                        {/* Mascot Section */}
                        <div className="relative overflow-hidden">
                            {/* Background Layer */}
                            <div className="absolute inset-0 bg-white"></div>
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-red-100/30 via-white to-red-50/40"></div>

                            {/* Cross Blob - Top Right Mascot */}
                            <div className="absolute right-16 top-20 w-24 h-24 opacity-5 pointer-events-none">
                                <motion.div
                                    animate={{
                                        rotate: [0, 360],
                                    }}
                                    transition={{
                                        duration: 24,
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

                            {/* Cross Blob - Bottom Left Mascot */}
                            <div className="absolute -left-8 bottom-24 w-20 h-20 opacity-5 pointer-events-none">
                                <motion.div
                                    animate={{
                                        rotate: [360, 0],
                                    }}
                                    transition={{
                                        duration: 26,
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
                            <div className="relative max-w-[1350px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24">
                                <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 md:grid-cols-2">
                                    <div className="order-2 md:order-1" data-aos="fade-right">
                                        <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl font-bold text-[#333]">
                                            About Our <span className="text-red-600">Mascot</span>
                                        </h2>
                                        <div className="w-20 sm:w-24 h-1 bg-red-600 rounded-full mb-6 sm:mb-8"></div>
                                        <div className="space-y-4 sm:space-y-6 text-gray-600">
                                            <div>
                                                <h3 className="text-2xl font-semibold text-red-600 mb-4">[VALDRON]</h3>
                                                <p className="leading-relaxed mb-6">
                                                    VALDRON adalah simbol dari kekuatan yang tak terhentikan untuk memimpin pertempuran dan menghancurkan batasan. Maskot ini menjadi pemantik semangat, pengobar ambisi, dan penakluk segala rintangan mewakili keberanian untuk keluar dari batas yang dimiliki dan membebaskan potensi terbaik daslam setiap jiwa kompetitor.
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
                                            <motion.img 
                                                src="/Images/MascotEsega25.png" 
                                                alt="IT-ESEGA Mascot" 
                                                className="relative w-auto h-[300px] sm:h-[600px] object-contain"
                                                animate={{
                                                    y: [0, -20, 0],
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
                        </div>

                        {/* Logo Section */}
                        <div className="relative overflow-hidden pt-0">
                            {/* Background Layer */}
                            <div className="absolute inset-0 bg-white"></div>
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white via-red-50/40 to-red-100/30"></div>

                            {/* Cross Blob - Top Left */}
                            <div className="absolute left-20 top-16 w-24 h-24 opacity-5 pointer-events-none">
                                <motion.div
                                    animate={{
                                        rotate: [0, 360],
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

                            {/* Cross Blob - Bottom Right */}
                            <div className="absolute right-32 bottom-12 w-20 h-20 opacity-5 pointer-events-none">
                                <motion.div
                                    animate={{
                                        rotate: [360, 0],
                                    }}
                                    transition={{
                                        duration: 18,
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
                            <div className="relative max-w-[1350px] mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24">
                                <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 md:grid-cols-2">
                                    <div className="flex justify-center" data-aos="fade-right">
                                        <div className="relative">
                                            <motion.img 
                                                src="/Images/LogoEsega25.png" 
                                                alt="IT-ESEGA Logo" 
                                                className="w-auto h-[220px] sm:h-[400px] object-contain transform-none relative z-10"
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
                                    </div>
                                    <div data-aos="fade-left">
                                        <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl font-bold text-[#333]">
                                            About Our <span className="text-red-600">Logo</span>
                                        </h2>
                                        <div className="w-20 sm:w-24 h-1 bg-red-600 rounded-full mb-6 sm:mb-8"></div>
                                        <div className="space-y-4 sm:space-y-6 text-gray-600">
                                            <div>
                                                <h3 className="text-2xl font-semibold text-red-600 mb-4">IT-ESEGA 2025</h3>
                                                <p className="leading-relaxed mb-6 text-base">
                                                    Logo IT-ESEGA 2025 menghadirkan kombinasi warna merah, emas, dan perak yang melambangkan semangat, kejayaan, dan kekuatan. Perisai menunjukan identitas yang kokoh, sementara sayap tajam dan bintang emas menjadi lambang kebebasan serta ambisi.
                                                </p>
                                            </div>

                                            <div>
                                                <p className="leading-relaxed text-base">
                                                    Setiap elemen dalam logo ini dirancang dengan tujuan untuk menginspirasi para peserta dan memberikan identitas visual yang kuat bagi event ini.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* After Event Videos Section - Dinonaktifkan */}
                        {/* 
                        <section className="relative overflow-hidden">
                            {/* Background Layer *//*}
                            <div className="absolute inset-0 bg-white"></div>
                            
                            {/* Gradient Overlay *//*}
                            <div className="absolute inset-0 bg-gradient-to-b from-red-50/40 via-red-100/30 to-white"></div>

                            {/* Cross Blob - Center Left Videos *//*}
                            <div className="absolute left-1/4 top-1/2 w-16 h-16 opacity-5 pointer-events-none">
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

                            {/* Cross Blob - Center Right Videos *//*}
                            <div className="absolute right-1/4 top-3/4 w-20 h-20 opacity-5 pointer-events-none">
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
                            
                            {/* Content Container *//*}
                            <div className="relative py-16 md:py-24">
                                <div className="max-w-[1350px] mx-auto px-4 md:px-8 lg:px-12">
                                    <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl font-bold text-[#333] text-center" data-aos="fade-down">
                                        After <span className="text-red-600">Event</span> Videos
                                    </h2>
                                    <div className="w-20 sm:w-24 h-1 bg-red-600 rounded-full mx-auto mb-10 sm:mb-14"></div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                                        {afterEventVideos.map((video, index) => (
                                            <div 
                                                key={index}
                                                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-red-100"
                                                data-aos="fade-up"
                                                data-aos-delay={index * 100}
                                            >
                                                {/* Video Container dengan Aspect Ratio 16:9 *//*}
                                                <div className="relative w-full pt-[56.25%]">
                                                    <iframe
                                                        className="absolute top-0 left-0 w-full h-full"
                                                        src={video.videoUrl}
                                                        title={video.title}
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                                <div className="p-4 sm:p-6">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs sm:text-sm font-semibold">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                            {video.year}
                                                        </span>
                                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-600">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                    <h3 className="text-xl font-semibold mb-2 text-gray-800 hover:text-red-600 transition-colors duration-300">{video.title}</h3>
                                                    <p className="text-gray-600 text-base leading-relaxed">{video.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                        */}
                    </div>

                    {/* Footer */}
                    <Footer />
                </div>
            </div>
        </>
    );
} 
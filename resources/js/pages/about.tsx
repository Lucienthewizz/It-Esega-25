import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { UserType } from '@/types/user';
import { Head, router, usePage } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { route } from 'ziggy-js';

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
            onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavigation(e, '#faq'),
        },
        {
            title: 'Contact',
            href: '#contact',
            onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavigation(e, '#contact'),
        },
        { title: 'Bracket', href: route('bracket') },
    ];

    if (!user) {
        navItems.push({
            title: 'Register',
            href: route('register'),
            className: 'bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-lg transition-colors duration-200',
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
            title: 'IT-ESEGA 2024 Highlights',
            description: 'Momen-momen terbaik dari kompetisi IT-ESEGA tahun 2024',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        },
        {
            year: 2023,
            title: 'IT-ESEGA 2023 Recap',
            description: 'Kilas balik perjalanan sukses IT-ESEGA 2023',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        },
        {
            year: 2022,
            title: 'Best Moments IT-ESEGA 2022',
            description: 'Kumpulan momen berkesan dari IT-ESEGA 2022',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        },
    ];

    return (
        <>
            <Head title="Tentang IT-ESEGA 2025 | Kompetisi Teknologi Premier" />
            <div className="home relative min-h-screen overflow-hidden">
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
                            <div className="absolute inset-0 bg-gradient-to-b from-white via-red-50/40 to-red-100/30"></div>

                            {/* Cross Blob - Top Left */}
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

                            {/* Cross Blob - Bottom Right */}
                            <div className="pointer-events-none absolute -right-8 bottom-16 h-20 w-20 opacity-5">
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
                            <div className="relative mx-auto max-w-[1350px] px-4 pt-35 pb-16 md:px-8 md:pt-45 md:pb-24 lg:px-12">
                                <div className="text-center" data-aos="fade-up">
                                    <h2 className="mb-6 text-3xl font-bold text-[#333] sm:mb-8 sm:text-4xl">
                                        About <span className="text-red-600">IT-ESEGA</span>
                                    </h2>
                                    <div className="mx-auto max-w-4xl">
                                        <p className="mb-6 px-4 text-base leading-relaxed text-[#333] sm:px-0 sm:text-lg">
                                            IT-ESEGA merupakan ajang tahunan bergengsi yang diselenggarakan oleh Himpunan Mahasiswa Teknologi
                                            Informasi, Universitas Udayana. Kompetisi ini mempertemukan para gamers dari berbagai kalangan dalam dua
                                            cabang E-Sport populer, yaitu Mobile Legends dan Free Fire. IT-ESEGA hadir sebagai representasi semangat
                                            kolaborasi, sportivitas, serta wadah untuk mengembangkan potensi, menjalin komunitas, dan mendorong
                                            lahirnya atlet E-Sport berbakat yang siap bersaing di tingkat nasional hingga internasional.
                                        </p>
                                    </div>
                                </div>

                                {/* Vision, Mission, Values Cards */}
                                <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:gap-8 md:grid-cols-3" data-aos="fade-up">
                                    <div className="rounded-xl border border-red-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
                                        <div className="mb-6 flex justify-center">
                                            <div className="rounded-full bg-red-100 p-4">
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
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <h3 className="mb-4 text-center text-xl font-semibold text-red-600">Visi</h3>
                                        <p className="text-center leading-relaxed text-gray-600">
                                            Menjadi platform utama yang mempertemukan dan mengembangkan bakat esports.
                                        </p>
                                    </div>
                                    <div className="rounded-xl border border-red-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
                                        <div className="mb-6 flex justify-center">
                                            <div className="rounded-full bg-red-100 p-4">
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
                                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <h3 className="mb-4 text-center text-xl font-semibold text-red-600">Misi</h3>
                                        <p className="text-center leading-relaxed text-gray-600">
                                            Menyelenggarakan kompetisi berkualitas tinggi yang mendorong sportivitas dan profesionalisme dalam
                                            esports.
                                        </p>
                                    </div>
                                    <div className="rounded-xl border border-red-100 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
                                        <div className="mb-6 flex justify-center">
                                            <div className="rounded-full bg-red-100 p-4">
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
                                                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                        <h3 className="mb-4 text-center text-xl font-semibold text-red-600">Nilai</h3>
                                        <p className="text-center leading-relaxed text-gray-600">
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
                            <div className="pointer-events-none absolute top-20 right-16 h-24 w-24 opacity-5">
                                <motion.div
                                    animate={{
                                        rotate: [0, 360],
                                    }}
                                    transition={{
                                        duration: 24,
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

                            {/* Cross Blob - Bottom Left Mascot */}
                            <div className="pointer-events-none absolute bottom-24 -left-8 h-20 w-20 opacity-5">
                                <motion.div
                                    animate={{
                                        rotate: [360, 0],
                                    }}
                                    transition={{
                                        duration: 26,
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
                            <div className="relative mx-auto max-w-[1350px] px-4 py-16 md:px-8 md:py-24 lg:px-12">
                                <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 md:grid-cols-2">
                                    <div className="order-2 md:order-1" data-aos="fade-right">
                                        <h2 className="mb-4 text-3xl font-bold text-[#333] sm:mb-6 sm:text-4xl">
                                            About Our <span className="text-red-600">Mascot</span>
                                        </h2>
                                        <div className="mb-6 h-1 w-20 rounded-full bg-red-600 sm:mb-8 sm:w-24"></div>
                                        <div className="space-y-4 text-gray-600 sm:space-y-6">
                                            <div>
                                                <h3 className="mb-4 text-2xl font-semibold text-red-600">[VALDRON]</h3>
                                                <p className="mb-6 leading-relaxed">
                                                    VALDRON adalah simbol dari kekuatan yang tak terhentikan untuk memimpin pertempuran dan
                                                    menghancurkan batasan. Maskot ini menjadi pemantik semangat, pengobar ambisi, dan penakluk segala
                                                    rintangan mewakili keberanian untuk keluar dari batas yang dimiliki dan membebaskan potensi
                                                    terbaik daslam setiap jiwa kompetitor.
                                                </p>
                                            </div>

                                            <div>
                                                <p className="mb-6 leading-relaxed">
                                                    Desain maskot kami menggabungkan unsur gaming modern dengan sentuhan teknologi futuristik. Warna
                                                    merah yang dominan melambangkan semangat dan energi yang membara, sementara elemen teknologi yang
                                                    menyatu dalam desainnya mencerminkan inovasi dan kemajuan yang menjadi inti dari IT-ESEGA.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="order-1 flex justify-center md:order-2" data-aos="fade-left">
                                        <div className="relative">
                                            <div className="absolute"></div>
                                            <motion.img
                                                src="/images/MascotEsega25.png"
                                                alt="IT-ESEGA Mascot"
                                                className="relative h-[300px] w-auto object-contain sm:h-[600px]"
                                                animate={{
                                                    y: [0, -20, 0],
                                                }}
                                                transition={{
                                                    duration: 4,
                                                    repeat: Infinity,
                                                    ease: 'easeInOut',
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* After Event Videos Section */}
                        <section className="relative overflow-hidden">
                            {/* Background Layer */}
                            <div className="absolute inset-0 bg-white"></div>

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-red-50/40 via-red-100/30 to-white"></div>

                            {/* Cross Blob - Center Left Videos */}
                            <div className="pointer-events-none absolute top-1/2 left-1/4 h-16 w-16 opacity-5">
                                <motion.div
                                    animate={{
                                        rotate: [0, -360],
                                    }}
                                    transition={{
                                        duration: 20,
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

                            {/* Cross Blob - Center Right Videos */}
                            <div className="pointer-events-none absolute top-3/4 right-1/4 h-20 w-20 opacity-5">
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
                            <div className="relative py-16 md:py-24">
                                <div className="mx-auto max-w-[1350px] px-4 md:px-8 lg:px-12">
                                    <h2 className="text-background mb-10 text-center text-3xl font-bold sm:mb-16 sm:text-4xl" data-aos="fade-down">
                                        After <span className="text-red-600">Event</span> Videos
                                    </h2>
                                    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
                                        {afterEventVideos.map((video, index) => (
                                            <div
                                                key={index}
                                                className="overflow-hidden rounded-xl border border-red-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                                                data-aos="fade-up"
                                                data-aos-delay={index * 100}
                                            >
                                                {/* Video Container dengan Aspect Ratio 16:9 */}
                                                <div className="relative w-full pt-[56.25%]">
                                                    <iframe
                                                        className="absolute top-0 left-0 h-full w-full"
                                                        src={video.videoUrl}
                                                        title={video.title}
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                                <div className="p-4 sm:p-6">
                                                    <div className="mb-3 flex items-center justify-between">
                                                        <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-600 sm:px-3 sm:text-sm">
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
                                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                />
                                                            </svg>
                                                            {video.year}
                                                        </span>
                                                        <span className="inline-flex items-center text-red-600">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5"
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
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                />
                                                            </svg>
                                                        </span>
                                                    </div>
                                                    <h3 className="mb-2 text-xl font-semibold text-gray-800 transition-colors duration-300 hover:text-red-600">
                                                        {video.title}
                                                    </h3>
                                                    <p className="text-sm leading-relaxed text-gray-600">{video.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
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

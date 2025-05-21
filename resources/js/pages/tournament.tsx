import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { UserType } from '@/types/user';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import * as AOS from 'aos';
import 'aos/dist/aos.css';
import TournamentBracket from '@/components/FF/TournamentBracket';

export default function Tournament() {
    const { user } = usePage<{ 
        user: { data: UserType }
    }>().props;

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
            disable: 'mobile'
        });
    }, []);

    return (
        <>
            <Head title="IT-ESEGA 2025 | Tournament Bracket" />
            
            <div className="bg-white from-primary to-secondary font-poppins relative min-h-screen text-black">
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
                    <Navbar user={user} />
                    
                    <main className="container mx-auto px-4 py-8">
                        <div className="my-8">
                            <h1 className="text-4xl font-bold text-center mb-2">Tournament Bracket</h1>
                            <p className="text-center text-gray-600 mb-6">Live update of the tournament standings</p>
                            
                            <div className="mt-8">
                                <TournamentBracket />
                            </div>
                        </div>
                    </main>
                    
                    <Footer />
                </div>
            </div>
        </>
    );
} 
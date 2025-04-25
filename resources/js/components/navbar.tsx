import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuPortal
} from '@/components/ui/dropdown-menu';
import { Menu, User } from 'lucide-react';
import { UserType } from '@/types/user';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';

interface NavItem {
    title: string;
    href: string;
}

interface NavbarProps {
    logo?: React.ReactNode;
    items?: NavItem[];
    user?: { data: UserType };
}

export function Navbar({ logo, items = [], user }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    // Memisahkan item Register dari items lainnya
    const navigationItems = items.filter(item => item.title !== 'Register');
    const registerItem = items.find(item => item.title === 'Register');
    const currentPath = window.location.pathname;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavigation = (e: React.MouseEvent, href: string, title: string) => {
        // Jika link adalah FAQ atau Contact
        if (title === 'FAQ' || title === 'Contact') {
            e.preventDefault();
            
            // Jika bukan di halaman home, arahkan ke home dulu
            if (window.location.pathname !== '/') {
                router.visit('/', {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => {
                        // Tunggu sebentar untuk memastikan halaman sudah ter-render
                        setTimeout(() => {
                            const element = document.getElementById(href.substring(1));
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                            }
                        }, 50);
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
        } else {
            // Untuk navigasi normal ke halaman lain
            e.preventDefault();
            router.visit(href, {
                preserveScroll: false,
                preserveState: false,
                onSuccess: () => {
                    // Reset scroll position setelah navigasi
                    window.scrollTo(0, 0);
                }
            });
        }
    };

    // const getRedirectPath = (user: UserType) => {
    //     if (user === undefined) return '#';

    //     console.log('User dari Navbar :', user?.updated_at)

    //     const roles = user?.roles?.map((role) => role.name) || [];
    //     console.log('User Role : ', roles)

    //     if (roles.includes('admin') || roles.includes('super_admin')) {
    //         return route('admin.dashboard');
    //     }

    //     return route('dashboard');
    // };

    console.log('Navbar props:', { logo, items, user });
    console.log('Navbar user:', user);
    console.log('Navbar Data Role:', user?.data.name);

    return (
        <nav 
            className={`fixed top-0 left-0 right-0 z-[999] transform-gpu transition-all duration-300 ${
                isScrolled 
                    ? 'bg-white/95 backdrop-blur-md shadow-sm translate-y-0' 
                    : 'bg-transparent translate-y-0'
            }`}
            style={{
                willChange: 'transform, opacity, background-color',
                backfaceVisibility: 'hidden'
            }}
        >
            <div className="max-w-[1350px] mx-auto px-4 md:px-8 lg:px-12 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo Section */}
                    <div className="w-[180px] flex-shrink-0 transition-transform duration-300 hover:scale-105">
                        <Link 
                            href={route('home')} 
                            onClick={(e) => {
                                if (window.location.pathname === '/') {
                                    e.preventDefault();
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                            }}
                            className="block"
                        >
                            {logo}
                        </Link>
                    </div>

                    {/* Desktop Navigation - Centered */}
                    <div className="hidden flex-grow justify-center md:flex">
                        {/* Center Navigation Links */}
                        <div className="flex items-center justify-center space-x-12 w-full max-w-2xl">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.title === 'FAQ' ? '#faq' : item.title === 'Contact' ? '#contact' : item.href}
                                    onClick={(e) => handleNavigation(e, item.title === 'FAQ' ? '#faq' : item.title === 'Contact' ? '#contact' : item.href, item.title)}
                                    className={`relative px-2 py-1 text-[15px] font-medium transition-all duration-300 
                                        ${isScrolled ? 'text-gray-700' : 'text-gray-800'} 
                                        hover:text-red-600 group overflow-hidden`}
                                >
                                    {item.title}
                                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-red-600
                                        transform origin-left transition-all duration-300 ease-out
                                        translate-x-[-100%] group-hover:translate-x-0
                                        ${currentPath === item.href ? 'translate-x-0' : ''}`}>
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Action Button or User Icon */}
                    <div className="w-[180px] hidden md:flex justify-end flex-shrink-0">
                        {user ? (
                            <Link
                                href={
                                    user?.data.roles?.some(role => role.name === 'admin' || role.name === 'super_admin') 
                                        ? route('admin.dashboard')
                                        : route('dashboard')
                                }
                                className="flex items-center justify-center w-10 h-10 rounded-full 
                                    bg-gradient-to-r from-red-500 to-red-600 text-white
                                    shadow-md hover:shadow-lg transform hover:-translate-y-0.5
                                    transition-all duration-300 hover:from-red-600 hover:to-red-700"
                            >
                                <User className="w-5 h-5" />
                            </Link>
                        ) : (
                            registerItem && (
                                <Link
                                    href={registerItem.href}
                                    className="inline-flex items-center px-6 py-2.5 font-semibold rounded-lg
                                        bg-gradient-to-r from-red-500 to-red-600 text-white
                                        shadow-md hover:shadow-lg transform hover:-translate-y-0.5
                                        transition-all duration-300 hover:from-red-600 hover:to-red-700"
                                >
                                    {registerItem.title}
                                </Link>
                            )
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className={`rounded-lg hover:bg-gray-100/50 transition-all duration-300 ${
                                        isScrolled ? 'text-gray-700' : 'text-gray-800'
                                    }`}
                                >
                                    <Menu className="w-6 h-6" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuContent 
                                    align="end" 
                                    className="w-72 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-100/50 mt-2 p-3 mr-2"
                                    sideOffset={5}
                                >
                                    <div className="space-y-1">
                                        {navigationItems.map((item) => (
                                            <Link
                                                key={item.title}
                                                href={item.title === 'FAQ' ? '#faq' : item.title === 'Contact' ? '#contact' : item.href}
                                                onClick={(e) => handleNavigation(e, item.title === 'FAQ' ? '#faq' : item.title === 'Contact' ? '#contact' : item.href, item.title)}
                                                className={`block px-4 py-3 text-[15px] rounded-lg transition-all duration-300 
                                                    ${currentPath === item.href 
                                                        ? 'bg-red-50 text-red-600 font-semibold' 
                                                        : 'text-gray-700 hover:bg-red-50/50 hover:text-red-600'
                                                    }`}
                                            >
                                                {item.title}
                                            </Link>
                                        ))}
                                        {user ? (
                                            <Link
                                                href={
                                                    user?.data.roles?.some(role => role.name === 'admin' || role.name === 'super_admin')
                                                        ? route('admin.dashboard')
                                                        : route('dashboard')
                                                }
                                                className="flex items-center gap-2 px-4 py-3 mt-2 text-[15px] font-semibold text-white rounded-lg
                                                    bg-gradient-to-r from-red-500 to-red-600
                                                    hover:from-red-600 hover:to-red-700 transition-all duration-300"
                                            >
                                                <User className="w-5 h-5" /> Profile
                                            </Link>
                                        ) : (
                                            registerItem && (
                                                <Link
                                                    href={registerItem.href}
                                                    className="block px-4 py-3 mt-2 text-[15px] font-semibold text-center text-white rounded-lg
                                                        bg-gradient-to-r from-red-500 to-red-600
                                                        hover:from-red-600 hover:to-red-700 transition-all duration-300"
                                                >
                                                    {registerItem.title}
                                                </Link>
                                            )
                                        )}
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenuPortal>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    );
}
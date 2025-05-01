import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuPortal
} from '@/components/ui/dropdown-menu';
import { Menu, User, LogOut, LayoutDashboard } from 'lucide-react';
import { UserType } from '@/types/user';
import { useEffect, useState, useRef } from 'react';
import { route } from 'ziggy-js';
import { createPortal } from 'react-dom';

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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownTriggerRef = useRef<HTMLButtonElement>(null);
    const dropdownContentRef = useRef<HTMLDivElement>(null);
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

    useEffect(() => {
        if (isDropdownOpen && dropdownTriggerRef.current && dropdownContentRef.current) {
            const triggerRect = dropdownTriggerRef.current.getBoundingClientRect();
            
            // Calculate position
            const top = triggerRect.bottom + 5;
            const right = window.innerWidth - triggerRect.right;
            
            dropdownContentRef.current.style.position = 'fixed';
            dropdownContentRef.current.style.top = `${top}px`;
            dropdownContentRef.current.style.right = `${right}px`;
        }
    }, [isDropdownOpen]);

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
        <nav className="border-opacity-30 sticky top-0 z-50 border border-gray-200 bg-white shadow-sm">
            <div className="container mx-auto px-4 py-2">
                {' '}
                {/* Mengurangi padding untuk membuat navbar lebih ramping */}
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">{logo}</div>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-6 md:flex">
                        {' '}
                        {/* Menurunkan gap antar elemen */}
                        <div className="flex gap-5">
                            {' '}
                            {/* Mengurangi jarak antar item navigasi */}
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className={`hover:text-secondary after:bg-secondary relative font-medium text-gray-700 transition-all after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100 ${
                                        currentPath === item.href ? 'text-secondary after:scale-x-100' : ''
                                    }`}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                        {/* Action or User */}
                        {user ? (
                            <div>
                                <button 
                                    ref={dropdownTriggerRef}
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center justify-center w-10 h-10 rounded-full 
                                        bg-gradient-to-r from-[#ba0000] to-[#ba0000]/90 text-white
                                        shadow-md hover:shadow-lg transform hover:-translate-y-0.5
                                        transition-all duration-300 hover:from-[#ba0000]/90 hover:to-[#ba0000]
                                        focus:outline-none focus:ring-2 focus:ring-[#ba0000]/20 focus:ring-offset-2"
                                >
                                    <User className="h-5 w-5" />
                                </button>

                                {isDropdownOpen && createPortal(
                                    <div 
                                        ref={dropdownContentRef}
                                        className="w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-100/50 p-2 z-[1000]"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="px-2 py-1.5">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {user.data.name}
                                            </p>
                                            <p className="text-xs text-gray-500 truncate">
                                                {user.data.roles?.map(role => role.name).join(', ')}
                                            </p>
                                        </div>
                                        <div className="my-2 h-px bg-gray-100/50"></div>
                                        <Link
                                            href={
                                                user.data.roles?.some(role => role.name === 'admin' || role.name === 'super_admin')
                                                    ? route('admin.dashboard')
                                                    : route('dashboard')
                                            }
                                            className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-700 rounded-lg
                                                hover:bg-[#ba0000]/5 hover:text-[#ba0000] cursor-pointer
                                                transition-colors duration-200"
                                        >
                                            <LayoutDashboard className="h-4 w-4" />
                                            Dashboard
                                        </Link>
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-700 rounded-lg
                                                hover:bg-[#ba0000]/5 hover:text-[#ba0000] cursor-pointer
                                                transition-colors duration-200 w-full"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Logout
                                        </Link>
                                    </div>,
                                    document.body
                                )}
                            </div>
                        ) : (
                            actionItem && (
                                <Link
                                    href={registerItem.href}
                                    className="inline-flex items-center px-6 py-2.5 font-semibold rounded-lg
                                        bg-gradient-to-r from-[#ba0000] to-[#ba0000]/90 text-white
                                        shadow-md hover:shadow-lg transform hover:-translate-y-0.5
                                        transition-all duration-300 hover:from-[#ba0000]/90 hover:to-[#ba0000]"
                                >
                                    {actionItem.title}
                                </Link>
                            )
                        )}
                    </div>

                    {/* Add click outside handler */}
                    {isDropdownOpen && createPortal(
                        <div 
                            className="fixed inset-0 z-[999]"
                            onClick={() => setIsDropdownOpen(false)}
                        />,
                        document.body
                    )}

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-gray-700">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuContent 
                                    align="end" 
                                    className="w-72 bg-white rounded-xl shadow-lg border border-gray-100/50 p-3"
                                    sideOffset={5}
                                    alignOffset={5}
                                    avoidCollisions={true}
                                    collisionPadding={10}
                                    style={{
                                        position: 'fixed',
                                        right: '1rem',
                                        top: '4rem',
                                        transform: 'none',
                                        willChange: 'transform'
                                    }}
                                >
                                    <div className="space-y-1">
                                        {navigationItems.map((item) => (
                                            <Link
                                                key={item.title}
                                                href={item.title === 'FAQ' ? '#faq' : item.title === 'Contact' ? '#contact' : item.href}
                                                onClick={(e) => handleNavigation(e, item.title === 'FAQ' ? '#faq' : item.title === 'Contact' ? '#contact' : item.href, item.title)}
                                                className={`block px-4 py-3 text-[15px] rounded-lg transition-all duration-300 
                                                    ${currentPath === item.href 
                                                        ? 'bg-[#ba0000]/5 text-[#ba0000] font-semibold' 
                                                        : 'text-gray-700 hover:bg-[#ba0000]/5 hover:text-[#ba0000]'
                                                    }`}
                                            >
                                                {item.title}
                                            </Link>
                                        ))}
                                        {user ? (
                                            <>
                                                <div className="px-4 py-3 border-t border-gray-100/50">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {user.data.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500 truncate">
                                                        {user.data.roles?.map(role => role.name).join(', ')}
                                                    </p>
                                                </div>
                                                <Link
                                                    href={
                                                        user.data.roles?.some(role => role.name === 'admin' || role.name === 'super_admin')
                                                            ? route('admin.dashboard')
                                                            : route('dashboard')
                                                    }
                                                    className="flex items-center gap-2 px-4 py-3 text-[15px] rounded-lg
                                                        bg-[#ba0000]/5 text-[#ba0000] font-semibold
                                                        hover:bg-[#ba0000]/10 transition-all duration-300"
                                                >
                                                    <LayoutDashboard className="w-5 h-5" /> Dashboard
                                                </Link>
                                                <Link
                                                    href={route('logout')}
                                                    method="post"
                                                    as="button"
                                                    className="flex items-center gap-2 px-4 py-3 text-[15px] rounded-lg
                                                        text-gray-700 hover:bg-[#ba0000]/5 hover:text-[#ba0000]
                                                        transition-all duration-300"
                                                >
                                                    <LogOut className="w-5 h-5" /> Logout
                                                </Link>
                                            </>
                                        ) : (
                                            registerItem && (
                                                <Link
                                                    href={registerItem.href}
                                                    className="block px-4 py-3 mt-2 text-[15px] font-semibold text-center text-white rounded-lg
                                                        bg-gradient-to-r from-[#ba0000] to-[#ba0000]/90
                                                        hover:from-[#ba0000]/90 hover:to-[#ba0000] transition-all duration-300"
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

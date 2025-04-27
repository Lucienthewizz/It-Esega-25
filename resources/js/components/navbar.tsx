import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { UserType } from '@/types/user';
import { Link } from '@inertiajs/react';
import { Menu, User } from 'lucide-react';

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
    const navigationItems = items.slice(0, -1);
    const actionItem = items.slice(-1)[0];
    const currentPath = window.location.pathname;

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
                            <Link
                                href={
                                    user?.data.roles?.some((role) => role.name === 'admin' || role.name === 'super_admin')
                                        ? route('admin.dashboard')
                                        : route('dashboard')
                                }
                                className="border-secondary text-secondary hover:bg-secondary flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:text-white"
                            >
                                <User className="h-5 w-5" />
                            </Link>
                        ) : (
                            actionItem && (
                                <Link
                                    href={actionItem.href}
                                    className="text-secondary border-secondary hover:bg-secondary rounded-lg border px-4 py-1.5 font-semibold transition-colors hover:text-white"
                                >
                                    {actionItem.title}
                                </Link>
                            )
                        )}
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-gray-700">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-52 rounded-lg bg-white shadow-md">
                                <div className="py-2">
                                    {navigationItems.map((item) => (
                                        <Link
                                            key={item.title}
                                            href={item.href}
                                            className={`block rounded-md px-4 py-2 text-sm transition-colors ${
                                                currentPath === item.href ? 'bg-secondary/10 text-secondary' : 'hover:bg-secondary/10 text-gray-700'
                                            }`}
                                        >
                                            {item.title}
                                        </Link>
                                    ))}

                                    {user ? (
                                        <Link
                                            href="/profile"
                                            className="bg-secondary hover:bg-secondary/90 mt-3 flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm text-white transition-colors"
                                        >
                                            <User className="h-4 w-4" /> Profile
                                        </Link>
                                    ) : (
                                        actionItem && (
                                            <Link
                                                href={actionItem.href}
                                                className="bg-secondary hover:bg-secondary/90 mt-3 block rounded-md px-4 py-2 text-center text-sm text-white transition-colors"
                                            >
                                                {actionItem.title}
                                            </Link>
                                        )
                                    )}
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    );
}

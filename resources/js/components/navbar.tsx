import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Menu, User } from 'lucide-react';
import { UserType } from '@/types/user';

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
        <nav className="bg-transparent">
            <div className="container px-6 py-1.5 mx-auto">
                <div className="flex justify-between items-center">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        {logo}
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden gap-x-8 items-center md:flex">
                        {/* Center Navigation Links */}
                        <div className="flex space-x-6">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className={`text-black transition-all duration-300 hover:text-secondary relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-secondary after:left-0 after:-bottom-1 after:rounded-full ${currentPath === item.href ? 'after:scale-x-100' : 'after:scale-x-0'
                                        } after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100`}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>

                        {/* Action Button or User Icon */}
                        {user ? (
                            <Link
                                href={
                                    user?.data.roles?.some(role => role.name === 'admin' || 'super_admin') ? route('admin.dashboard')
                                        : route('dashboard')
                                }
                                className="flex items-center justify-center w-10 h-10 rounded-full border border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-white"
                            >
                                <User className="w-5 h-5" />
                            </Link>
                        ) : (
                            actionItem && (
                                <Link
                                    href={actionItem.href}
                                    className="px-6 py-2 font-semibold rounded-lg border transition-colors duration-300 border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-white"
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
                                <Button variant="ghost" size="icon" className="text-black">
                                    <Menu className="w-5 h-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 bg-white">
                                <div className="px-2 py-2">
                                    {navigationItems.map((item) => (
                                        <Link
                                            key={item.title}
                                            href={item.href}
                                            className={`block px-4 py-2 text-sm rounded-md transition-colors ${currentPath === item.href ? 'bg-secondary/10 text-secondary' : 'text-black hover:bg-secondary/10'
                                                }`}
                                        >
                                            {item.title}
                                        </Link>
                                    ))}
                                    {user ? (
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 mt-2 text-sm text-center text-white rounded-md bg-secondary hover:bg-secondary/90"
                                        >
                                            <User className="w-5 h-5 inline-block" /> Profile
                                        </Link>
                                    ) : (
                                        actionItem && (
                                            <Link
                                                href={actionItem.href}
                                                className="block px-4 py-2 mt-2 text-sm text-center text-white rounded-md bg-secondary hover:bg-secondary/90"
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
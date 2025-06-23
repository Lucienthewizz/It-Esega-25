import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UserType } from '@/types/user';
import { Head, usePage } from '@inertiajs/react';
import { Info, RefreshCw, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as AOS from 'aos';
import 'aos/dist/aos.css';

const navItems = [
    { title: 'Home', href: route('home') },
    { title: 'About', href: route('about') },
    { title: 'FAQ', href: '#faq' },
    { title: 'Contact', href: '#contact' },
    { title: 'Bracket', href: route('bracket') },
    { title: 'Register', href: route('register') },
];

const Bracket: React.FC = () => {
    const { user } = usePage<{ user: { data: UserType } }>().props;
    const [activeTab, setActiveTab] = useState<string>('ml');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [lastUpdated, setLastUpdated] = useState<string>(new Date().toLocaleString());
    
    // Inisialisasi AOS dan reset scroll position
    useEffect(() => {
        // Reset scroll position ke atas 
        window.scrollTo(0, 0);
        
        // Inisialisasi AOS
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
    
    // Simulasi loading state
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        
        return () => clearTimeout(timer);
    }, []);
    
    const handleRefresh = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setLastUpdated(new Date().toLocaleString());
        }, 1500);
    };

    return (
        <>
            <div className="home min-h-screen relative overflow-hidden">
                <Head title="Tournament Brackets | IT-ESEGA 2025" />
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
                </div>

                <div className="relative max-w-[1350px] mx-auto px-4 md:px-8 lg:px-12 pt-28 md:pt-36 pb-16 md:pb-24">
                    <div className="flex flex-col items-center justify-center gap-6 text-[#333]">
                    {/* Tournament Header */}
                    <div className="w-full max-w-5xl" data-aos="fade-up">
                        <div className="mb-6 text-center">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#ba0000] to-[#ba0000]/90 bg-clip-text text-transparent mb-2 sm:text-4xl md:text-5xl">
                                Tournament Brackets
                            </h1>
                            <p className="text-[#333] max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                                Follow the latest tournament progress and match results for Mobile Legends and Free Fire competitions.
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4" data-aos="fade-up" data-aos-delay="100">
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="px-3 py-1 border-red-200 bg-red-50">
                                    <Trophy className="h-3.5 w-3.5 text-red-500" />
                                    IT-ESEGA 2025
                                </Badge>
                                <Badge variant="outline" className="px-3 py-1 border-red-100">
                                    Last updated: {lastUpdated}
                                </Badge>
                            </div>
                            
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            onClick={handleRefresh}
                                            disabled={isLoading}
                                            className="gap-1"
                                        >
                                            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                                            Refresh
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Refresh bracket data</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        
                        <Alert className="mb-6 border-red-100 bg-red-50/50" data-aos="fade-up" data-aos-delay="200">
                            <Info className="h-4 w-4 text-red-500" />
                            <AlertTitle>Important Tournament Information</AlertTitle>
                            <AlertDescription>
                                Brackets are updated after each match. Check back regularly for the latest results and upcoming matches.
                            </AlertDescription>
                        </Alert>
                    </div>
                    
                    {/* Bracket Tabs */}
                    <Card className="w-full max-w-5xl rounded-xl border border-red-100 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300" data-aos="fade-up" data-aos-delay="300">
                        <CardHeader className="p-0">
                            <div className="bg-gradient-to-r from-[#ba0000] to-[#ba0000]/90 h-1 w-full"></div>
                            <div className="p-4 sm:p-6">
                                <Tabs defaultValue="ml" value={activeTab} onValueChange={setActiveTab} className="w-full">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                                        <CardTitle className="text-2xl font-bold text-red-600">
                                            Tournament Brackets
                                        </CardTitle>
                                        <TabsList className="grid w-full sm:w-auto grid-cols-2 gap-1 bg-red-50/70">
                                            <TabsTrigger value="ml" className="flex items-center gap-2 data-[state=active]:bg-red-600 data-[state=active]:text-white">
                                                <img src="/Images/ML-Logo.png" alt="ML Logo" className="h-5 w-5 object-contain" />
                                                Mobile Legends
                                            </TabsTrigger>
                                            <TabsTrigger value="ff" className="flex items-center gap-2 data-[state=active]:bg-red-600 data-[state=active]:text-white">
                                                <img src="/Images/FF-logo.png" alt="FF Logo" className="h-5 w-5 object-contain" />
                                                Free Fire
                                            </TabsTrigger>
                                        </TabsList>
                                    </div>
                                    
                                    <Separator className="mb-4" />
                                    
                                    <TabsContent value="ml" className="mt-0">
                                        <div className="w-full overflow-hidden rounded-lg border border-red-100 bg-white">
                                            {isLoading ? (
                                                <div className="p-4 flex flex-col gap-4">
                                                    <Skeleton className="h-12 w-full bg-red-100/50" />
                                                    <Skeleton className="h-[600px] w-full bg-red-50/50" />
                                                </div>
                                            ) : (
                                                <iframe
                                                    src="https://challonge.com/DMLITESEGA2025/module"
                                                    width="100%"
                                                    height="700"
                                                    frameBorder="0"
                                                    scrolling="auto"
                                                    allowTransparency={true}
                                                    className="w-full rounded-lg sm:h-[500px] md:h-[600px] lg:h-[700px]"
                                                    title="Mobile Legends Tournament Bracket"
                                                />
                                            )}
                                        </div>
                                    </TabsContent>
                                    
                                    <TabsContent value="ff" className="mt-0">
                                        <div className="w-full overflow-hidden rounded-lg border border-red-100 bg-white">
                                            {isLoading ? (
                                                <div className="p-4 flex flex-col gap-4">
                                                    <Skeleton className="h-12 w-full bg-red-100/50" />
                                                    <Skeleton className="h-[600px] w-full bg-red-50/50" />
                                                </div>
                                            ) : (
                                                <iframe
                                                    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRwd9OsfNVvi12-NpQT-laeEpkIoy49yno6wg_3giLSEnyyvSE0cqiN_Wd6OSv4AHs134ponqnDeo8h/pubhtml?widget=true&headers=false"
                                                    width="100%"
                                                    height="700"
                                                    frameBorder="0"
                                                    scrolling="auto"
                                                    className="w-full rounded-lg sm:h-[500px] md:h-[600px] lg:h-[700px]"
                                                    title="Free Fire Tournament Bracket"
                                                />
                                            )}
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </CardHeader>
                    </Card>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Bracket;


import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import React from 'react';

const Bracket: React.FC = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
            <Head title="IT-ESEGA 2025 Official Website" />
            <Card className="w-full max-w-5xl rounded-lg border border-gray-300 shadow-lg">
                <CardHeader>
                    <CardTitle className="rounded-t-lg bg-white p-4 text-center text-xl font-semibold text-gray-800 sm:p-6 sm:text-2xl md:text-3xl lg:text-4xl">
                        Bracket ML <span className="text-red-500">IT-ESEGA</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full overflow-hidden rounded-lg border border-gray-200">
                        <iframe
                            src="https://challonge.com/DMLITESEGA2025/module"
                            width="100%"
                            height="700"
                            frameBorder="0"
                            scrolling="auto"
                            allowTransparency={true}
                            className="w-full rounded-lg sm:h-[500px] md:h-[600px] lg:h-[700px]"
                            title="Challonge Tournament Bracket"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Bracket;

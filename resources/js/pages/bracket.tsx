import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import React from 'react';

const Bracket: React.FC = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <Head title="IT-ESEGA 2025 Official Website" />
            <Card className="w-full max-w-5xl rounded-2xl border border-gray-200 shadow-2xl">
                <CardHeader>
                    <CardTitle className="rounded-t-xl bg-white p-4 text-center text-2xl font-bold text-black shadow-md sm:text-3xl md:text-4xl">
                        Bracket ML <span className="text-red-500">IT-ESEGA</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full overflow-auto rounded-xl border">
                        <iframe
                            src="https://challonge.com/DMLITESEGA2025/module"
                            width="100%"
                            height="500"
                            frameBorder="0"
                            scrolling="auto"
                            allowTransparency={true}
                            className="w-full rounded-xl sm:h-[400px] md:h-[600px]"
                            title="Challonge Tournament Bracket"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Bracket;

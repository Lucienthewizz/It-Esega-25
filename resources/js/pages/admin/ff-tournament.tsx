import AuthenticatedAdminLayout from "@/layouts/admin/layout";
import { UserType } from "@/types/user";
import { usePage, Head } from "@inertiajs/react";
import TournamentBracketAdmin from "@/components/admin/FF/TournamentBracketAdmin";

export default function FFTournament() {
    const { user } = usePage<{
        user: { data: UserType }
    }>().props;

    const auth = user.data;

    return (
        <AuthenticatedAdminLayout 
            title="FF Tournament Bracket" 
            headerTitle="Free Fire Tournament Bracket Management" 
            user={auth}
        >
            <Head title="IT-ESEGA 2025 | FF Tournament Bracket Management" />
            <div className="container mx-auto py-6">
                <TournamentBracketAdmin />
            </div>
        </AuthenticatedAdminLayout>
    );
} 
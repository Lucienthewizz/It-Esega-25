export type UserType = {
    id: number;
    name: string;
    email: string;
    address?: string | null;
    phone?: string | null;
    KTM?: string | null;
    email_verified_at: string | null;
    password: string;
    status: 'active' | 'inactive' | 'blocked';
    created_at: string;
    updated_at: string;
    role?: string;
    remember_token: string | null;
};

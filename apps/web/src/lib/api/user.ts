import { createClient } from '@/lib/supabase/client';

export interface Shop {
    id: string;
    name: string;
    address?: string;
    phone?: string;
    store_type?: string;
    settings?: Record<string, any>;
}

export interface User {
    id: string;
    supabase_uid: string;
    full_name?: string;
    phone?: string;
    role: 'SUPERADMIN' | 'OWNER' | 'STAFF';
    shop?: Shop;
    shop_id?: string;
}

export async function getCurrentUser(): Promise<User | null> {
    try {
        const supabase = createClient();

        if (!supabase) {
            return null;
        }

        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            return null;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
            headers: {
                'Authorization': `Bearer ${session.access_token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
}

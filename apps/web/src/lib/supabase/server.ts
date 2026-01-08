import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
    const cookieStore = await cookies();

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        // Return a mock client if Supabase is not configured
        return null;
    }

    return createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
            getAll() {
                return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                    );
                } catch {
                    // The `setAll` method was called from a Server Component.
                    // This can be ignored if you have middleware refreshing
                    // user sessions.
                }
            },
        },
    });
}

export async function getSession() {
    const supabase = await createClient();

    if (!supabase) {
        // Check for mock session cookie in development mode
        const cookieStore = await cookies();
        const mockSessionCookie = cookieStore.get('mock_session');

        if (mockSessionCookie) {
            try {
                return JSON.parse(mockSessionCookie.value);
            } catch {
                // Invalid mock session
            }
        }

        // Return mock session for development without Supabase
        return {
            user: {
                id: 'dev-user-id',
                phone: '+8801712345678',
                user_metadata: {
                    full_name: 'মোঃ রহমান',
                },
            },
            access_token: 'dev-token',
        };
    }

    const { data: { session } } = await supabase.auth.getSession();
    return session;
}

export async function getUser() {
    const session = await getSession();
    return session?.user || null;
}

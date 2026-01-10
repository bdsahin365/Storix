import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
    const cookieStore = await cookies();

    // Check if Supabase is configured
    // Try server-side env vars first (for API routes), then client-side
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    console.log('🔍 [Supabase Server] Creating client');
    console.log('   URL:', supabaseUrl ? '✓ SET' : '✗ NOT SET');
    console.log('   Anon Key:', supabaseAnonKey ? '✓ SET' : '✗ NOT SET');

    if (!supabaseUrl || !supabaseAnonKey) {
        console.log('❌ [Supabase Server] Missing config, returning null');
        // Return a mock client if Supabase is not configured
        return null;
    }

    console.log('✅ [Supabase Server] Creating real Supabase client');
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

    console.log('🔍 [getSession] Supabase client:', supabase ? 'EXISTS' : 'NULL');

    if (!supabase) {
        console.log('❌ [getSession] No Supabase client, using mock session');
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

    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
        console.log('❌ [getSession] Error getting session:', error.message);
    }

    if (session) {
        console.log('✅ [getSession] Session found');
        console.log('   User ID:', session.user?.id);
        console.log('   Phone:', session.user?.phone);
        console.log('   Token:', session.access_token ? session.access_token.substring(0, 50) + '...' : 'MISSING');
    } else {
        console.log('⚠️  [getSession] No session found in Supabase');
    }

    return session;
}

export async function getUser() {
    const session = await getSession();
    return session?.user || null;
}

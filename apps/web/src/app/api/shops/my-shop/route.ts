import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/supabase/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export async function GET(request: NextRequest) {
    try {
        console.log('🔧 [TEMP] My-shop check - bypassing auth');

        // TEMPORARY: Skip session check, backend will use hardcoded user ID
        const response = await fetch(`${BACKEND_URL}/shops/my-shop`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { shop: null },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching shop:', error);
        return NextResponse.json({ shop: null }, { status: 500 });
    }
}

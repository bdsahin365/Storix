import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/supabase/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export async function GET(request: NextRequest) {
    try {
        const session = await getSession();

        if (!session?.access_token) {
            return NextResponse.json({ shop: null }, { status: 401 });
        }

        const response = await fetch(`${BACKEND_URL}/shops/my-shop`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${session.access_token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json({ shop: null }, { status: response.status });
        }

        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Get shop error:', error);
        return NextResponse.json({ shop: null }, { status: 500 });
    }
}

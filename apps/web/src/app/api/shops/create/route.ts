import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/supabase/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        console.log('🔧 [TEMP] Shop creation - bypassing auth check');

        // TEMPORARY: Skip session check, backend will handle user ID
        console.log(`📤 [API Route] Forwarding to backend: ${BACKEND_URL}/shops/create`);
        const response = await fetch(`${BACKEND_URL}/shops/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        console.log(`📥 [API Route] Backend response: ${response.status}`, data);

        if (!response.ok) {
            console.log(`❌ [API Route] Backend returned error: ${response.status}`);
            return NextResponse.json(
                { message: data.message || 'দোকান তৈরি করতে ব্যর্থ হয়েছে' },
                { status: response.status }
            );
        }

        console.log('✅ [API Route] Shop created successfully');
        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        console.error('Shop creation error:', error);
        return NextResponse.json(
            { message: 'একটি ত্রুটি ঘটেছে। আবার চেষ্টা করুন।' },
            { status: 500 }
        );
    }
}

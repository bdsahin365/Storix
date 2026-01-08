import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/supabase/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const session = await getSession();

        if (!session?.access_token) {
            return NextResponse.json(
                { message: 'অনুমোদন প্রয়োজন। অনুগ্রহ করে লগইন করুন।' },
                { status: 401 }
            );
        }

        const response = await fetch(`${BACKEND_URL}/shops/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`,
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { message: data.message || 'দোকান তৈরি করতে ব্যর্থ হয়েছে' },
                { status: response.status }
            );
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        console.error('Shop creation error:', error);
        return NextResponse.json(
            { message: 'একটি ত্রুটি ঘটেছে। আবার চেষ্টা করুন।' },
            { status: 500 }
        );
    }
}

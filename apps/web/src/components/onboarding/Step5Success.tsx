'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Users, Receipt, LayoutDashboard } from 'lucide-react';

type Props = {
    shopName: string;
};

export default function Step5Success({ shopName }: Props) {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/dashboard');
        }, 5000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <Card className="shadow-xl border-0 bg-white">
            <CardHeader className="text-center space-y-4 pt-12">
                <div className="flex justify-center">
                    <div className="rounded-full bg-green-100 p-4">
                        <CheckCircle2 className="h-16 w-16 text-green-600" />
                    </div>
                </div>
                <div className="space-y-2">
                    <CardTitle className="text-3xl font-bold text-slate-900">
                        আপনার দোকান সফলভাবে তৈরি হয়েছে
                    </CardTitle>
                    <CardDescription className="text-base text-slate-600">
                        <strong>{shopName}</strong> এখন Storix-এ যুক্ত হয়েছে
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 pb-12 px-8">
                <p className="text-center text-sm text-slate-500 mb-6">
                    এখন আপনি কি করতে চান?
                </p>

                <div className="space-y-3">
                    <Button
                        variant="outline"
                        className="w-full justify-start h-14 text-base"
                        onClick={() => router.push('/customers/new')}
                    >
                        <Users className="mr-3 h-5 w-5" />
                        প্রথম গ্রাহক যোগ করুন
                    </Button>

                    <Button
                        variant="outline"
                        className="w-full justify-start h-14 text-base"
                        onClick={() => router.push('/transactions/new')}
                    >
                        <Receipt className="mr-3 h-5 w-5" />
                        প্রথম বাকি যোগ করুন
                    </Button>

                    <Button
                        className="w-full justify-start h-14 text-base"
                        onClick={() => router.push('/dashboard')}
                    >
                        <LayoutDashboard className="mr-3 h-5 w-5" />
                        ড্যাশবোর্ড দেখুন
                    </Button>
                </div>

                <p className="text-center text-xs text-slate-400 mt-6">
                    ৫ সেকেন্ডে স্বয়ংক্রিয়ভাবে ড্যাশবোর্ডে যাবে...
                </p>
            </CardContent>
        </Card>
    );
}

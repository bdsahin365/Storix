'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function Step1Welcome({ onNext }: { onNext: () => void }) {
    return (
        <Card className="shadow-xl border-0 bg-white">
            <CardHeader className="text-center space-y-6 pt-12">
                <div className="flex justify-center">
                    <Image
                        src="/icon.svg"
                        alt="Storix"
                        width={80}
                        height={80}
                        className="drop-shadow-lg"
                    />
                </div>
                <div className="space-y-2">
                    <CardTitle className="text-3xl font-bold text-slate-900">
                        আপনার দোকান সেটআপ করুন
                    </CardTitle>
                    <CardDescription className="text-base text-slate-600">
                        Storix ব্যবহার করতে প্রথমে আপনার দোকানের তথ্য দিন
                        <br />
                        <span className="text-sm">(সময় লাগবে ২–৩ মিনিট)</span>
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent className="pb-12 px-8">
                <Button
                    onClick={onNext}
                    size="lg"
                    className="w-full text-lg font-semibold h-14"
                >
                    দোকান তৈরি করুন
                </Button>
            </CardContent>
        </Card>
    );
}

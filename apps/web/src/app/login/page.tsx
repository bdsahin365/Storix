'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
    const router = useRouter();
    const [phone, setPhone] = useState('+880');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const supabase = createClient();

            if (!supabase) {
                // Mock mode - just move to OTP step
                console.log('Mock mode: Sending OTP to:', phone);
                await new Promise(resolve => setTimeout(resolve, 500));
                setStep('otp');
                setLoading(false);
                return;
            }

            const { error: otpError } = await supabase.auth.signInWithOtp({
                phone: phone,
            });

            if (otpError) throw otpError;

            setStep('otp');
        } catch (err: any) {
            setError(err.message || 'OTP পাঠাতে ব্যর্থ হয়েছে');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const supabase = createClient();

            if (!supabase) {
                // Mock mode - create a fake session and redirect
                console.log('Mock mode: Verifying OTP:', otp);
                await new Promise(resolve => setTimeout(resolve, 500));

                // Store mock session in localStorage for development
                const mockToken = 'dev-token-' + Date.now();
                localStorage.setItem('mock_session', JSON.stringify({
                    user: {
                        id: 'dev-user-id',
                        phone: phone,
                        user_metadata: {
                            full_name: 'মোঃ রহমান',
                            phone: phone,
                        }
                    },
                    access_token: mockToken,
                }));

                // Check if user has a shop
                const hasShop = await checkUserShop(mockToken);
                router.push(hasShop ? '/dashboard' : '/onboarding');
                router.refresh();
                return;
            }

            const { error: verifyError } = await supabase.auth.verifyOtp({
                phone: phone,
                token: otp,
                type: 'sms',
            });

            if (verifyError) throw verifyError;

            // Get the session to check for existing shop
            const { data: { session } } = await supabase.auth.getSession();

            if (session?.access_token) {
                const hasShop = await checkUserShop(session.access_token);
                router.push(hasShop ? '/dashboard' : '/onboarding');
            } else {
                router.push('/onboarding');
            }

            router.refresh();
        } catch (err: any) {
            setError(err.message || 'OTP যাচাই করতে ব্যর্থ হয়েছে');
        } finally {
            setLoading(false);
        }
    };

    const checkUserShop = async (accessToken: string): Promise<boolean> => {
        try {
            const response = await fetch('/api/shops/my-shop', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) return false;

            const data = await response.json();
            return !!data.shop;
        } catch (error) {
            console.error('Error checking shop:', error);
            return false;
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-xl border-0">
                <CardHeader className="text-center space-y-4 pt-8">
                    <div className="flex justify-center">
                        <Image
                            src="/icon.svg"
                            alt="Storix"
                            width={64}
                            height={64}
                            className="drop-shadow-lg"
                        />
                    </div>
                    <div className="space-y-2">
                        <CardTitle className="text-2xl font-bold text-slate-900">
                            Storix Pro-তে স্বাগতম
                        </CardTitle>
                        <CardDescription className="text-base text-slate-600">
                            {step === 'phone'
                                ? 'আপনার মোবাইল নম্বর দিয়ে লগইন করুন'
                                : 'আপনার মোবাইলে পাঠানো OTP দিন'
                            }
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="pb-8">
                    {step === 'phone' ? (
                        <form onSubmit={handleSendOTP} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-base">
                                    মোবাইল নম্বর
                                </Label>
                                <div className="flex gap-2">
                                    <div className="flex items-center justify-center bg-slate-100 border border-input rounded-md px-3 h-12 text-base font-medium text-slate-700">
                                        +880
                                    </div>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="1712345678"
                                        value={phone.replace('+880', '')}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, ''); // Only digits
                                            if (value.length <= 10) {
                                                setPhone('+880' + value);
                                            }
                                        }}
                                        required
                                        maxLength={10}
                                        className="h-12 text-base flex-1"
                                    />
                                </div>
                                <p className="text-xs text-slate-500">
                                    {createClient()
                                        ? 'আপনার মোবাইলে একটি OTP পাঠানো হবে'
                                        : '🔧 Dev Mode: যেকোনো 10 সংখ্যা দিন'
                                    }
                                </p>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={loading || phone.replace('+880', '').length !== 10}
                                className="w-full h-12 text-base"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        পাঠানো হচ্ছে...
                                    </>
                                ) : (
                                    'OTP পাঠান'
                                )}
                            </Button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOTP} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="otp" className="text-base">
                                    OTP কোড
                                </Label>
                                <Input
                                    id="otp"
                                    type="text"
                                    placeholder="123456"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                    maxLength={6}
                                    className="h-12 text-base text-center text-2xl tracking-widest"
                                />
                                <p className="text-xs text-slate-500">
                                    {createClient()
                                        ? `${phone} নম্বরে পাঠানো 6 সংখ্যার কোড দিন`
                                        : '🔧 Dev Mode: যেকোনো 6 সংখ্যা দিন'
                                    }
                                </p>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                    <p className="text-sm text-red-600">{error}</p>
                                </div>
                            )}

                            <div className="space-y-3">
                                <Button
                                    type="submit"
                                    disabled={loading || otp.length !== 6}
                                    className="w-full h-12 text-base"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            যাচাই করা হচ্ছে...
                                        </>
                                    ) : (
                                        'লগইন করুন'
                                    )}
                                </Button>

                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() => {
                                        setStep('phone');
                                        setOtp('');
                                        setError('');
                                    }}
                                    className="w-full"
                                >
                                    নম্বর পরিবর্তন করুন
                                </Button>
                            </div>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

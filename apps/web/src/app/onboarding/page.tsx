'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import StoreCreationFlow from '@/components/onboarding/StoreCreationFlow';
import { Loader2, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function OnboardingPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [hasShop, setHasShop] = useState(false);
    const [shopDetails, setShopDetails] = useState<any>(null);
    const [userData, setUserData] = useState({ phone: '', name: '' });

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const supabase = createClient();
                let token = '';
                let user: any = null;

                if (!supabase) {
                    // Dev mode logic
                    const mockSessionStr = localStorage.getItem('mock_session');
                    if (!mockSessionStr) {
                        router.push('/login');
                        return;
                    }
                    const mockSession = JSON.parse(mockSessionStr);
                    token = mockSession.access_token;
                    user = mockSession.user;
                } else {
                    // Supabase logic
                    const { data: { session } } = await supabase.auth.getSession();
                    if (!session) {
                        router.push('/login');
                        return;
                    }
                    token = session.access_token;
                    user = session.user;
                }

                // Set User Data for the form
                const userMetadata = user.user_metadata || {};
                setUserData({
                    phone: user.phone || userMetadata.phone || '',
                    name: userMetadata.full_name || userMetadata.name || ''
                });

                // Check for existing shop
                const response = await fetch('/api/shops/my-shop', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.shop) {
                        setHasShop(true);
                        setShopDetails(data.shop);
                        // If backend returns user info (owner), use that
                        if (data.user && data.user.full_name) {
                            setUserData(prev => ({ ...prev, name: data.user.full_name }));
                        }
                    }
                }

            } catch (error) {
                console.error('Error checking status:', error);
            } finally {
                setLoading(false);
            }
        };

        checkStatus();
    }, [router]);

    const handleGoToDashboard = () => {
        router.push('/dashboard');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (hasShop && shopDetails) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
                <Card className="w-full max-w-md shadow-lg border-0">
                    <CardContent className="pt-8 pb-8 text-center space-y-6">
                        <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <Store className="h-10 w-10 text-primary" />
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-bold text-slate-900">স্বাগতম!</h2>
                                <p className="text-slate-600">আপনি সফলভাবে লগইন করেছেন</p>
                            </div>

                            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-left">
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">দোকানের নাম</p>
                                        <p className="text-lg font-semibold text-slate-900">{shopDetails.name}</p>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t border-slate-100 mt-2">
                                        <div>
                                            <p className="text-xs text-slate-500 font-medium">মালিক</p>
                                            <p className="text-sm font-medium text-slate-700">{userData.name || 'N/A'}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-slate-500 font-medium">ধরন</p>
                                            <p className="text-sm font-medium text-slate-700">{shopDetails.store_type || 'সাধারন দোকান'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button
                            className="w-full h-12 text-lg font-medium shadow-sm hover:shadow-md transition-all"
                            onClick={handleGoToDashboard}
                        >
                            ড্যাশবোর্ডে যান
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-white">
            {/* Premium Background Layer */}
            <div className="absolute inset-0 z-0">
                {/* 1. Base Gradient Orbs for "Premium Color" */}
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-100/40 blur-[120px]" />

                {/* 2. Aesthetic Grid Pattern with Mask */}
                <div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
                    style={{
                        maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, #000 70%, transparent 100%)'
                    }}
                />
            </div>

            {/* Content Content - z-10 ensures interactivity */}
            <div className="relative z-10 w-full max-w-2xl mx-auto">
                <StoreCreationFlow
                    userPhone={userData.phone}
                    userName={userData.name}
                />
            </div>
        </div>
    );
}

'use client';

import { useEffect, useState } from 'react';
import { getStoreSettings, StoreSettingsResponse } from '@/lib/api/settings';
import { StoreProfileForm } from '@/components/settings/store-profile-form';
import { OwnerInfoForm } from '@/components/settings/owner-info-form';
import { PreferencesForm } from '@/components/settings/preferences-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { ShieldAlert, Users, Store, UserCircle, Settings as SettingsIcon } from 'lucide-react';

export default function SettingsPage() {
    const [settings, setSettings] = useState<StoreSettingsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchSettings = async () => {
        try {
            const data = await getStoreSettings();
            setSettings(data);
            setError('');
        } catch (err: any) {
            setError(err.message || 'সেটিংস লোড করতে সমস্যা হয়েছে');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto p-4 space-y-6 max-w-5xl">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-[400px]" />
            </div>
        );
    }

    if (error) {
        return <div className="p-8 text-center text-destructive">{error}</div>;
    }

    if (!settings) return null;

    return (
        <div className="container mx-auto p-4 space-y-6 max-w-5xl pb-20">
            <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">স্টোর সেটিংস</h1>
                <p className="text-muted-foreground">আপনার দোকানের তথ্য এবং পছন্দসমূহ পরিচালনা করুন</p>
            </div>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-5 h-auto">
                    <TabsTrigger value="profile" className="flex items-center gap-2 py-3">
                        <Store className="h-4 w-4" />
                        <span className="hidden sm:inline">স্টোর প্রোফাইল</span>
                        <span className="sm:hidden">প্রোফাইল</span>
                    </TabsTrigger>
                    <TabsTrigger value="owner" className="flex items-center gap-2 py-3">
                        <UserCircle className="h-4 w-4" />
                        <span className="hidden sm:inline">মালিকের তথ্য</span>
                        <span className="sm:hidden">মালিক</span>
                    </TabsTrigger>
                    <TabsTrigger value="preferences" className="flex items-center gap-2 py-3">
                        <SettingsIcon className="h-4 w-4" />
                        <span className="hidden sm:inline">পছন্দসমূহ</span>
                        <span className="sm:hidden">পছন্দ</span>
                    </TabsTrigger>
                    <TabsTrigger value="staff" className="flex items-center gap-2 py-3">
                        <Users className="h-4 w-4" />
                        <span className="hidden sm:inline">স্টাফ</span>
                        <span className="sm:hidden">স্টাফ</span>
                    </TabsTrigger>
                    <TabsTrigger value="danger" className="flex items-center gap-2 py-3 text-destructive data-[state=active]:text-destructive">
                        <ShieldAlert className="h-4 w-4" />
                        <span className="hidden sm:inline">ডেঞ্জার জোন</span>
                        <span className="sm:hidden">ডেঞ্জার</span>
                    </TabsTrigger>
                </TabsList>

                <div className="mt-6">
                    <TabsContent value="profile" className="mt-0">
                        <StoreProfileForm profile={settings.profile} refresh={fetchSettings} />
                    </TabsContent>

                    <TabsContent value="owner" className="mt-0">
                        <OwnerInfoForm owner={settings.owner} />
                    </TabsContent>

                    <TabsContent value="preferences" className="mt-0">
                        <PreferencesForm preferences={settings.preferences} refresh={fetchSettings} />
                    </TabsContent>

                    <TabsContent value="staff" className="mt-0">
                        <Card className="opacity-75">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    স্টাফ ম্যানেজমেন্ট
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground italic">শীঘ্রই আসছে...</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="danger" className="mt-0">
                        <Card className="border-destructive/20 bg-destructive/5">
                            <CardHeader>
                                <CardTitle className="text-destructive flex items-center gap-2">
                                    <ShieldAlert className="h-5 w-5" />
                                    ডেঞ্জার জোন
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm">স্টোর আর্কাইভ করার সুবিধা শীঘ্রই আসছে। স্টোর ডিলিট করা সম্ভব নয়।</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}

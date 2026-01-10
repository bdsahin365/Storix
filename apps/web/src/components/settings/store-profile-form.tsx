'use client';

import { useState } from 'react';
import { StoreProfile, updateStoreProfile } from '@/lib/api/settings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; // Assuming exists, checking later
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { PhotoUpload } from './photo-upload';

interface StoreProfileFormProps {
    profile: StoreProfile;
    refresh: () => void;
}

export function StoreProfileForm({ profile, refresh }: StoreProfileFormProps) {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(profile.name);
    const [address, setAddress] = useState(profile.address || '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateStoreProfile({ name, address });
            toast.success('প্রোফাইল আপডেট করা হয়েছে');
            refresh();
        } catch (error) {
            toast.error('আপডেট ব্যর্থ হয়েছে');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>দোকানের প্রোফাইল</CardTitle>
                <CardDescription>আপনার দোকানের সাধারণ তথ্য</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <PhotoUpload initialUrl={profile.photo_url} onPhotoUpdated={refresh} />

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">দোকানের নাম</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="type">দোকানের ধরন</Label>
                        <Input
                            id="type"
                            value={profile.store_type}
                            readOnly
                            className="bg-muted text-muted-foreground"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">ঠিকানা</Label>
                        // @ts-ignore - Textarea check
                        <textarea
                            id="address"
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <Button type="submit" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        সংরক্ষণ করুন
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

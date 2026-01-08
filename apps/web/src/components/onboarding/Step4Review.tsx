'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StoreFormData } from './StoreCreationFlow';
import { Loader2 } from 'lucide-react';

type Props = {
    formData: StoreFormData;
    onEdit: () => void;
    onSuccess: () => void;
};

export default function Step4Review({ formData, onEdit, onSuccess }: Props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCreate = async () => {
        setLoading(true);
        setError('');

        try {
            console.log('Creating shop with data:', formData);

            const response = await fetch('/api/shops/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log('API Response:', { status: response.status, data });

            if (!response.ok) {
                throw new Error(data.message || 'দোকান তৈরি করতে ব্যর্থ হয়েছে');
            }

            onSuccess();
        } catch (err: any) {
            console.error('Shop creation error:', err);
            setError(err.message || 'একটি ত্রুটি ঘটেছে। আবার চেষ্টা করুন।');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="shadow-xl border-0 bg-white">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-900">
                    তথ্য যাচাই করুন
                </CardTitle>
                <CardDescription className="text-slate-600">
                    নিশ্চিত করুন যে সব তথ্য সঠিক আছে
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4 bg-slate-50 rounded-lg p-6">
                    <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm font-medium text-slate-600">দোকানের নাম:</span>
                        <span className="col-span-2 text-sm text-slate-900">{formData.name}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm font-medium text-slate-600">ধরন:</span>
                        <span className="col-span-2 text-sm text-slate-900">{formData.store_type}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm font-medium text-slate-600">মালিক:</span>
                        <span className="col-span-2 text-sm text-slate-900">{formData.owner_name}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <span className="text-sm font-medium text-slate-600">মোবাইল:</span>
                        <span className="col-span-2 text-sm text-slate-900">{formData.phone}</span>
                    </div>
                    {formData.address && (
                        <div className="grid grid-cols-3 gap-2">
                            <span className="text-sm font-medium text-slate-600">ঠিকানা:</span>
                            <span className="col-span-2 text-sm text-slate-900">{formData.address}</span>
                        </div>
                    )}
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={onEdit}
                        disabled={loading}
                        className="flex-1"
                    >
                        পরিবর্তন করুন
                    </Button>
                    <Button
                        onClick={handleCreate}
                        disabled={loading}
                        className="flex-1"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                তৈরি হচ্ছে...
                            </>
                        ) : (
                            'দোকান তৈরি করুন'
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

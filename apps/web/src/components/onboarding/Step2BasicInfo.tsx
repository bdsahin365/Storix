'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { StoreFormData } from './StoreCreationFlow';

type Props = {
    formData: StoreFormData;
    onUpdate: (data: Partial<StoreFormData>) => void;
    onNext: () => void;
};

export default function Step2BasicInfo({ formData, onUpdate, onNext }: Props) {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'দোকানের নাম আবশ্যক';
        }
        if (!formData.owner_name.trim()) {
            newErrors.owner_name = 'মালিকের নাম আবশ্যক';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validate()) {
            onNext();
        }
    };

    return (
        <Card className="shadow-xl border-0 bg-white">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-900">
                    দোকানের তথ্য
                </CardTitle>
                <CardDescription className="text-slate-600">
                    আপনার দোকানের মৌলিক তথ্য দিন
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-base">
                        দোকানের নাম <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="name"
                        placeholder="যেমন: রহমান ট্রেডার্স"
                        value={formData.name}
                        onChange={(e) => onUpdate({ name: e.target.value })}
                        className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                        <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="owner_name" className="text-base">
                        মালিকের নাম <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="owner_name"
                        placeholder="আপনার নাম"
                        value={formData.owner_name}
                        onChange={(e) => onUpdate({ owner_name: e.target.value })}
                        className={errors.owner_name ? 'border-red-500' : ''}
                    />
                    {errors.owner_name && (
                        <p className="text-sm text-red-500">{errors.owner_name}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base">
                        দোকানের মোবাইল
                    </Label>
                    <Input
                        id="phone"
                        value={formData.phone}
                        disabled
                        className="bg-slate-100"
                    />
                    <p className="text-xs text-slate-500">
                        এটি আপনার লগইন নম্বর থেকে নেওয়া হয়েছে
                    </p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="address" className="text-base">
                        দোকানের ঠিকানা (ঐচ্ছিক)
                    </Label>
                    <Textarea
                        id="address"
                        placeholder="যেমন: ১২৩, মেইন রোড, ঢাকা"
                        value={formData.address}
                        onChange={(e) => onUpdate({ address: e.target.value })}
                        rows={3}
                    />
                </div>

                <Button onClick={handleNext} size="lg" className="w-full">
                    পরবর্তী
                </Button>
            </CardContent>
        </Card>
    );
}

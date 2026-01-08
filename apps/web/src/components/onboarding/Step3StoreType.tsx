'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const STORE_TYPES = [
    { value: 'মুদি দোকান', label: 'মুদি দোকান', icon: '🛒' },
    { value: 'ফার্মেসি', label: 'ফার্মেসি', icon: '💊' },
    { value: 'হার্ডওয়্যার', label: 'হার্ডওয়্যার', icon: '🔧' },
    { value: 'পাইকারি', label: 'পাইকারি', icon: '📦' },
    { value: 'অন্যান্য', label: 'অন্যান্য', icon: '🏪' },
];

type Props = {
    selectedType: string;
    onSelect: (type: string) => void;
    onNext: () => void;
};

export default function Step3StoreType({ selectedType, onSelect, onNext }: Props) {
    const [error, setError] = useState('');

    const handleNext = () => {
        if (!selectedType) {
            setError('দোকানের ধরন নির্বাচন করুন');
            return;
        }
        setError('');
        onNext();
    };

    return (
        <Card className="shadow-xl border-0 bg-white">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-900">
                    দোকানের ধরন
                </CardTitle>
                <CardDescription className="text-slate-600">
                    আপনার দোকান কোন ধরনের?
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <RadioGroup value={selectedType} onValueChange={onSelect}>
                    <div className="space-y-3">
                        {STORE_TYPES.map((type) => (
                            <div
                                key={type.value}
                                className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-all ${selectedType === type.value
                                    ? 'border-primary bg-primary/5'
                                    : 'border-slate-200 hover:border-slate-300'
                                    }`}
                                onClick={() => onSelect(type.value)}
                            >
                                <RadioGroupItem value={type.value} id={type.value} />
                                <Label
                                    htmlFor={type.value}
                                    className="flex items-center gap-3 cursor-pointer flex-1 text-base"
                                >
                                    <span className="text-2xl">{type.icon}</span>
                                    <span>{type.label}</span>
                                </Label>
                            </div>
                        ))}
                    </div>
                </RadioGroup>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <Button onClick={handleNext} size="lg" className="w-full">
                    পরবর্তী
                </Button>
            </CardContent>
        </Card>
    );
}

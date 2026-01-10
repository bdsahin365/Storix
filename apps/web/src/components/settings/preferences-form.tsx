'use client';

import { useState } from 'react';
import { StorePreferences, updateStorePreferences } from '@/lib/api/settings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface PreferencesFormProps {
    preferences: StorePreferences;
    refresh: () => void;
}

export function PreferencesForm({ preferences, refresh }: PreferencesFormProps) {
    const [loading, setLoading] = useState(false);
    const [language, setLanguage] = useState<'bn' | 'en'>(preferences.language);
    const [dateFormat, setDateFormat] = useState(preferences.date_format);
    const [headerText, setHeaderText] = useState(preferences.halkhata_header_text || '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateStorePreferences({
                language,
                date_format: dateFormat,
                halkhata_header_text: headerText
            });
            toast.success('পছন্দসমূহ আপডেট করা হয়েছে');
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
                <CardTitle>পছন্দসমূহ</CardTitle>
                <CardDescription>অ্যাপ্লিকেশন সেটিংস এবং কনফিগারেশন</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-3">
                        <Label>ভাষা</Label>
                        <RadioGroup
                            defaultValue={language}
                            onValueChange={(val) => setLanguage(val as 'bn' | 'en')}
                            className="flex gap-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="bn" id="bn" />
                                <Label htmlFor="bn">বাংলা</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="en" id="en" />
                                <Label htmlFor="en">English</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="space-y-2">
                        <Label>তারিখ ফরম্যাট</Label>
                        <Input
                            value={dateFormat}
                            onChange={(e) => setDateFormat(e.target.value)}
                            placeholder="DD/MM/YYYY"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>হালখাতা হেডার টেক্সট (অপশনাল)</Label>
                        <Input
                            value={headerText}
                            onChange={(e) => setHeaderText(e.target.value)}
                            placeholder="যেমন: বিসমিল্লাহির রহমানির রহিম"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>মুদ্রা (পরিবর্তনযোগ্য নয়)</Label>
                        <div className="p-3 border rounded-md bg-muted text-2xl font-bold w-12 flex items-center justify-center">৳</div>
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

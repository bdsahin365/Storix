'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, Trash2, Loader2, Store } from 'lucide-react';
import { uploadStorePhoto, deleteStorePhoto } from '@/lib/api/settings';
import { toast } from 'sonner';

interface PhotoUploadProps {
    initialUrl?: string;
    onPhotoUpdated: (url: string | undefined) => void;
}

export function PhotoUpload({ initialUrl, onPhotoUpdated }: PhotoUploadProps) {
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            toast.error('ছবির আকার ২ মেগাবাইটের কম হতে হবে');
            return;
        }

        try {
            setUploading(true);
            const res = await uploadStorePhoto(file);
            onPhotoUpdated(res.signedUrl);
            toast.success('দোকানের ছবি আপলোড করা হয়েছে');
        } catch (error) {
            toast.error('ছবি আপলোড ব্যর্থ হয়েছে');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setUploading(true);
            await deleteStorePhoto();
            onPhotoUpdated(undefined);
            if (fileInputRef.current) fileInputRef.current.value = '';
            toast.success('দোকানের ছবি মুছে ফেলা হয়েছে');
        } catch (error) {
            toast.error('ছবি মুছতে ব্যর্থ হয়েছে');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border">
                <AvatarImage src={initialUrl} className="object-cover" />
                <AvatarFallback className="bg-muted">
                    <Store className="h-8 w-8 text-muted-foreground" />
                </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">

                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/png, image/jpeg"
                    onChange={handleFileSelect}
                />
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={uploading}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {uploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                        আপলোড
                    </Button>
                    {initialUrl && (
                        <Button
                            variant="destructive"
                            size="sm"
                            disabled={uploading}
                            onClick={handleDelete}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                </div>
                <span className="text-xs text-muted-foreground">JPG/PNG, সর্বোচ্চ ২MB</span>
            </div>
        </div>
    );
}

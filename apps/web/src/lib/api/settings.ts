import { createClient } from '@/lib/supabase/client';

export interface StoreProfile {
    id: string;
    name: string;
    store_type: string;
    address?: string;
    photo_url?: string;
}

export interface OwnerInfo {
    name: string;
    phone: string;
}

export interface StorePreferences {
    language: 'bn' | 'en';
    date_format: string;
    halkhata_header_text?: string;
}

export interface StoreSettingsResponse {
    profile: StoreProfile;
    owner: OwnerInfo;
    preferences: StorePreferences;
}

export interface UpdateProfileDto {
    name: string;
    address?: string;
}

export interface UpdatePreferencesDto {
    language?: 'bn' | 'en';
    date_format?: string;
    halkhata_header_text?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

async function getAuthHeader() {
    const supabase = createClient();
    if (!supabase) throw new Error('Supabase client not initialized');
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');
    return {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
    };
}

export async function getStoreSettings(): Promise<StoreSettingsResponse> {
    const headers = await getAuthHeader();
    console.log('Frontend: Sending headers', headers);
    const res = await fetch(`${API_URL}/shops/settings`, { headers });
    if (!res.ok) throw new Error('Failed to fetch settings');
    return res.json();
}

export async function updateStoreProfile(data: UpdateProfileDto): Promise<void> {
    const headers = await getAuthHeader();
    const res = await fetch(`${API_URL}/shops/profile`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update profile');
}

export async function updateStorePreferences(data: UpdatePreferencesDto): Promise<void> {
    const headers = await getAuthHeader();
    const res = await fetch(`${API_URL}/shops/preferences`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update preferences');
}

export async function uploadStorePhoto(file: File): Promise<{ signedUrl: string }> {
    const supabase = createClient();
    if (!supabase) throw new Error('Supabase client not initialized');
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) throw new Error('Not authenticated');

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${API_URL}/shops/photo`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${session.access_token}`,
            // Content-Type is set automatically for FormData
        },
        body: formData,
    });

    if (!res.ok) throw new Error('Failed to upload photo');
    return res.json();
}

export async function deleteStorePhoto(): Promise<void> {
    const headers = await getAuthHeader();
    const res = await fetch(`${API_URL}/shops/photo`, {
        method: 'DELETE',
        headers,
    });
    if (!res.ok) throw new Error('Failed to delete photo');
}

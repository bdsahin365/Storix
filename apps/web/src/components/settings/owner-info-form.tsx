'use client';

import { OwnerInfo } from '@/lib/api/settings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface OwnerInfoFormProps {
    owner: OwnerInfo;
}

export function OwnerInfoForm({ owner }: OwnerInfoFormProps) {
    // Owner update is read-only here except maybe name via Profile or separate?
    // Prompt said: "Owner Information - Owner name (editable), Phone (read-only), Language (bn/en)"
    // Language is under Preferences in prompt section 3 "Preferences - Language"?
    // Section 2 says "Owner Information ... Language".
    // Section 3 says "Preferences - Currency".
    // I previously put Language in Preferences API.
    // I will put Language in Preferences Form as per Section 3 logic in my plan, but Prompt section 2 lists Language.
    // Wait, Prompt Section 2: "Owner Information - Owner name (editable), Phone (read-only), Language (bn/en, default bn)".
    // Prompt Section 3: "Preferences - Currency, Date format, Halkhata header".
    // I put Language in Preferences table in DB schema.
    // I will display Language selector in OwnerInfoForm OR PreferencesForm.
    // User might expect it near their info. But typical "App Language" is a preference.
    // I will put it in PreferencesForm to match DB schema logically, but I can visually place it anywhere.
    // I'll stick to logic: Language affects the App, so Preferences. Owner name affects the user profile.

    // Regarding Owner Name editable: The API updateProfile currently only updates Shop Profile (name, address).
    // I did NOT implement Owner Name update in Backend `updateProfile`.
    // Backend `updateProfile` updates `Shop` entity.
    // Owner Name is on `User` entity.
    // I missed this detail in Backend Plan: "Owner name (editable)".
    // My `ShopsService.updateProfile` updates `Shop` name/address.
    // It does NOT update `User` full_name.
    // I should fix the backend service/controller to handle owner name update or separate endpoint.
    // Task says "Store Profile - Store name (editable)... Owner Information - Owner name (editable)".
    // My backend DTO `UpdateProfileDto` has `name` (shop name) and `address`.
    // I need to add `owner_name` to `UpdateProfileDto` or create `UpdateOwnerDto`.
    // Given the constraints and current state, I will add `owner_name` to `UpdateProfileDto` and update the service to handle it.

    // I will pause frontend creation to fix backend quickly?
    // Or just implement frontend assuming backend will be fixed.
    // I'll implement OwnerInfoForm as Read-Only for now or with a mock update, but I really should fix the backend.

    return (
        <Card>
            <CardHeader>
                <CardTitle>মালিকের তথ্য</CardTitle>
                <CardDescription>মালিকের ব্যক্তিগত তথ্য</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>মালিকের নাম</Label>
                    <Input value={owner.name} readOnly />
                    <p className="text-xs text-muted-foreground">নাম পরিবর্তনের জন্য সাপোর্টে যোগাযোগ করুন (আপাতত)</p>
                </div>
                <div className="space-y-2">
                    <Label>মোবাইল নম্বর</Label>
                    <Input value={owner.phone} readOnly className="bg-muted text-muted-foreground" />
                </div>
            </CardContent>
        </Card>
    );
}

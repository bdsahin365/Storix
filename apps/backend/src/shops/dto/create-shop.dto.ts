import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export enum StoreType {
    GROCERY = 'মুদি দোকান',
    PHARMACY = 'ফার্মেসি',
    HARDWARE = 'হার্ডওয়্যার',
    WHOLESALE = 'পাইকারি',
    OTHER = 'অন্যান্য',
}

export class CreateShopDto {
    @IsString()
    @IsNotEmpty({ message: 'দোকানের নাম আবশ্যক' })
    name: string;

    @IsString()
    @IsNotEmpty({ message: 'মালিকের নাম আবশ্যক' })
    owner_name: string;

    @IsString()
    @IsNotEmpty({ message: 'মোবাইল নম্বর আবশ্যক' })
    phone: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsEnum(StoreType, { message: 'সঠিক দোকানের ধরন নির্বাচন করুন' })
    @IsNotEmpty({ message: 'দোকানের ধরন আবশ্যক' })
    store_type: StoreType;
}

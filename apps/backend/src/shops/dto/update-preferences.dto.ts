import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export class UpdatePreferencesDto {
    @IsString()
    @IsOptional()
    language?: 'bn' | 'en';

    @IsString()
    @IsOptional()
    date_format?: string;

    @IsString()
    @IsOptional()
    halkhata_header_text?: string;
}

import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateProfileDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    address?: string;

    // Store type is read-only in this module as per requirements, but maybe allowed to correct typos?
    // "Store type (read-only)" in prompt. So not included here.
}

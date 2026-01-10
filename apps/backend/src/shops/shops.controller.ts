import { Controller, Post, Body, UseGuards, Request, Get, Req, Put, UseInterceptors, UploadedFile, Delete, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';
import { OwnerGuard } from './guards/owner.guard';

@Controller('shops')
export class ShopsController {
    constructor(private readonly shopsService: ShopsService) { }

    // TEMPORARY: JWT guard disabled for testing
    // @UseGuards(AuthGuard('jwt'))
    @Post('create')
    async create(@Req() req: any, @Body() body: CreateShopDto) {
        // TEMPORARY: Use hardcoded Supabase user ID for testing
        const userId = req.user?.userId || '2c99262b-1c6e-4fa2-abae-a667cd569a98';
        console.log('🔧 [TEMP] Using user ID:', userId);
        return this.shopsService.create(body, userId);
    }

    // TEMPORARY: JWT guard disabled for testing
    // @UseGuards(AuthGuard('jwt'))
    @Get('my-shop')
    async getMyShop(@Req() req: any) {
        // TEMPORARY: Use hardcoded Supabase user ID for testing
        const userId = req.user?.userId || '2c99262b-1c6e-4fa2-abae-a667cd569a98';
        console.log('🔧 [TEMP] Using user ID:', userId);
        const result = await this.shopsService.getShopAndUser(userId);
        return result ? { shop: result.shop, user: result.user } : { shop: null };
    }

    // Settings Endpoints

    // TEMPORARY: Guards disabled for testing
    // @UseGuards(AuthGuard('jwt'), OwnerGuard)
    @Get('settings')
    async getSettings(@Req() req: any) {
        // TEMPORARY: Get shop from hardcoded user ID
        const userId = req.user?.userId || '2c99262b-1c6e-4fa2-abae-a667cd569a98';
        const result = await this.shopsService.getShopAndUser(userId);
        if (!result) throw new Error('Shop not found');
        return this.shopsService.getSettings(result.shop.id);
    }

    // TEMPORARY: Guards disabled for testing
    // @UseGuards(AuthGuard('jwt'), OwnerGuard)
    @Put('profile')
    async updateProfile(@Req() req: any, @Body() body: UpdateProfileDto) {
        const userId = req.user?.userId || '2c99262b-1c6e-4fa2-abae-a667cd569a98';
        const result = await this.shopsService.getShopAndUser(userId);
        if (!result) throw new Error('Shop not found');
        return this.shopsService.updateProfile(result.shop.id, userId, body);
    }

    @UseGuards(AuthGuard('jwt'), OwnerGuard)
    @Put('preferences')
    async updatePreferences(@Req() req: any, @Body() body: UpdatePreferencesDto) {
        return this.shopsService.updatePreferences(req.shop.id, req.user.userId, body);
    }

    @UseGuards(AuthGuard('jwt'), OwnerGuard)
    @Post('photo')
    @UseInterceptors(FileInterceptor('file'))
    async uploadPhoto(@Req() req: any, @UploadedFile() file: any) {
        return this.shopsService.uploadPhoto(req.shop.id, req.user.userId, file);
    }

    @UseGuards(AuthGuard('jwt'), OwnerGuard)
    @Delete('photo')
    async deletePhoto(@Req() req: any) {
        return this.shopsService.deletePhoto(req.shop.id, req.user.userId);
    }
}


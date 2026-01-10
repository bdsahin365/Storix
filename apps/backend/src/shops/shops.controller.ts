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

    @UseGuards(AuthGuard('jwt'))
    @Post('create')
    async create(@Req() req: any, @Body() body: CreateShopDto) {
        const userId = req.user.userId;
        return this.shopsService.create(body, userId);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('my-shop')
    async getMyShop(@Req() req: any) {
        const userId = req.user.userId;
        const result = await this.shopsService.getShopAndUser(userId);
        return result ? { shop: result.shop, user: result.user } : { shop: null };
    }

    // Settings Endpoints

    @UseGuards(AuthGuard('jwt'), OwnerGuard)
    @Get('settings')
    async getSettings(@Req() req: any) {
        // OwnerGuard attaches shop to request
        return this.shopsService.getSettings(req.shop.id);
    }

    @UseGuards(AuthGuard('jwt'), OwnerGuard)
    @Put('profile')
    async updateProfile(@Req() req: any, @Body() body: UpdateProfileDto) {
        return this.shopsService.updateProfile(req.shop.id, req.user.userId, body);
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


import { Controller, Post, Body, UseGuards, Request, Get, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';

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
}

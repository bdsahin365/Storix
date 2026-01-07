import { Controller, Post, Body, Get, Param, UseGuards, Req, Put, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from './products.service';
import { UsersService } from '../users/users.service';

@Controller('products')
@UseGuards(AuthGuard('jwt'))
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly usersService: UsersService
    ) { }

    private async getShopId(req: any): Promise<string> {
        const user = await this.usersService.findOneBySupabaseId(req.user.userId);
        if (!user || !user.shop_id) throw new UnauthorizedException('User/Shop not found');
        return user.shop_id;
    }

    @Post()
    async create(@Body() dto: any, @Req() req: any) {
        const shopId = await this.getShopId(req);
        return this.productsService.create(dto, shopId);
    }

    @Get()
    async findAll(@Req() req: any) {
        const shopId = await this.getShopId(req);
        return this.productsService.findAll(shopId);
    }
}

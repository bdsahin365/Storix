import { Controller, Post, Body, Get, Param, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomersService } from './customers.service';
import { UsersService } from '../users/users.service';

@Controller('customers')
@UseGuards(AuthGuard('jwt'))
export class CustomersController {
    constructor(
        private readonly customersService: CustomersService,
        private readonly usersService: UsersService
    ) { }

    private async getShopId(req: any): Promise<string> {
        const user = await this.usersService.findOneBySupabaseId(req.user.userId); // We need to add this method or use existing
        if (!user || !user.shop_id) throw new UnauthorizedException('User has no shop');
        return user.shop_id;
    }

    @Post()
    async create(@Body() createDto: any, @Req() req: any) {
        const shopId = await this.getShopId(req);
        return this.customersService.create(createDto, shopId);
    }

    @Get()
    async findAll(@Req() req: any) {
        const shopId = await this.getShopId(req);
        return this.customersService.findAll(shopId);
    }

    @Get(':id')
    async findOne(@Param('id') id: string, @Req() req: any) {
        const shopId = await this.getShopId(req);
        return this.customersService.findOne(id, shopId);
    }
}

import { Controller, Post, UseGuards, Request, Get, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post('sync')
    async syncUser(@Req() req: any) {
        return this.usersService.syncUser(req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    async getMe(@Req() req: any) {
        return this.usersService.syncUser(req.user);
    }
}

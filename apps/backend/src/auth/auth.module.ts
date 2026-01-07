import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SupabaseStrategy } from './supabase.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        ConfigModule,
    ],
    controllers: [],
    providers: [AuthService, SupabaseStrategy],
    exports: [SupabaseStrategy, AuthService],
})
export class AuthModule { }

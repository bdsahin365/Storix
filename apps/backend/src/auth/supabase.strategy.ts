import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(SupabaseStrategy.name);

    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            audience: 'authenticated', // Standard Supabase audience
            issuer: `${configService.get<string>('SUPABASE_URL')}/auth/v1`,
            algorithms: ['RS256', 'ES256'], // Supabase uses ES256 for new projects
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${configService.get<string>('SUPABASE_URL')}/.well-known/jwks.json`,
            }),
        });
    }

    async validate(payload: any) {
        // Determine user role (service_role vs authenticated)
        // Supabase JWT puts role in 'role' or 'app_metadata.provider'
        return {
            userId: payload.sub,
            email: payload.email,
            role: payload.role || payload.app_metadata?.role,
            exp: payload.exp,
        };
    }
}

import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(SupabaseStrategy.name);

    constructor(private readonly configService: ConfigService) {
        const jwtSecret = configService.get<string>('SUPABASE_JWT_SECRET');
        const supabaseUrl = configService.get<string>('SUPABASE_URL');

        const options: any = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            audience: undefined, // Disable audience check temporarily
            algorithms: ['HS256', 'RS256', 'ES256'],
        };

        if (jwtSecret) {
            options.secretOrKey = jwtSecret;
            // When using secretOrKey, we don't set secretOrKeyProvider
        } else {
            options.secretOrKeyProvider = passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${supabaseUrl}/.well-known/jwks.json`,
            });
        }

        super(options);

        // Log configuration after super() call
        this.logger.log(`🔐 Initializing SupabaseStrategy`);
        this.logger.log(`   JWT Secret: ${jwtSecret ? '✓ SET (' + jwtSecret.substring(0, 10) + '...)' : '✗ NOT SET'}`);
        this.logger.log(`   Supabase URL: ${supabaseUrl || '✗ NOT SET'}`);
        this.logger.log(`   Algorithm: ${jwtSecret ? 'HS256 (direct secret)' : 'RS256 (JWKS)'}`);
        this.logger.log(`✓ SupabaseStrategy initialized successfully`);
    }

    async validate(payload: any) {
        this.logger.log('🔍 SupabaseStrategy: Validating JWT payload');
        this.logger.debug(`   Payload: ${JSON.stringify(payload, null, 2)}`);

        if (!payload.sub) {
            this.logger.error('❌ Missing "sub" claim in JWT payload');
            throw new Error('Invalid token: missing user ID (sub claim)');
        }

        const user = {
            userId: payload.sub,
            email: payload.email,
            role: payload.role || payload.app_metadata?.role,
            exp: payload.exp,
        };

        this.logger.log(`✓ JWT validated successfully for user: ${user.userId}`);
        return user;
    }
}

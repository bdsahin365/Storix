import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    // Legacy local auth removed.
    // Auth is handled by Supabase (Client Side) + SupabaseStrategy (Backend Verification).
}

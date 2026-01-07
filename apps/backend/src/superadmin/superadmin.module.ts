import { Module } from '@nestjs/common';
import { SuperadminGuard } from './superadmin.guard';

@Module({
    providers: [SuperadminGuard],
    exports: [SuperadminGuard],
})
export class SuperadminModule { }

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GcNotifyController } from './gcnotify.controller';
import { GcNotifyService } from './gcnotify.service';

@Module({
  imports: [HttpModule],
  controllers: [GcNotifyController],
  providers: [GcNotifyService],
})
export class GCNotifyModule {}

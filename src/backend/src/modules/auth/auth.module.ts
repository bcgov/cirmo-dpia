
import { HttpModule, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { PiaIntakeService } from './pia-intake.service';
import { CreatePiaIntakeDto } from './dto/create-pia-intake.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TokenDecorator } from '../../common/decorators/token.decorator';
import { CreatePiaIntakeRO } from './ro/create-pia-intake.ro';
import { AuthService } from '../auth/auth.service';

@Controller('pia-intake')
@ApiTags('pia-intake')
@ApiBearerAuth()
export class PiaIntakeController {
  constructor(
    private readonly piaIntakeService: PiaIntakeService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @ApiOperation({ description: 'Submit a PIA-intake form' })
  @ApiCreatedResponse({
    description: 'Successfully submitted a PIA-intake form',
  })
  async create(
    @Body() createPiaIntakeDto: CreatePiaIntakeDto,
    @TokenDecorator() accessToken: string,
  ): Promise<CreatePiaIntakeRO> {
    if (!accessToken) {
      throw new UnauthorizedException();
    }

    const user = await this.authService.getUserInfo(accessToken);
    return this.piaIntakeService.create(createPiaIntakeDto, user);
  }
}

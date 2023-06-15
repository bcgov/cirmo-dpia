import { Controller, Post, Body, Req } from '@nestjs/common';
import { InvitesService } from './invites.service';
import { GenerateInviteDto } from './dto/generate-invite.dto';
import { IRequest } from 'src/common/interfaces/request.interface';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiGoneResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { InviteRO } from './ro/get-invite.ro';

@Controller('invite')
@ApiTags('invite')
@ApiBearerAuth()
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @Post()
  @ApiOperation({
    description: 'Generate Invite code for the pia',
  })
  @ApiOkResponse({
    description: 'Successfully generated or fetched the pia invite code',
  })
  @ApiForbiddenResponse({
    description:
      'Failed to generate or fetch pia invite code: User lacks permission to access the PIA',
  })
  @ApiNotFoundResponse({
    description:
      'Failed to generate or fetch pia invite code: PIA for the id provided not found',
  })
  @ApiGoneResponse({
    description:
      'Failed to generate or fetch pia invite code: PIA is not active anymore',
  })
  generate(
    @Body() generateInviteDto: GenerateInviteDto,
    @Req() req: IRequest,
  ): Promise<InviteRO> {
    return this.invitesService.generate(
      generateInviteDto,
      req.user,
      req.userRoles,
    );
  }
}

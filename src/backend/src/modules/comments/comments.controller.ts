import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  Query,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiGoneResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { IRequest } from 'src/common/interfaces/request.interface';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AllowedCommentPaths } from './enums/allowed-comment-paths.enum';

@Controller('comments')
@ApiTags('Comments')
@ApiBearerAuth()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({
    description: 'Create a new comment',
  })
  @ApiCreatedResponse({
    description: 'Successfully created a new comment',
  })
  @ApiForbiddenResponse({
    description:
      'Failed to create comment: User lacks permission to create comment to this PIA',
  })
  @ApiGoneResponse({
    description: 'Failed to create comment: The PIA is not active',
  })
  create(@Body() createCommentDto: CreateCommentDto, @Req() req: IRequest) {
    return this.commentsService.create(
      createCommentDto,
      req.user,
      req.userRoles,
    );
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    description: 'Fetches the comments of a PIA section path',
  })
  @ApiOkResponse({
    description: 'Successfully fetched the comments of a PIA section path',
  })
  @ApiForbiddenResponse({
    description:
      'Failed to fetch comments: User lacks permission to create fetch comments of this PIA',
  })
  @ApiGoneResponse({
    description: 'Failed to fetch comments: The PIA is not active',
  })
  find(
    @Query('id') id: string,
    @Query('path') path: AllowedCommentPaths,
    @Req() req: IRequest,
  ) {
    return this.commentsService.findByPiaAndPath(
      +id,
      path,
      req.user,
      req.userRoles,
    );
  }

  @Delete(':id')
  @ApiOperation({
    description: 'Deletes a comment',
  })
  @ApiOkResponse({
    description: 'Successfully deleted a comment',
  })
  @ApiBadRequestResponse({
    description: 'Failed to delete comment: Invalid request',
  })
  @ApiForbiddenResponse({
    description:
      'Failed to delete comment: User lacks permission to delete comment of this PIA',
  })
  @ApiGoneResponse({
    description: 'Failed to delete comment: The PIA is not active',
  })
  remove(@Param('id') id: string, @Req() req: IRequest) {
    return this.commentsService.remove(+id, req.user, req.userRoles);
  }

  @Post(':id/resolve')
  resolve(@Param('id') id: string) {
    return this.commentsService.resolve(+id);
  }
}

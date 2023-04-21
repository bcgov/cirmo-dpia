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
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { IRequest } from 'src/common/interfaces/request.interface';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FindCommentsCountDto } from './dto/find-comments-count.dto';
import { FindCommentsDto } from './dto/find-comments.dto';

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
  @ApiNotFoundResponse({
    description: 'Failed to create comment: PIA for the id provided not found',
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
  @ApiNotFoundResponse({
    description: 'Failed to fetch comments: PIA for the id provided not found',
  })
  @ApiGoneResponse({
    description: 'Failed to fetch comments: The PIA is not active',
  })
  find(@Query() findCommentsDto: FindCommentsDto, @Req() req: IRequest) {
    return this.commentsService.findByPiaAndPath(
      findCommentsDto.piaId,
      findCommentsDto.path,
      req.user,
      req.userRoles,
    );
  }

  @Get('/count')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Successfully fetched the count of comments for PIA',
  })
  @ApiForbiddenResponse({
    description:
      'Failed to fetch count of comments: User lacks permission to create fetch comments of this PIA',
  })
  @ApiNotFoundResponse({
    description:
      'Failed to fetch count of comments: PIA for the id provided not found',
  })
  @ApiGoneResponse({
    description: 'Failed to fetch count of comments: The PIA is not active',
  })
  findCommentsCount(
    @Query() findCommentsCount: FindCommentsCountDto,
    @Req() req: IRequest,
  ) {
    return this.commentsService.findCountByPia(
      findCommentsCount.piaId,
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
  @ApiNotFoundResponse({
    description: 'Failed to delete comment: Comment not found',
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

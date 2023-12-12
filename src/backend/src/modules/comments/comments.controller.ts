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
import { CommentsCountRO } from './ro/comments-count-ro';
import { CommentRO, ReplyRO } from './ro/get-comment.ro';
import { CreateReplyDto } from './dto/create-reply.dto';

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
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: IRequest,
  ): Promise<CommentRO> {
    return this.commentsService.create(
      createCommentDto,
      req.user,
      req.userRoles,
    );
  }

  // Create Reply
  @Post('reply')
  @HttpCode(201)
  @ApiOperation({
    description: 'Create a new comment reply',
  })
  @ApiCreatedResponse({
    description: 'Successfully created a new comment reply',
  })
  @ApiForbiddenResponse({
    description:
      'Failed to create comment reply: User lacks permission to create comment reply to this PIA',
  })
  @ApiNotFoundResponse({
    description:
      'Failed to create comment reply: Comment for the id provided not found',
  })
  @ApiGoneResponse({
    description: 'Failed to create comment reply: The PIA is not active',
  })
  createReply(
    @Body() createReplyDto: CreateReplyDto,
    @Req() req: IRequest,
  ): Promise<ReplyRO> {
    return this.commentsService.createReply(
      createReplyDto,
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
  find(
    @Query() findCommentsDto: FindCommentsDto,
    @Req() req: IRequest,
  ): Promise<CommentRO[]> {
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
  ): Promise<Partial<CommentsCountRO>> {
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
  remove(@Param('id') id: string, @Req() req: IRequest): Promise<CommentRO> {
    return this.commentsService.remove(+id, req.user, req.userRoles);
  }

  // Delete Reply
  @Delete('reply/:id')
  @ApiOperation({
    description: 'Deletes a comment reply',
  })
  @ApiOkResponse({
    description: 'Successfully deleted a comment reply',
  })
  @ApiBadRequestResponse({
    description: 'Failed to delete comment reply: Invalid request',
  })
  @ApiForbiddenResponse({
    description:
      'Failed to delete comment: User lacks permission to delete comment reply of this PIA',
  })
  @ApiNotFoundResponse({
    description: 'Failed to delete comment reply: Comment not found',
  })
  @ApiGoneResponse({
    description: 'Failed to delete comment reply: The PIA is not active',
  })
  removeReply(@Param('id') id: string, @Req() req: IRequest): Promise<ReplyRO> {
    return this.commentsService.removeReply(+id, req.user, req.userRoles);
  }

  @Post(':id/resolve')
  resolve(@Param('id') id: string) {
    return this.commentsService.resolve(+id);
  }

  @Delete('/deleteAll/:path') // HTTP DELETE endpoint to handle comment deletion based on the provided 'path'
  @ApiOperation({
    description: 'Delete comments based on step',
  })
  @ApiOkResponse({
    description: 'Successfully deleted comments',
  })
  @ApiBadRequestResponse({
    description: 'Failed to delete comments: Invalid request',
  })
  @ApiForbiddenResponse({
    description:
      'Failed to delete comments: User lacks permission to delete comment of this PIA',
  })
  @ApiNotFoundResponse({
    description: 'Failed to delete comments: Comments not found',
  })
  @ApiGoneResponse({
    description: 'Failed to delete comments: The PIA is not active',
  })
  removeCommentsByPath(
    @Param('path') path: string,
    @Req() req: IRequest,
  ): Promise<Array<CommentRO>> {
    // Delegate the comment removal logic to the commentsService, passing required parameters
    return this.commentsService.removeCommentsByPath(
      path,
      req.user,
      req.userRoles,
    );
  }
}

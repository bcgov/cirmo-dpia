import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEnum } from 'src/common/enums/roles.enum';
import { FindOptionsWhere, Repository } from 'typeorm';
import { KeycloakUser } from '../auth/keycloak-user.model';
import { checkUpdatePermissions } from '../pia-intake/helper/check-update-permissions';
import { PiaIntakeService } from '../pia-intake/pia-intake.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { AllowedCommentPaths } from './enums/allowed-comment-paths.enum';
import {
  CommentsCountDbRO,
  CommentsCountRO,
  getFormattedCommentsCount,
} from './ro/comments-count-ro';
import {
  CommentRO,
  ReplyRO,
  getFormattedComment,
  getFormattedComments,
  getFormattedReply,
} from './ro/get-comment.ro';
import { CreateReplyDto } from './dto/create-reply.dto';
import { ReplyEntity } from './entities/reply.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    @InjectRepository(ReplyEntity)
    private replyRepository: Repository<ReplyEntity>,
    private readonly piaService: PiaIntakeService,
  ) {}

  async findOneBy(
    where: FindOptionsWhere<CommentEntity>,
  ): Promise<CommentEntity> {
    const comment: CommentEntity =
      await this.commentRepository.findOneBy(where);

    // If the record is not found, throw an exception
    if (!comment) {
      throw new NotFoundException();
    }

    return comment;
  }

  async findOneReplyBy(
    where: FindOptionsWhere<ReplyEntity>,
  ): Promise<ReplyEntity> {
    const reply: ReplyEntity = await this.replyRepository.findOneBy(where);

    // If the record is not found, throw an exception
    if (!reply) {
      throw new NotFoundException();
    }

    return reply;
  }

  async create(
    createCommentDto: CreateCommentDto,
    user: KeycloakUser,
    userRoles: Array<RolesEnum>,
  ): Promise<CommentRO> {
    // validate access to PIA. Throw error if not
    const pia = await this.piaService.validatePiaAccess(
      createCommentDto.piaId,
      user,
      userRoles,
    );

    // extract user input dto
    const { path, text } = createCommentDto;

    // validate blank text
    if ((text || '').trim() === '') {
      throw new ForbiddenException({
        piaId: pia.id,
        message:
          'Forbidden: Failed to add comments to the PIA. Text cannot be blank.',
      });
    }

    // check if adding comments to this PIA allowed
    const isActionAllowed = checkUpdatePermissions({
      status: pia?.status,
      entityType: 'comment',
      entityAction: 'add',
    });

    if (!isActionAllowed) {
      throw new ForbiddenException({
        piaId: pia.id,
        message: 'Forbidden: Failed to add comments to the PIA',
      });
    }

    // create resource
    const comment: CommentEntity = await this.commentRepository.save({
      pia,
      path,
      text,
      isResolved: false,
      createdByGuid: user.idir_user_guid,
      createdByUsername: user.idir_username,
      updatedByGuid: user.idir_user_guid,
      updatedByUsername: user.idir_username,
      createdByDisplayName: user.display_name,
    });

    // return formatted object
    return getFormattedComment(comment);
  }

  async createReply(
    createReplyDto: CreateReplyDto,
    user: KeycloakUser,
    userRoles: Array<RolesEnum>,
  ): Promise<ReplyRO> {
    // extract user input dto
    const { commentId, text } = createReplyDto;
    const parentComment = await this.findOneBy({ id: commentId });

    // validate comment exists
    if (!parentComment)
      throw new NotFoundException({
        commentId,
        message: 'No comment found by the id provided.',
      });

    // validate access to PIA. Throw error if not
    const pia = await this.piaService.validatePiaAccess(
      parentComment.piaId,
      user,
      userRoles,
    );

    // validate blank text
    if ((text || '').trim() === '') {
      throw new ForbiddenException({
        piaId: pia.id,
        message:
          'Forbidden: Failed to add comment reply to the PIA. Text cannot be blank.',
      });
    }

    // check if adding comments to this PIA allowed
    const isActionAllowed = checkUpdatePermissions({
      status: pia?.status,
      entityType: 'comment',
      entityAction: 'add',
    });

    if (!isActionAllowed) {
      throw new ForbiddenException({
        piaId: pia.id,
        message: 'Forbidden: Failed to add comment reply to the PIA',
      });
    }

    // create resource
    const reply: ReplyEntity = await this.replyRepository.save({
      comment: parentComment,
      text,
      isResolved: false,
      createdByGuid: user.idir_user_guid,
      createdByUsername: user.idir_username,
      updatedByGuid: user.idir_user_guid,
      updatedByUsername: user.idir_username,
      createdByDisplayName: user.display_name,
    });

    // return formatted object
    return getFormattedReply(reply);
  }

  async findByPiaAndPath(
    piaId: number,
    path: AllowedCommentPaths,
    user: KeycloakUser,
    userRoles: Array<RolesEnum>,
  ): Promise<Array<CommentRO>> {
    // validate access to PIA. Throw error if not
    await this.piaService.validatePiaAccess(piaId, user, userRoles);

    // fetch comments for the pia
    const comments: CommentEntity[] = await this.commentRepository.find({
      where: {
        pia: {
          id: piaId,
        },
        path,
      },
      order: { createdAt: 1 },
    });

    // Add replies
    const commentsWithReplies = [];
    for (const comment of comments) {
      // Fetch reply
      const replies = await this.replyRepository.find({
        where: {
          commentId: comment.id,
        },
        order: { createdAt: 1 },
      });
      commentsWithReplies.push({ ...comment, replies });
    }

    // return formatted objects
    return getFormattedComments(commentsWithReplies);
  }

  async findCountByPia(
    piaId: number,
    user: KeycloakUser,
    userRoles: Array<RolesEnum>,
  ): Promise<Partial<CommentsCountRO>> {
    // validate access to PIA. Throw error if not
    await this.piaService.validatePiaAccess(piaId, user, userRoles);

    // fetch comments for the pia grouped by path
    const commentsCount: Array<CommentsCountDbRO> = await this.commentRepository
      .createQueryBuilder()
      .select('count(*)', 'count')
      .addSelect('path', 'path')
      .where('pia_id=:piaId', { piaId })
      .groupBy('path')
      .getRawMany();

    // format return object
    return getFormattedCommentsCount(commentsCount);
  }

  async remove(
    id: number,
    user: KeycloakUser,
    userRoles: Array<RolesEnum>,
  ): Promise<CommentRO> {
    // fetch comment
    const comment = await this.findOneBy({ id });

    // if the comment person who created the comment is not the one deleting, throw error
    if (user.idir_user_guid !== comment.createdByGuid) {
      throw new ForbiddenException({
        message: "Forbidden: You're are not authorized to remove this comment",
      });
    }

    // validate access to PIA. Throw error if not
    const pia = await this.piaService.validatePiaAccess(
      comment.piaId,
      user,
      userRoles,
    );

    // check if deleting comments to this PIA allowed
    const isActionAllowed = checkUpdatePermissions({
      status: pia?.status,
      entityType: 'comment',
      entityAction: 'remove',
    });

    if (!isActionAllowed) {
      throw new ForbiddenException({
        piaId: pia.id,
        message: 'Forbidden: Failed to remove comments of the PIA',
      });
    }

    // throw error if comment already deleted
    if (comment.isActive === false) {
      throw new BadRequestException('Comment already deleted');
    }

    // soft delete
    const updatedComment = await this.commentRepository.save({
      ...comment,
      isActive: false,
      text: null,
    });

    return getFormattedComment(updatedComment);
  }

  // Remove Reply
  async removeReply(
    id: number,
    user: KeycloakUser,
    userRoles: Array<RolesEnum>,
  ): Promise<ReplyRO> {
    // fetch reply
    const reply = await this.findOneReplyBy({ id });
    const parentComment = await this.findOneBy({ id: reply.commentId });

    // if the comment person who created the comment is not the one deleting, throw error
    if (user.idir_user_guid !== reply.createdByGuid) {
      throw new ForbiddenException({
        message: "Forbidden: You're are not authorized to remove this reply",
      });
    }

    // validate access to PIA. Throw error if not
    const pia = await this.piaService.validatePiaAccess(
      parentComment.piaId,
      user,
      userRoles,
    );

    // check if deleting comments to this PIA allowed
    const isActionAllowed = checkUpdatePermissions({
      status: pia?.status,
      entityType: 'comment',
      entityAction: 'remove',
    });

    if (!isActionAllowed) {
      throw new ForbiddenException({
        piaId: pia.id,
        message: 'Forbidden: Failed to remove comment reply of the PIA',
      });
    }

    // throw error if comment already deleted
    if (reply.isActive === false) {
      throw new BadRequestException('Reply already deleted');
    }

    // soft delete
    const updatedReply = await this.replyRepository.save({
      ...reply,
      isActive: false,
      text: null,
    });

    return getFormattedReply(updatedReply);
  }

  // TODO
  async resolve(id: number) {
    return `This is a resolve method yet to be developed for comment ${id}`;
  }
}

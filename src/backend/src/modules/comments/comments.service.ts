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
  getFormattedComment,
  getFormattedComments,
} from './ro/get-comment.ro';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    private readonly piaService: PiaIntakeService,
  ) { }

  async findOneBy(
    where: FindOptionsWhere<CommentEntity>,
  ): Promise<CommentEntity> {
    const comment: CommentEntity = await this.commentRepository.findOneBy(
      where,
    );

    // If the record is not found, throw an exception
    if (!comment) {
      throw new NotFoundException();
    }

    return comment;
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
        message: 'Forbidden: Failed to add comments to the PIA. Text cannot be blank.',
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

    // return formatted objects
    return getFormattedComments(comments);
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
        message: "Forbidden: You're are not authorized to remoe this comment",
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

  // TODO
  async resolve(id: number) {
    return `This is a resolve method yet to be developed for comment ${id}`;
  }
}

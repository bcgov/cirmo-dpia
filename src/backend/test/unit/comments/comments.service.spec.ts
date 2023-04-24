import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AuthModule } from 'src/modules/auth/auth.module';
import { KeycloakUser } from 'src/modules/auth/keycloak-user.model';
import { PiaIntakeEntity } from 'src/modules/pia-intake/entities/pia-intake.entity';
import { PiaIntakeService } from 'src/modules/pia-intake/pia-intake.service';
import { RolesEnum } from 'src/common/enums/roles.enum';

import { piaIntakeEntityMock } from 'test/util/mocks/data/pia-intake.mock';
import { delay } from 'test/util/testUtils';
import { keycloakUserMock } from 'test/util/mocks/data/auth.mock';
import { repositoryMock } from 'test/util/mocks/repository/repository.mock';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { CommentsService } from 'src/modules/comments/comments.service';
import { CommentsController } from 'src/modules/comments/comments.controller';
import { CommentEntity } from 'src/modules/comments/entities/comment.entity';
import {
  commentEntityMock,
  commentROMock,
  commentsCountDbRO,
  commentsCountROMock,
  createCommentDtoMock,
  findCommentsMock,
  findCommentsROMock,
} from 'test/util/mocks/data/comments.mock';
import { CreateCommentDto } from 'src/modules/comments/dto/create-comment.dto';
import { AllowedCommentPaths } from 'src/modules/comments/enums/allowed-comment-paths.enum';

/**
 * @Description
 * This file tests the contents of pia-intake.service.ts
 */
describe('CommentsService', () => {
  let commentsService: CommentsService;
  let piaService: PiaIntakeService;
  let commentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [CommentsController],
      providers: [
        CommentsService,
        PiaIntakeService,
        {
          provide: getRepositoryToken(CommentEntity),
          useValue: { ...repositoryMock },
        },
        {
          provide: getRepositoryToken(PiaIntakeEntity),
          useValue: { ...repositoryMock },
        },
      ],
    }).compile();

    commentsService = module.get<CommentsService>(CommentsService);
    piaService = module.get<PiaIntakeService>(PiaIntakeService);
    commentRepository = module.get(getRepositoryToken(CommentEntity));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * @Description
   * Dummy test to check if the service is defined
   */
  it('should be defined', () => {
    expect(commentsService).toBeDefined();
  });

  /**
   * @Description
   * These set of tests validates that the method passes the correct values to the repository,
   * mocking the database save operation.
   *
   * @method create
   */
  describe('`create` method', () => {
    /**
     * This test validates that the it passes the correct data to the repository, saving the comment.
     * It also validates that the result received is actually coming from the repository.
     *
     * @Input
     *   - API data mock for creating comment
     *   - User info mock
     *
     * @Output
     *   - an object containing id of the newly created database row
     */

    it('succeeds creating the comment', async () => {
      const createCommentDto: CreateCommentDto = { ...createCommentDtoMock };
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles: Array<RolesEnum> = [];

      const expectedResult = { ...commentROMock };

      commentsService.validatePiaAccess = jest.fn(async () => null);

      piaService.findOneBy = jest.fn(async () => {
        delay(10);
        return { ...piaIntakeEntityMock };
      });

      commentRepository.save = jest.fn(async () => {
        delay(10);
        return { ...commentEntityMock };
      });

      const result = await commentsService.create(
        createCommentDto,
        user,
        userRoles,
      );

      expect(commentsService.validatePiaAccess).toHaveBeenCalledWith(
        createCommentDto.piaId,
        user,
        userRoles,
      );

      expect(piaService.findOneBy).toHaveBeenCalledWith({
        id: createCommentDto.piaId,
      });

      expect(commentRepository.save).toHaveBeenCalledWith({
        pia: { ...piaIntakeEntityMock },
        path: createCommentDto.path,
        text: createCommentDto.text,
        isResolved: false,
        createdByGuid: user.idir_user_guid,
        createdByUsername: user.idir_username,
        updatedByGuid: user.idir_user_guid,
        updatedByUsername: user.idir_username,
        createdByDisplayName: user.display_name,
      });

      expect(result).toEqual(expectedResult);
    });
  });

  /**
   * @Description
   * These set of tests validates that the method passes the correct values to the repository,
   * fetches the filtered result set, mocking the database find operation.
   *
   * @method findByPiaAndPath
   */
  describe('`findByPiaAndPath` method', () => {
    /**
     * This test validates that the the method correctly filters the result
     *
     * @Input
     *   - piaId: number
     *   - path: AllowedCommentPaths
     *   - User info mock
     *
     * @Output
     *   - comments for a section inside a piaId
     */

    it('succeeds in fetching the filtered comments by piaId and path', async () => {
      const piaId = 101;
      const path =
        AllowedCommentPaths['accuracyCorrectionAndRetention.accuracy'];
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles: Array<RolesEnum> = [];

      const expectedResult = [...findCommentsROMock];

      commentsService.validatePiaAccess = jest.fn(async () => null);

      commentRepository.find = jest.fn(async () => {
        delay(10);
        return [...findCommentsMock];
      });

      const result = await commentsService.findByPiaAndPath(
        piaId,
        path,
        user,
        userRoles,
      );

      expect(commentsService.validatePiaAccess).toHaveBeenCalledWith(
        piaId,
        user,
        userRoles,
      );

      expect(commentRepository.find).toHaveBeenCalledWith({
        where: {
          pia: {
            id: piaId,
          },
          path,
        },
        order: { createdAt: 1 },
      });

      expect(result).toEqual(expectedResult);
    });
  });

  /**
   * @Description
   * These set of tests validates that the method passes the correct values to the repository,
   * fetches the filtered result set // grouped by, mocking the database find operation.
   *
   * @method findCountByPia
   */
  describe('`findCountByPia` method', () => {
    /**
     * This test validates that the the method correctly filters the result
     *
     * @Input
     *   - piaId: number
     *   - User info mock
     *
     * @Output
     *   - comments for a section inside a piaId
     */

    it('succeeds in fetching the count of comments by piaId', async () => {
      const piaId = 101;
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles: Array<RolesEnum> = [];

      const expectedResult = { ...commentsCountROMock };

      commentsService.validatePiaAccess = jest.fn(async () => null);

      commentRepository.createQueryBuilder = jest.fn(() => {
        return {
          select: jest.fn(() => {
            return {
              addSelect: jest.fn(() => {
                return {
                  where: jest.fn(() => {
                    return {
                      groupBy: jest.fn(() => {
                        return {
                          getRawMany: jest.fn(() => {
                            return [commentsCountDbRO];
                          }),
                        };
                      }),
                    };
                  }),
                };
              }),
            };
          }),
        };
      });

      const result = await commentsService.findCountByPia(
        piaId,
        user,
        userRoles,
      );

      expect(commentsService.validatePiaAccess).toHaveBeenCalledWith(
        piaId,
        user,
        userRoles,
      );

      expect(result).toEqual(expectedResult);
    });
  });

  /**
   * @Description
   * These set of tests validates that the method passes the correct values to the repository,
   * removes the comment, mocking the database delete operation.
   *
   * @method remove
   */
  describe('`remove` method', () => {
    /**
     * This test validates that the the method correctly removes the comment
     *
     * @Input
     *   - id: number
     *   - User info mock
     *
     * @Output
     *   - soft deleted - updated comment RO
     */

    // Scenario1: Forbidden Exception: User tried to remove a comment they did not created
    it('fails with the Forbidden Exception as the user tried to remove a comment they did not create', async () => {
      const id = 1;
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles: Array<RolesEnum> = [];

      commentsService.findOneBy = jest.fn(async () => ({
        ...commentEntityMock,
        createdByGuid: 'a_random_user_id',
      }));

      await expect(commentsService.remove(id, user, userRoles)).rejects.toThrow(
        new ForbiddenException(),
      );

      expect(commentsService.findOneBy).toHaveBeenCalledWith({ id });
    });

    // Scenario2: BadRequest Exception: User tried to delete a comment which is already deleted
    it('fails with the BadRequest Exception as the user tried to delete a comment which is already deleted', async () => {
      const id = 1;
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles: Array<RolesEnum> = [];

      commentsService.findOneBy = jest.fn(async () => ({
        ...commentEntityMock,
        isActive: false,
      }));

      commentsService.validatePiaAccess = jest.fn(async () => null);

      await expect(commentsService.remove(id, user, userRoles)).rejects.toThrow(
        new BadRequestException('Comment already deleted'),
      );

      expect(commentsService.findOneBy).toHaveBeenCalledWith({ id });
      expect(commentsService.validatePiaAccess).toHaveBeenCalledWith(
        commentEntityMock.piaId,
        user,
        userRoles,
      );
    });

    // Scenario3: User successfully deletes a comment
    it('succeeds as user successfully deletes a comment', async () => {
      const id = 1;
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles: Array<RolesEnum> = [];

      commentsService.findOneBy = jest.fn(async () => ({
        ...commentEntityMock,
      }));

      commentsService.validatePiaAccess = jest.fn(async () => null);

      commentRepository.save = jest.fn(async () => {
        delay(10);
        return { ...commentEntityMock, isActive: false, text: null };
      });

      const result = await commentsService.remove(id, user, userRoles);

      expect(commentsService.findOneBy).toHaveBeenCalledWith({ id });
      expect(commentsService.validatePiaAccess).toHaveBeenCalledWith(
        commentEntityMock.piaId,
        user,
        userRoles,
      );
      expect(commentRepository.save).toHaveBeenCalledWith({
        ...commentEntityMock,
        isActive: false,
        text: null,
      });

      expect(result).toEqual({
        ...commentROMock,
        isActive: false,
        text: null,
      });
    });
  });

  /**
   * @Description
   * These set of tests validates that the method passes the correct values to the repository,
   * resolves the comment,
   *
   * @method resolve
   */
  describe('`resolve` method', () => {
    // TO BE UPDATED
    /**
     * This test successfully resolves a comment
     *
     * @Input
     *   - commentId: number
     *
     * @Output
     *   - string
     */

    it('succeeds in resolving the comment', async () => {
      const id = 101;

      const result = await commentsService.resolve(id);

      expect(result).toBe(
        `This is a resolve method yet to be developed for comment ${id}`,
      );
    });
  });

  /**
   * @method validatePiaAccess
   */
  describe('`validatePiaAccess', () => {
    /**
     * This test validates that the method forwards the correct data to the piaService method
     *
     * @Input
     *   - piaId: number
     *   - user info mock
     *
     * @Output
     *   - void
     */
    it('succeeds forwarding correct data to the pia-service method', async () => {
      const piaId = 101;
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles: Array<RolesEnum> = [];

      piaService.findOneById = jest.fn(async () => {
        delay(10);
        return { ...piaIntakeEntityMock };
      });

      await commentsService.validatePiaAccess(piaId, user, userRoles);

      expect(piaService.findOneById).toBeCalledWith(piaId, user, userRoles);
    });
  });

  /**
   * @method findOneBy
   *
   * @description
   * These set of tests validates that comment is only returned when available
   */
  describe('`findOneBy` method', () => {
    // Scenario 1: Test fails when the record is not found in database
    it('fails when the record is not found in database', async () => {
      const id = 0; // assuming id does NOT exist in database

      commentRepository.findOneBy = jest.fn(async () => {
        delay(10);
        return null;
      });

      await expect(commentsService.findOneBy({ id })).rejects.toThrow(
        new NotFoundException(),
      );

      expect(commentRepository.findOneBy).toHaveBeenCalledWith({ id });
    });

    // Scenario 2: Test succeeds when the record is found in database
    it('succeeds when the record is found in database', async () => {
      const id = 1; // assuming id exists in database

      commentRepository.findOneBy = jest.fn(async () => {
        delay(10);
        return { ...commentEntityMock };
      });

      const result = await commentsService.findOneBy({ id });

      expect(commentRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(result).toEqual(commentEntityMock);
    });
  });
});

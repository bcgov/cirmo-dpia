import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RolesEnum } from 'src/common/enums/roles.enum';

import { keycloakUserMock } from 'test/util/mocks/data/auth.mock';
import { delay } from 'test/util/testUtils';
import { repositoryMock } from 'test/util/mocks/repository/repository.mock';
import { CommentsController } from 'src/modules/comments/comments.controller';
import { CommentsService } from 'src/modules/comments/comments.service';
import { CommentEntity } from 'src/modules/comments/entities/comment.entity';
import { commentsServiceMock } from 'test/util/mocks/services/comments.service.mock';
import { CreateCommentDto } from 'src/modules/comments/dto/create-comment.dto';
import {
  commentROMock,
  commentsCountROMock,
  createCommentDtoMock,
  findCommentsROMock,
} from 'test/util/mocks/data/comments.mock';
import { FindCommentsDto } from 'src/modules/comments/dto/find-comments.dto';
import { AllowedCommentPaths } from 'src/modules/comments/enums/allowed-comment-paths.enum';
import { FindCommentsCountDto } from 'src/modules/comments/dto/find-comments-count.dto';

/**
 * @Description
 * This file tests the contents of pia-intake.controller.ts
 */
describe('CommentsController', () => {
  let controller: CommentsController;
  let service: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        {
          provide: CommentsService,
          useValue: commentsServiceMock,
        },
        {
          provide: getRepositoryToken(CommentEntity),
          useValue: { ...repositoryMock },
        },
      ],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
    service = module.get<CommentsService>(CommentsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * @Description
   * Dummy test to check if the controller is defined
   */
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /**
   * @Description
   * This test suite validates that the method passes the correct passed values to the service,
   * mock the service result and return correct result to the user
   *
   * @method create
   */
  describe('`create` method', () => {
    /**
     * @Description
     * This test validates the happy flow if the method `commentsService.create` is called with correct mock data
     *
     * @Input
     *   - API data mock for creating comment
     *   - Mock user req
     *
     * @Output 201
     * Test pass and all methods called with correct data
     */
    it('succeeds with correct data : Happy flow', async () => {
      const createCommentDto: CreateCommentDto = { ...createCommentDtoMock };
      const mockReq: any = {
        user: { ...keycloakUserMock },
        userRoles: [],
      };

      service.create = jest.fn(async () => {
        delay(10);
        return commentROMock;
      });

      const result = await controller.create(createCommentDto, mockReq);

      expect(service.create).toHaveBeenCalledWith(
        createCommentDto,
        mockReq.user,
        mockReq.userRoles,
      );

      expect(result).toBe(commentROMock);
    });
  });

  /**
   * @Description
   * This test suite validates that the method passes the correct values to the service,
   * mock the service result and return filtered result to the user
   *
   * Supported Query params:
   *   - piaId: id of the PIA
   *   - path: path of the selected comment section
   *   - Mock user req
   *
   * @method find
   */
  describe('`find` method', () => {
    /**
     * @Description
     * This test validates the happy flow if the method `commentsService.findByPiaAndPath` is called with correct mock data
     *
     * @Input
     *   - Mock user req
     *   - query
     *
     * @Output 200
     * Test pass and all methods called with correct data
     */
    it('succeeds with correct data : Happy flow', async () => {
      const mockReq: any = {
        user: { ...keycloakUserMock },
        userRoles: [RolesEnum.MPO_CITZ],
      };
      const query: FindCommentsDto = {
        piaId: 101,
        path: AllowedCommentPaths['accuracyCorrectionAndRetention.accuracy'],
      };

      service.findByPiaAndPath = jest.fn(async () => {
        delay(10);
        return findCommentsROMock;
      });

      const result = await controller.find(query, mockReq);

      expect(service.findByPiaAndPath).toHaveBeenCalledWith(
        query.piaId,
        query.path,
        mockReq.user,
        mockReq.userRoles,
      );

      expect(result).toStrictEqual(findCommentsROMock);
    });
  });

  /**
   * @method findCommentsCount
   *
   * @description
   * This test suite validates that the method passes the correct values to the service,
   * mock the service result and return correct result to the user
   */
  describe('`findCommentsCount` method', () => {
    /**
     * @Description
     * This test validates if the method `commentsService.findCountByPia` is called with correct mock data
     *
     * @Input
     *  - pia id
     *  - mock user req
     *
     * @Output 200
     * Test pass and all methods called with correct data; and return the expected type of data
     */
    it('succeeds with correct data : Happy flow', async () => {
      const mockReq: any = {
        user: { ...keycloakUserMock },
        userRoles: [RolesEnum.MPO_CITZ],
      };

      const query: FindCommentsCountDto = {
        piaId: 101,
      };

      service.findCountByPia = jest.fn(async () => {
        delay(10);
        return commentsCountROMock;
      });

      const result = await controller.findCommentsCount(query, mockReq);

      expect(service.findCountByPia).toHaveBeenCalledWith(
        query.piaId,
        mockReq.user,
        mockReq.userRoles,
      );

      expect(result).toStrictEqual(commentsCountROMock);
    });
  });

  /**
   * @method remove
   *
   * @description
   * This test suite validates that the method passes the correct values to the service,
   * mock the service result and return correct result to the user
   */
  describe('`remove` method', () => {
    /**
     * @Description
     * This test validates if the method `service.remove` is called with correct mock data
     *
     * @Input
     *  - comment id
     *  - mock user req
     *
     * @Output 200
     * Test pass and all methods called with correct data
     */

    it('succeeds with correct data', async () => {
      const mockReq: any = {
        user: { ...keycloakUserMock },
        userRoles: [RolesEnum.MPO_CITZ],
      };

      const commentId = '101';

      service.remove = jest.fn(async () => {
        delay(10);
        return { ...commentROMock };
      });

      const result = await controller.remove(commentId, mockReq);

      expect(service.remove).toHaveBeenCalledWith(
        +commentId,
        mockReq.user,
        mockReq.userRoles,
      );

      expect(result).toStrictEqual(commentROMock);
    });
  });

  /**
   * @method resolve
   *
   * @TODO
   * This test is to be updated when we actually implement resolve
   *
   * @description
   * This test suite validates that the method passes the correct values to the service,
   * mock the service result and return correct result to the user
   */
  describe('`resolve` method', () => {
    /**
     * @Description
     * This test validates if the method `service.resolve` is called with correct mock data
     *
     * @Input
     *  - comment id
     *  - mock user req
     *
     * @Output 200
     * Test pass and all methods called with correct data
     */

    it('succeeds with correct data', async () => {
      const commentId = '101';

      service.resolve = jest.fn(async () => {
        delay(10);
        return null;
      });

      await controller.resolve(commentId);

      expect(service.resolve).toHaveBeenCalledWith(+commentId);
    });
  });
});

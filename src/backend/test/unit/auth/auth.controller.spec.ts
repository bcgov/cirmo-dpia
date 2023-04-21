import { HttpModule } from '@nestjs/axios';
import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { delay } from 'rxjs';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthService } from 'src/modules/auth/auth.service';
import { AppTokensDto } from 'src/modules/auth/dto/app-tokens.dto';
import {
  appTokensDtoMock,
  keycloakUserMock,
} from 'test/util/mocks/data/auth.mock';
import { authServiceMock } from 'test/util/mocks/services/auth.service.mock';

/**
 * @Description
 * This file tests the contents of auth.controller.ts
 */
describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  /**
   * @Description
   * Dummy test to check if the controller and service is defined
   */
  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  /**
   * @Description
   * This test suite validates that the method will get correct OAuth server URL from the service,
   * mock the service result and return correct result to the user
   *
   * @method login
   */
  describe('login', () => {
    /**
     * @Description
     * This test validates the happy flow if the method `authService.login` is called with correct mock data
     *
     * @Input
     *   - empty input
     *
     * @Output 200
     * it should return the OAuth server URL
     */
    it('should call the getUrlLogin method of the AuthService', () => {
      const urlLogin = 'https://example.com/login';
      service.getUrlLogin = jest.fn().mockReturnValue({ url: urlLogin });

      expect(controller.login()).toEqual({ url: urlLogin });
      expect(service.getUrlLogin).toHaveBeenCalled();
    });
  });

  describe('getAccessToken', () => {
    /**
     * @Description
     * This test validates the happy flow if the method `authService.getAccessToken` is called with correct mock data
     *
     * @Input
     *   - Authorization code
     *
     * @Output 201
     * it should return the access token (that from Oauth server bc gov keycloak server) to the user
     */
    it('should call the getAccessToken method of the AuthService', async () => {
      const code = 'sample_code';
      const keycloakToken = { access_token: 'access_token' };

      service.getAccessToken = jest.fn().mockResolvedValue(keycloakToken);

      expect(await controller.getAccessToken(code)).toEqual(keycloakToken);
      expect(service.getAccessToken).toHaveBeenCalledWith(code);
    });

    /**
     * @Description
     * This test validates the non-happy flow if the request does not have code
     *
     * @Input
     *   - empty input
     *
     * @Output 200
     * it should return without any data
     */
    it('should return if no code provide from request', async () => {
      const code = '';
      expect(await controller.getAccessToken(code)).toBeUndefined();
      expect(service.getAccessToken).not.toHaveBeenCalled();
    });
  });

  describe('getUserInfo', () => {
    /**
     * @Description
     * This test validates the non happy flow if the method `controller.getUserInfo` is called with incorrect mock data
     *
     * @Input
     *   - accessToken
     *   - request
     *
     * @Output 200
     * it should return without any data
     */
    it('should return if authorization does not use bearer ', async () => {
      const accessToken = 'sample_access_token';
      const req = { headers: { authorization: `xxxxx ${accessToken}` } };

      expect(await controller.getUserInfo(req)).toBeUndefined();
      expect(service.getUserInfo).not.toHaveBeenCalled();
    });
    /**
     * @Description
     * This test validates the happy flow if the method `authService.getUserInfo` is called with correct mock data
     *
     * @Input
     *   -Request
     *
     * @Output 200
     * it should return kcUserInfo
     */
    it('should call the getUserInfo method of the AuthService', async () => {
      const accessToken = 'sample_access_token';
      const kcUserInfo = { ...keycloakUserMock };

      service.getUserInfo = jest.fn(async () => {
        delay(10);
        return kcUserInfo;
      });
      const req = { headers: { authorization: `Bearer ${accessToken}` } };

      expect(await controller.getUserInfo(req)).toEqual(kcUserInfo);
      expect(service.getUserInfo).toHaveBeenCalledWith(accessToken);
    });
  });

  describe('refreshAccessToken', () => {
    /**
     * @Description
     * This test validates the happy flow if the method `authService.refreshAccessToken` is called with correct mock data
     *
     * @Input
     *   - AppTokensDto
     *
     * @Output 200
     * it should return the new access token
     */
    it('should call the refreshAccessToken method of the AuthService', async () => {
      const appTokensDto: AppTokensDto = {
        ...appTokensDtoMock,
      };
      const newAccessToken = 'new_access_token';

      service.refreshAccessToken = jest.fn().mockResolvedValue(newAccessToken);

      expect(await controller.refreshAccessToken(appTokensDto)).toEqual(
        newAccessToken,
      );
      expect(service.refreshAccessToken).toHaveBeenCalledWith(
        appTokensDto.refresh_token,
      );
    });
    /**
     * @Description
     * This test validates the non-happy flow if the method `authService.refreshAccessToken` is failed with http exception
     *
     * @Input
     *   - AppTokensDto
     *
     * @Output 400
     * it should throw httpException when service method failed with httpException
     */
    it('should throw HttpException when AuthService throws HttpException', async () => {
      const appTokensDto: AppTokensDto = {
        ...appTokensDtoMock,
      };

      const httpException = new HttpException('Token failed', 400);
      jest.spyOn(service, 'refreshAccessToken').mockImplementation(() => {
        throw httpException;
      });

      try {
        await controller.refreshAccessToken(appTokensDto);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toBe(' Token failed');
        expect(error.getStatus()).toBe(400);
      }
    });
    /**
     * @Description
     * This test validates the non-happy flow if the method `authService.refreshAccessToken` is failed with exception
     *
     * @Input
     *   - AppTokensDto
     *
     * @Output 500
     * it should return the InternalServerErrorException when service method failed
     */
    it('should throw InternalServerErrorException when AuthService throws a non-HttpException', async () => {
      const appTokensDto: AppTokensDto = {
        ...appTokensDtoMock,
      };

      jest.spyOn(service, 'refreshAccessToken').mockImplementation(() => {
        throw new Error('Some error');
      });
      try {
        await controller.refreshAccessToken(appTokensDto);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.message).toBe('Refresh Token failed');
      }
    });
  });

  describe('logout', () => {
    /**
     * @Description
     * This test validates the happy flow if the method `authService.logout` is called with correct mock data
     *
     * @Input
     *   - AppTokensDto
     *
     * @Output 200
     *   - no output
     */
    it('should call the logout method of the AuthService', async () => {
      const appTokensDto: AppTokensDto = { ...appTokensDtoMock };

      service.logout = jest.fn().mockResolvedValue(undefined);

      await controller.logout(appTokensDto);
      expect(service.logout).toHaveBeenCalledWith(appTokensDto.refresh_token);
    });
    /**
     * @Description
     * This test validates the happy flow if the method `authService.logout` is failed with http exception
     *
     * @Input
     *   - AppTokensDto
     *
     * @Output 400
     * it should return the http exception when service method failed
     */
    it('should throw HttpException when authService.logout() throws HttpException', async () => {
      const appTokensDto: AppTokensDto = { ...appTokensDtoMock };
      const httpException = new HttpException('Logout failed', 400);
      service.logout = jest.fn().mockRejectedValue(httpException);
      await expect(controller.logout(appTokensDto)).rejects.toThrowError(
        httpException,
      );
      expect(service.logout).toHaveBeenCalledWith(appTokensDto.refresh_token);
    });
    /**
     * @Description
     * This test validates the non-happy flow if the method `authService.logout` is throw exception
     *
     * @Input
     *   - AppTokensDto
     *
     * @Output 500
     * it should return the InternalServerErrorException
     */
    it('should throw InternalServerErrorException when authService.logout() throws other errors', async () => {
      service.logout = jest
        .fn()
        .mockRejectedValue(new Error('Some other error'));
      const appTokensDto: AppTokensDto = { ...appTokensDtoMock };
      await expect(controller.logout(appTokensDto)).rejects.toThrowError(
        InternalServerErrorException,
      );
      expect(service.logout).toHaveBeenCalledWith(appTokensDto.refresh_token);
    });
  });
});

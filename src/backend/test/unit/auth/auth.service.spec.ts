import { HttpModule, HttpService } from '@nestjs/axios';
import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of, throwError } from 'rxjs';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthService } from 'src/modules/auth/auth.service';
import { KeycloakToken } from 'src/modules/auth/keycloack-token.model';
import { KeycloakUser } from 'src/modules/auth/keycloak-user.model';
import { keycloakUserMock } from 'test/util/mocks/data/auth.mock';

describe('AuthService', () => {
  let service: AuthService;
  let httpService: HttpService;
  let consoleErrorSpy: jest.SpyInstance;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    httpService = module.get<HttpService>(HttpService);
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(httpService).toBeDefined();
  });

  describe('getAccessToken', () => {
    it('should get access token', async () => {
      const code = 'sample_code';
      const keycloakToken = new KeycloakToken(
        'access_token',
        'refresh_token',
        '300',
        '1800',
      );

      const response: any = {
        data: keycloakToken,
        status: 200,
        statusText: 'OK',
        config: {},
        headers: {},
      };

      jest
        .spyOn(httpService, 'post')
        .mockImplementationOnce(() => of(response));

      const result = await service.getAccessToken(code);
      expect(result).toEqual(keycloakToken);
    });
  });

  describe('getUserInfo', () => {
    it('should get user info', async () => {
      const accessToken = 'sample_access_token';
      const keycloakUser: KeycloakUser = {
        ...keycloakUserMock,
      };

      const response: any = {
        data: keycloakUser,
        status: 200,
        statusText: 'OK',
        config: {},
        headers: {},
      };

      jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));

      const result = await service.getUserInfo(accessToken);
      expect(result).toEqual(keycloakUser);
    });
  });

  describe('refreshAccessToken', () => {
    it('should refresh access token', async () => {
      const refreshToken = 'sample_refresh_token';
      const keycloakToken = new KeycloakToken(
        'new_access_token',
        'new_refresh_token',
        '300',
        '1800',
      );

      const response: any = {
        data: keycloakToken,
        status: 200,
        statusText: 'OK',
        config: {},
        headers: {},
      };

      jest
        .spyOn(httpService, 'post')
        .mockImplementationOnce(() => of(response));

      const result = await service.refreshAccessToken(refreshToken);
      expect(result).toEqual(keycloakToken);
    });
  });

  describe('logout', () => {
    it('should logout user', async () => {
      const refreshToken = 'sample_refresh_token';

      const response: any = {
        data: null,
        status: 204,
        statusText: 'No Content',
        config: {},
        headers: {},
      };

      jest
        .spyOn(httpService, 'post')
        .mockImplementationOnce(() => of(response));

      await expect(service.logout(refreshToken)).resolves.toBeNull();
    });

    it('should throw HttpException with 500 status when httpService.post throws other errors', async () => {
      const error: any = {
        message: JSON.stringify(new Error('Some other error')),
        AxiosError: true,
      };
      const mockRefreshToken = 'sample_refresh_token';
      jest
        .spyOn(httpService, 'post')
        .mockReturnValueOnce(throwError(() => error));

      await expect(service.logout(mockRefreshToken)).rejects.toThrowError(
        HttpException,
      );

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'auth.service.ts:logout:data',
        'Error data unknown, Something Went wrong',
        500,
      );
      expect(httpService.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining(`refresh_token=${mockRefreshToken}`),
        expect.any(Object),
      );
    });
  });
});

import { HttpModule, HttpService } from '@nestjs/axios';
import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of, throwError } from 'rxjs';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthService } from 'src/modules/auth/auth.service';
import { KeycloakToken } from 'src/modules/auth/keycloack-token.model';
import { KeycloakUser } from 'src/modules/auth/keycloak-user.model';
import { keycloakUserMock } from 'test/util/mocks/data/auth.mock';

/**
 * @Description
 * This file tests the contents of auth.service.ts
 */
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

  /**
   * @Description
   * Dummy test to check if the service is defined
   */
  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(httpService).toBeDefined();
  });

  describe('getLoginURL', () => {
    /**
     * This test validates that the it can return correct OAuth login URL.
     *
     * @Input
     *   - empty
     *
     *
     * @Output
     *   - an object containing url
     */
    it('should return the correct login URL', () => {
      // due to we initialize the url when we construct the auth service, so I do not mock this value
      const expectedUrl = `https://dev.loginproxy.gov.bc.ca/auth/realms/standard/protocol/openid-connect/auth?client_id=digital-privacy-impact-assessment-modernization-3937&response_type=code&scope=openid idir&redirect_uri=http://localhost:8080/ppq`;
      const result = service.getUrlLogin();
      expect(result.url).toEqual(expectedUrl);
    });
  });

  describe('getAccessToken', () => {
    /**
     * This test validates that the it can get access token correctly from OAuth server(bc keycloak instance).
     *
     * @Input
     *   - authorization code
     *
     *
     * @Output
     *   - an object containing keycloakToken information
     */
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
    /**
     * This test exception handle when get error from OAuth server(bc keycloak instance).
     *
     * @Input
     *   - authorization code
     *
     *
     * @Output
     *   - an http exception
     */
    it('should throw HttpException when httpService returns an error', async () => {
      const mockError = {
        response: {
          data: 'Error message',
          status: 400,
        },
      };
      jest
        .spyOn(httpService, 'post')
        .mockReturnValue(throwError(() => mockError));

      await expect(service.getAccessToken('dummy_code')).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('getUserInfo', () => {
    /**
     * This test validates that the it can get user information correctly from OAuth server(bc keycloak instance) by using valid access token.
     *
     * @Input
     *   - access token
     *
     *
     * @Output
     *   - an object containing keycloakUser information
     */
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
    /**
     * This test validates that the it throw http exception when got error from OAuth server(bc keycloak instance) by using valid access token.
     *
     * @Input
     *   - access token
     *
     *
     * @Output
     *   - a http exception
     */
    it('should throw HttpException when httpService returns an error', async () => {
      const mockError = {
        response: {
          data: 'Error message',
          status: 400,
        },
      };
      jest
        .spyOn(httpService, 'get')
        .mockReturnValue(throwError(() => mockError));

      await expect(service.getUserInfo('dummy_code')).rejects.toThrow(
        HttpException,
      );
    });
  });

  describe('refreshAccessToken', () => {
    /**
     * This test validates that the it can get new access token correctly from OAuth server(bc keycloak instance) by using valid refresh token.
     *
     * @Input
     *   - refreshToken
     *
     *
     * @Output
     *   - a new keycloakToken object
     */
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
    /**
     * This test validates that the it should throw exception when get error from OAuth server(bc keycloak instance)
     *
     * @Input
     *   - refreshToken
     *
     *
     * @Output
     *   - a HttpException object
     */
    it('should throw HttpException with 500 status when httpService.post throws other errors', async () => {
      const error: any = {
        message: JSON.stringify(new Error('Some other error')),
        AxiosError: true,
      };
      const mockRefreshToken = 'sample_refresh_token';
      jest
        .spyOn(httpService, 'post')
        .mockReturnValueOnce(throwError(() => error));

      await expect(
        service.refreshAccessToken(mockRefreshToken),
      ).rejects.toThrowError(HttpException);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'auth.service.ts:refreshAccessToken:data',
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

  describe('logout', () => {
    /**
     * This test validates that the it should successful logout from OAuth server(bc keycloak instance)
     *
     * @Input
     *   - refreshToken
     *
     *
     * @Output
     *   - empty output
     */
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
    /**
     * This test validates that the it should throw exception when got error logout from OAuth server(bc keycloak instance)
     *
     * @Input
     *   - refreshToken
     *
     *
     * @Output
     *   - an http exception
     */
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

import { HttpModule, HttpService } from '@nestjs/axios';
import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of, throwError } from 'rxjs';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthService } from 'src/modules/auth/auth.service';
import { KeycloakToken } from 'src/modules/auth/keycloack-token.model';
import { KeycloakUser } from 'src/modules/auth/keycloak-user.model';
import { keycloakUserMock } from 'test/util/mocks/data/auth.mock';
import { configService, ConfigServiceClass } from 'src/config/config.service';
/**
 * @Description
 * This file tests the contents of auth.service.ts
 */
describe('AuthService', () => {
  let service: AuthService;
  let httpService: HttpService;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(async () => {
    const configServiceMock = new ConfigServiceClass({
      KEYCLOAK_CLIENT_ID: 'myclientid',
      KEYCLOAK_CLIENT_SECRET: 'myclientsecret',
      KEYCLOAK_REDIRECT_URI: 'https://app.example.com/callback',
      KEYCLOAK_TOKEN_URI:
        'https://auth.example.com/realms/myrealm/protocol/openid-connect/token',

      KEYCLOAK_AUTH_SERVER_URI: 'https://app.example.com/oauth',
      KEYCLOAK_RESPONSE_TYPE: 'idir',
      KEYCLOAK_SCOPE: 'scope',
      KEYCLOAK_REALM: 'realm',
      KEYCLOAK_USER_INFO_URI: 'https://app.example.com/user',
      KEYCLOAK_LOGOUT_URI: 'https://app.example.com/logout',
      SITEMINDER_LOGOUT_URI: 'https://siteminder.example.com/logoff',
    });
    jest
      .spyOn(configService, 'getValue')
      .mockImplementation((key) => configServiceMock.getValue(key));
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    httpService = module.get<HttpService>(HttpService);
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
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
      const expectedUrl = `https://app.example.com/oauth/realms/realm/protocol/openid-connect/auth?client_id=myclientid&response_type=idir&scope=scope&redirect_uri=https://app.example.com/callback`;
      expect(configService.getValue).toHaveBeenCalledTimes(11);
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
        '500',
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
        '500',
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

  describe('getLogoutURL', () => {
    /**
     * This test validates that the it can return correct OAuth logout URL.
     *
     * @Input
     *   - empty
     *
     *
     * @Output
     *   - an object containing url
     */
    it('should return the correct login URL', () => {
      const idToken = '500';
      const redirectUrl = 'https://app.example.com';

      const expectedKCUrl = encodeURIComponent(
        `https://app.example.com/logout?id_token_hint=${idToken}&post_logout_redirect_uri=${redirectUrl}`,
      );
      const expectedSMUrl =
        'https://siteminder.example.com/logoff?retnow=1&returl=';

      expect(configService.getValue).toHaveBeenCalledTimes(11);
      const result = service.getUrlLogout(idToken, redirectUrl);
      expect(result.siteMinderUrl).toEqual(expectedSMUrl);
      expect(result.keycloakUrl).toEqual(expectedKCUrl);
    });
  });
});

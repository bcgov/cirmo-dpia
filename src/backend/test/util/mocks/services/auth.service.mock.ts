import { keycloakUserMock } from '../data/auth.mock';

export const authServiceMock = {
  getUrlLogin: jest.fn(),
  getAccessToken: jest.fn(),
  getUserInfo: jest.fn(() => ({ ...keycloakUserMock })),
  refreshAccessToken: jest.fn(),
  logout: jest.fn(),
  getContentType: jest.fn(),
};

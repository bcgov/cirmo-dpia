import { API_ROUTES } from '../constant/apiRoutes';
import { IKeycloakToken } from '../types/interfaces/keyCloakToken.interface';
import { HttpRequest } from './http-request.util';

export const getAccessToken = async (code: string | null) => {
  if (!code) return;

  const res = await HttpRequest.post<IKeycloakToken>(
    `/${API_ROUTES.KEYCLOAK_CALLBACK}`,
    { code: code },
    {},
    {},
    false,
  );
  return res;
};

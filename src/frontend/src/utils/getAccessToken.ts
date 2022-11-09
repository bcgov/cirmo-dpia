import { API_ROUTES } from '../constant/apiRoutes';
import { IKeycloakToken } from '../ts/interfaces/keyCloakToken.interface';
import { HttpRequest } from './http-request.util';

export const getAccessToken = async (code: string | null) => {
  if (!code) return;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, // by default setting the content-type to be json type
    body: JSON.stringify({ code: code }),
  };
  /*
  try {
    const res = await HttpRequest.post<IKeycloakToken>(
      `/${API_ROUTES.KEYCLOAK_CALLBACK}`,
      options,
    );
    return res;
    // setKeycloakToken(res);
    return;
  } catch (err) {
    throw new Error('get access code failed');
  }
*/

  const res = await fetch(`/${API_ROUTES.KEYCLOAK_CALLBACK}`, options);
  return res;
};

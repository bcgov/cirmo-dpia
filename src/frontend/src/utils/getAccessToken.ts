import { API_ROUTES } from '../constant/apiRoutes';

export const getAccessToken = async (code: string | null) => {
  if (!code) return;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }, // by default setting the content-type to be json type
    body: JSON.stringify({ code: code }),
  };
  const res = await fetch(`/${API_ROUTES.KEYCLOAK_CALLBACK}`, options);
  return res;
};

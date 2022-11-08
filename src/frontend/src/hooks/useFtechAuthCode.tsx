import { useEffect, useState } from 'react';
import { API_ROUTES } from '../constant/apiRoutes';
import { IKeycloakToken } from '../ts/interfaces/keyCloakToken.interface';

export const useFetchAuthCode = (code: string | null) => {
  const [keycloakToken, setKeycloakToken] = useState<IKeycloakToken>();
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!code) return;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // by default setting the content-type to be json type
      body: JSON.stringify({ code: code }),
    };
    /* try {
        
        const res = await HttpRequest.post<IKeycloakToken>(
          `/${API_ROUTES.KEYCLOAK_CALLBACK}`,
          options,
        );
        setKeycloakToken(res);
      } catch (err) {
        setError(err);
      }
        };
      */
    fetch(`/${API_ROUTES.KEYCLOAK_CALLBACK}`, options)
      .then((response) => response.json())
      .then((data) => {
        setKeycloakToken(data);
      })
      .catch((err) => setError(err));

    // fetchFunc();
  }, [code]);
  return { keycloakToken, error };
};

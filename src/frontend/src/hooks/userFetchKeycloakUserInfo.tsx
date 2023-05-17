import { useEffect, useState } from 'react';
import { API_ROUTES } from '../constant/apiRoutes';
import { IKeycloakUserInfo } from '../types/interfaces/keycloakUserInfo.interface';

export const useFetchKeycloakUserInfo = (accessToken: string | null) => {
  const [keycloakUserDetail, setKeycloakUserDetail] =
    useState<IKeycloakUserInfo>();
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!accessToken) return;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    };
    fetch(API_ROUTES.KEYCLOAK_USER, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error != null) {
          setError(data);
        } else {
          setKeycloakUserDetail(data);
        }
      })
      .catch((err) => setError(err));
  }, [accessToken]);
  return { keycloakUserDetail, error };
};

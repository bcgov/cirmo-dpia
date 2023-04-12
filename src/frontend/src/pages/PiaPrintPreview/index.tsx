import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Spinner from '../../components/common/Spinner';
import { API_ROUTES } from '../../constant/apiRoutes';
import {
  IPiaForm,
  IPiaFormResponse,
} from '../../types/interfaces/pia-form.interface';
import { HttpRequest } from '../../utils/http-request.util';

export const PiaPrintPreview = () => {
  const { id } = useParams();

  const [pia, setPia] = useState<IPiaForm>();

  useEffect(() => {
    if (!id) return;

    HttpRequest.get<IPiaFormResponse>(
      API_ROUTES.GET_PIA_INTAKE.replace(':id', `${id}`),
    ).then(({ data }) => {
      setPia(data);
      window.print();
    });
  }, [id]);

  return (
    <>
      {id && pia && <Outlet context={[pia, () => {}, true, () => null, {}]} />}
      {(!id || !pia) && <Spinner />}
    </>
  );
};

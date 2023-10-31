import { useCallback, useEffect, useState } from 'react';
import {
  IPiaForm,
  IPiaFormResponse,
} from '../types/interfaces/pia-form.interface';
import { ILastSaveAlterInfo } from '../pages/PIAForm/helpers/interfaces';
import { getShortTime } from './date';
import { HttpRequest } from './http-request.util';
import { API_ROUTES } from '../constant/apiRoutes';
import { useLocation, useNavigate } from 'react-router-dom';
import { buildDynamicPath } from './path';
import { deepEqual } from './object-comparison.util';
import useSnowPlow from './snowplow';
import { PiaStatuses } from '../constant/constant';
import useHandleModal from '../pages/PIAForm/utils/handleModal';

const useAutoSave = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  // Define initial state
  const emptyState: IPiaForm = {
    hasAddedPiToDataElements: true,
    status: PiaStatuses.DRAFTING_IN_PROGRESS,
  };

  // Define state variables
  const [pia, setPia] = useState(emptyState);
  const [stalePia, setStalePia] = useState(emptyState);
  const [isEagerSave, setIsEagerSave] = useState(false);
  const [isConflict, setIsConflict] = useState(false);
  const [isFirstSave, setIsFirstSave] = useState(true);
  const [isValidationFailed, setIsValidationFailed] = useState(false);
  const [isAutoSaveFailedPopupShown, setIsAutoSaveFailedPopupShown] =
    useState(false);
  const [lastSaveAlertInfo, setLastSaveAlertInfo] =
    useState<ILastSaveAlterInfo>({
      message: '',
      type: 'success',
      show: false,
    });

  // Initialize Snowplow tracking
  const { sendSnowplowStatusChangeCall } = useSnowPlow({ pia });

  // Check if form has changed
  const hasFormChanged = useCallback(
    () => !deepEqual(stalePia, pia, ['updatedAt', 'saveId']),
    [pia, stalePia],
  );

  // Upsert and update PIA form
  const upsertAndUpdatePia = async (changes: Partial<IPiaForm> = {}) => {
    const hasExplicitChanges = Object.keys(changes).length > 0;
    if (!hasExplicitChanges && !hasFormChanged()) return pia;

    if (changes.status !== undefined && pia.status !== changes.status) {
      sendSnowplowStatusChangeCall(true);
    }

    const apiUrl = pia?.id
      ? API_ROUTES.PATCH_PIA_INTAKE.replace(':id', `${pia.id}`)
      : API_ROUTES.PIA_INTAKE;
    const requestData = { ...pia, ...changes };
    const updatedPia = pia?.id
      ? await HttpRequest.patch<IPiaForm>(apiUrl, requestData)
      : await HttpRequest.post<IPiaForm>(apiUrl, requestData);

    // Show success message
    setLastSaveAlertInfo({
      type: 'success',
      message: `Saved at ${getShortTime(updatedPia.updatedAt)}.`,
      show: true,
    });

    // Update stale PIA form
    if (isFirstSave) {
      setStalePia(updatedPia);
      setIsFirstSave(false);
      if (!pia?.id) {
        navigate(
          buildDynamicPath(pathname.replace('/view', '/edit'), {
            id: updatedPia.id,
          }),
        );
      }
    } else {
      setStalePia(pia);
    }

    // Update PIA form and reset state variables
    setPia(updatedPia);
    setIsAutoSaveFailedPopupShown(false);
    setIsConflict(false);

    return updatedPia;
  };

  // Handle modals
  const { handleShowModal } = useHandleModal({ pia, upsertAndUpdatePia });

  // Fetch and update PIA form
  const fetchAndUpdatePia = async (piaId: string) => {
    const currentPia = pia;
    const updatedPia = (
      await HttpRequest.get<IPiaFormResponse>(
        API_ROUTES.GET_PIA_INTAKE.replace(':id', `${piaId}`),
        {},
        {},
        true,
        { invite: search.split('=')[1] },
      )
    ).data;
    setStalePia(currentPia);
    setPia(updatedPia);
    setIsValidationFailed(
      updatedPia.branch === null ||
        updatedPia.branch === '' ||
        updatedPia.ministry === null ||
        updatedPia.title === null ||
        updatedPia.title === '' ||
        updatedPia.initiativeDescription === null ||
        updatedPia.initiativeDescription === '',
    );

    return updatedPia;
  };

  // Auto-save PIA form
  useEffect(() => {
    const autoSave = async () => {
      setIsEagerSave(false);
      if (isConflict) return;

      try {
        await upsertAndUpdatePia();
      } catch (e: any) {
        const message = `Unable to auto-save. Last saved at ${getShortTime(
          pia.updatedAt,
        )}.`;
        const causeStatus = e?.cause?.status;
        setLastSaveAlertInfo({ type: 'danger', message, show: true });
        if (causeStatus === 409) {
          setIsConflict(true);
          handleShowModal('conflict', e?.cause?.data?.updatedByDisplayName);
        } else if (!isAutoSaveFailedPopupShown) {
          handleShowModal('autoSaveFailed');
          setIsAutoSaveFailedPopupShown(true);
        }
      }
    };

    if (isEagerSave) {
      autoSave();
    } else {
      const autoSaveTimer = setTimeout(() => {
        autoSave();
      }, 3000);

      return () => clearTimeout(autoSaveTimer);
    }
  });

  // Return state variables and functions
  return {
    setIsEagerSave,
    isEagerSave,
    isConflict,
    setIsConflict,
    lastSaveAlertInfo,
    setLastSaveAlertInfo,
    getShortTime,
    isAutoSaveFailedPopupShown,
    setIsAutoSaveFailedPopupShown,
    isFirstSave,
    setIsFirstSave,
    stalePia,
    setStalePia,
    hasFormChanged,
    upsertAndUpdatePia,
    fetchAndUpdatePia,
    isValidationFailed,
    setIsValidationFailed,
    pia,
    setPia,
  };
};

export default useAutoSave;

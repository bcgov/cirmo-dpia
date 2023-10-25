import { useCallback, useEffect, useState } from 'react';
import { IPiaForm } from '../types/interfaces/pia-form.interface';
import { ILastSaveAlterInfo } from '../pages/PIAForm/helpers/interfaces';
import { getShortTime } from './date';
import { HttpRequest } from './http-request.util';
import { API_ROUTES } from '../constant/apiRoutes';
import { NavigateFunction } from 'react-router-dom';
import { buildDynamicPath } from './path';
import { deepEqual } from './object-comparison.util';

// Define the props for the `useAutoSave` hook
type AutoSaveProps = {
  pia: IPiaForm;
  handleShowModal: (modalType: string, optionalData?: any) => void;
  sendSnowplowStatusChangeCall: (completedStatus?: boolean) => void;
  navigate: NavigateFunction;
  pathname: string;
  emptyState: IPiaForm;
  setPia: React.Dispatch<React.SetStateAction<IPiaForm>>;
};

const useAutoSave = ({
  pia,
  handleShowModal,
  sendSnowplowStatusChangeCall,
  navigate,
  pathname,
  emptyState,
  setPia,
}: AutoSaveProps) => {
  const [stalePia, setStalePia] = useState(emptyState);
  const [isEagerSave, setIsEagerSave] = useState(false);
  const [isConflict, setIsConflict] = useState(false);
  const [isFirstSave, setIsFirstSave] = useState(true);
  const [isAutoSaveFailedPopupShown, setIsAutoSaveFailedPopupShown] =
    useState<boolean>(false);
  const [lastSaveAlertInfo, setLastSaveAlertInfo] =
    useState<ILastSaveAlterInfo>({
      message: '',
      type: 'success',
      show: false,
    });

  const hasFormChanged = useCallback(() => {
    return !deepEqual(stalePia, pia, ['updatedAt', 'saveId']);
  }, [pia, stalePia]);

  const upsertAndUpdatePia = async (changes: Partial<IPiaForm> = {}) => {
    const hasExplicitChanges = Object.keys(changes).length > 0;

    if (!hasExplicitChanges && !hasFormChanged()) return pia;

    // Notify snowplow if status changed
    if (changes.status !== undefined && pia.status !== changes.status) {
      sendSnowplowStatusChangeCall(true);
    }

    // Perform the HTTP request
    const apiUrl = pia?.id
      ? API_ROUTES.PATCH_PIA_INTAKE.replace(':id', `${pia.id}`)
      : API_ROUTES.PIA_INTAKE;
    const requestData = { ...pia, ...changes };

    const updatedPia = pia?.id
      ? await HttpRequest.patch<IPiaForm>(apiUrl, requestData)
      : await HttpRequest.post<IPiaForm>(apiUrl, requestData);

    // Update last saved alert info
    setLastSaveAlertInfo({
      type: 'success',
      message: `Saved at ${getShortTime(updatedPia.updatedAt)}.`,
      show: true,
    });

    // Handle first-time save
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

    // Update the state and reset flags
    setPia(updatedPia);
    setIsAutoSaveFailedPopupShown(false);
    setIsConflict(false);

    return updatedPia;
  };
  // Define the `autoSave` function
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
        setLastSaveAlertInfo({
          type: 'danger',
          message,
          show: true,
        });
        // Handle the error if the update fails
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
  };
};

export default useAutoSave;

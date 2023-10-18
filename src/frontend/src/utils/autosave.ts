import { useEffect, useCallback, Dispatch, SetStateAction } from 'react';
import { IPiaForm } from '../types/interfaces/pia-form.interface';
import { ILastSaveAlterInfo } from '../pages/PIAForm';

// Define the type for the `SetState` function
type SetState<T> = Dispatch<SetStateAction<T>>;

// Define the props for the `useAutoSave` hook
type AutoSaveProps = {
  setIsEagerSave: SetState<boolean>;
  isEagerSave: boolean;
  isConflict: boolean;
  setIsConflict: SetState<boolean>;
  getShortTime: (date?: Date) => string;
  upsertAndUpdatePia: (changes?: Partial<IPiaForm>) => Promise<IPiaForm>;
  pia: IPiaForm;
  setLastSaveAlertInfo: SetState<ILastSaveAlterInfo>;
  handleShowModal: (modalType: string, optionalData?: any) => void;
  isAutoSaveFailedPopupShown: boolean;
  setIsAutoSaveFailedPopupShown: SetState<boolean>;
};

const useAutoSave = ({
  setIsEagerSave,
  isEagerSave,
  isConflict,
  setIsConflict,
  getShortTime,
  upsertAndUpdatePia,
  pia,
  setLastSaveAlertInfo,
  handleShowModal,
  isAutoSaveFailedPopupShown,
  setIsAutoSaveFailedPopupShown,
}: AutoSaveProps) => {
  // Define the `autoSave` function
  const autoSave = useCallback(async () => {
    setIsEagerSave(false);
    if (isConflict) return;

    try {
      await upsertAndUpdatePia(); // Update the PIA form
    } catch (e: any) {
      const message = `Unable to auto-save. Last saved at ${getShortTime(
        pia.updatedAt,
      )}.`;
      const causeStatus = e?.cause?.status;
      if (causeStatus === 409) {
        setIsConflict(true);
        handleShowModal('conflict', e?.cause?.data?.updatedByDisplayName);
      } else if (!isAutoSaveFailedPopupShown) {
        handleShowModal('autoSaveFailed');
        setIsAutoSaveFailedPopupShown(true);
      }
      setLastSaveAlertInfo({
        type: 'danger',
        message,
        show: true,
      });
    }
  }, [
    setIsEagerSave,
    isConflict,
    setIsConflict,
    getShortTime,
    upsertAndUpdatePia,
    pia,
    setLastSaveAlertInfo,
    handleShowModal,
    isAutoSaveFailedPopupShown,
    setIsAutoSaveFailedPopupShown,
  ]);

  // Define the autoSaveTimer useEffect
  useEffect(() => {
    const autoSaveTimer = isEagerSave ? 0 : 500;

    const timerId = setTimeout(autoSave, autoSaveTimer);

    return () => clearTimeout(timerId);
  }, [isEagerSave, autoSave]);
};

export default useAutoSave;

import { useEffect, Dispatch, SetStateAction } from 'react';
import { IPiaForm } from '../types/interfaces/pia-form.interface';
import { ILastSaveAlterInfo } from '../pages/PIAForm/helpers/interfaces';

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
      }, 1500);

      return () => clearTimeout(autoSaveTimer);
    }
  }, [
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
  ]);
};

export default useAutoSave;

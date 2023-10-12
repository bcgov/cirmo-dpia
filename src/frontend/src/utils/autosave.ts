import { useEffect, useCallback } from 'react';
import { IPiaForm } from '../types/interfaces/pia-form.interface';
import { SupportedAlertTypes } from '../components/common/Alert/interfaces';

type AutoSaveProps = {
  setIsEagerSave: React.Dispatch<React.SetStateAction<boolean>>;
  isEagerSave: boolean;
  isConflict: boolean;
  setIsConflict: React.Dispatch<React.SetStateAction<boolean>>;
  getShortTime: (date?: Date) => string;
  upsertAndUpdatePia: (changes?: Partial<IPiaForm>) => Promise<IPiaForm>;
  pia: IPiaForm;
  setLastSaveAlertInfo: React.Dispatch<
    React.SetStateAction<ILastSaveAlterInfo>
  >;
  handleShowModal: (modalType: string, optionalData?: any) => void;
  isAutoSaveFailedPopupShown: boolean;
  setIsAutoSaveFailedPopupShown: React.Dispatch<React.SetStateAction<boolean>>;
};

interface ILastSaveAlterInfo {
  message: string;
  type: SupportedAlertTypes;
  show: boolean;
}

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
  const autoSave = useCallback(async () => {
    setIsEagerSave(false);
    if (isConflict) return;

    try {
      await upsertAndUpdatePia();
    } catch (e: any) {
      setLastSaveAlertInfo({
        type: 'danger',
        message: `Unable to auto-save. Last saved at ${getShortTime(
          pia.updatedAt,
        )}.`,
        show: true,
      });
      if (e?.cause?.status === 409) {
        setIsConflict(true);
        handleShowModal('conflict', e?.cause?.data?.updatedByDisplayName);
      } else if (!isAutoSaveFailedPopupShown) {
        handleShowModal('autoSaveFailed');
        setIsAutoSaveFailedPopupShown(true);
      }
    }
  }, [
    setIsEagerSave,
    setIsConflict,
    isConflict,
    upsertAndUpdatePia,
    setLastSaveAlertInfo,
    getShortTime,
    pia,
    handleShowModal,
    isAutoSaveFailedPopupShown,
    setIsAutoSaveFailedPopupShown,
  ]);

  useEffect(() => {
    if (isEagerSave) {
      autoSave();
      return;
    }

    const autoSaveTimer = setTimeout(() => {
      autoSave();
    }, 500);

    return () => clearTimeout(autoSaveTimer);
  }, [isEagerSave, autoSave]);
};

export default useAutoSave;

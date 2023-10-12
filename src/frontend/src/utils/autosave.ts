import { useEffect, useCallback, Dispatch, SetStateAction } from 'react';
import { IPiaForm } from '../types/interfaces/pia-form.interface';
import { ILastSaveAlterInfo } from '../pages/PIAForm';

// Define the type for the `SetState` function
type SetState<T> = Dispatch<SetStateAction<T>>;

// Define the props for the `useAutoSave` hook
type AutoSaveProps = {
  setIsEagerSave: SetState<boolean>; // Function to set the `isEagerSave` state
  isEagerSave: boolean; // Flag to indicate if the save is eager
  isConflict: boolean; // Flag to indicate if there is a conflict
  setIsConflict: SetState<boolean>; // Function to set the `isConflict` state
  getShortTime: (date?: Date) => string; // Function to get the short time format
  upsertAndUpdatePia: (changes?: Partial<IPiaForm>) => Promise<IPiaForm>; // Function to update the PIA form
  pia: IPiaForm; // The PIA form object
  setLastSaveAlertInfo: SetState<ILastSaveAlterInfo>; // Function to set the last save alert info
  handleShowModal: (modalType: string, optionalData?: any) => void; // Function to show a modal
  isAutoSaveFailedPopupShown: boolean; // Flag to indicate if the auto-save failed popup is shown
  setIsAutoSaveFailedPopupShown: SetState<boolean>; // Function to set the `isAutoSaveFailedPopupShown` state
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
    setIsEagerSave(false); // Set the `isEagerSave` flag to false
    if (isConflict) return; // If there is a conflict, return without saving

    try {
      await upsertAndUpdatePia(); // Update the PIA form
    } catch (e: any) {
      const message = `Unable to auto-save. Last saved at ${getShortTime(
        pia.updatedAt,
      )}.`;
      const causeStatus = e?.cause?.status;
      if (causeStatus === 409) {
        setIsConflict(true); // Set the `isConflict` flag to true
        handleShowModal('conflict', e?.cause?.data?.updatedByDisplayName); // Show the conflict modal
      } else if (!isAutoSaveFailedPopupShown) {
        handleShowModal('autoSaveFailed'); // Show the auto-save failed modal
        setIsAutoSaveFailedPopupShown(true); // Set the `isAutoSaveFailedPopupShown` flag to true
      }
      setLastSaveAlertInfo({
        type: 'danger',
        message,
        show: true,
      }); // Set the last save alert info
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
    const autoSaveTimer = isEagerSave ? 0 : 500; // Set the auto-save timer based on the `isEagerSave` flag

    const timerId = setTimeout(autoSave, autoSaveTimer); // Set the timer for the `autoSave` function

    return () => clearTimeout(timerId); // Clear the timer when the component unmounts
  }, [isEagerSave, autoSave]);
};

export default useAutoSave;

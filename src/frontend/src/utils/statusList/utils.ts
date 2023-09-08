import { IPiaForm } from '../../types/interfaces/pia-form.interface';
import { PiaStatuses, SubmitButtonTextEnum } from '../../constant/constant';
import { IReviewSection } from '../../components/public/PIAFormTabs/review/interfaces';

export const checkButtonText = (pia: IPiaForm | null) => {
  // in MPO status the button text will different
  // for delegate PIA, the button text finish review
  // for standard PIA, the button text still as submit
  // reminder: for CPO review status, it should only for standard PIA, however
  // the delegate PIA can also in CPO_review status due to the requirement
  // the cpo_review status button text should be finish review unless special requirement
  if (pia === null) return;
  if (
    pia.status === PiaStatuses.MPO_REVIEW &&
    pia.hasAddedPiToDataElements === false
  )
    return SubmitButtonTextEnum.FINISH_REVIEW;

  if (
    pia.status === PiaStatuses.MPO_REVIEW &&
    pia.hasAddedPiToDataElements !== false
  )
    return SubmitButtonTextEnum.FORM;

  return SubmitButtonTextEnum.FORM;
};

export const checkReviewStatus = (pia: IPiaForm | null): boolean => {
  // this function use to check if the review tab has any data, if so, show warning modal, otherwise
  // display default modal
  if (
    (pia &&
      (pia?.status === PiaStatuses.MPO_REVIEW ||
        pia?.status === PiaStatuses.FINAL_REVIEW ||
        pia?.status === PiaStatuses.CPO_REVIEW) &&
      ((pia?.review?.programArea?.selectedRoles &&
        pia?.review?.programArea?.selectedRoles?.length > 0) ||
        pia?.review?.mpo?.isAcknowledged === true)) ||
    (pia?.review?.cpo &&
      Object(pia?.review?.cpo)?.length > 0 &&
      Object(pia?.review?.cpo)?.some(
        (review: IReviewSection) => review.isAcknowledged === true,
      ))
  ) {
    return true;
  }
  return false;
};

export const finalReviewCompleted = (pia: IPiaForm | null): boolean => {
  let reviewProgramAreaDone = false;
  const selectedRoles = pia?.review?.programArea?.selectedRoles || [];
  reviewProgramAreaDone = selectedRoles.every(
    (role) =>
      pia?.review?.programArea?.reviews?.[role]?.isAcknowledged === true,
  );
  if (reviewProgramAreaDone && pia?.review?.mpo?.isAcknowledged === true) {
    return true;
  }
  return false;
};

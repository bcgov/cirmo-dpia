import messages from './helpers/messages';
import { ApprovalRoles } from '../../../../constant/constant';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { IReview, IPIAReviewProps } from './helpers/interfaces';
import { isCPORole } from '../../../../utils/user';
import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../../contexts/PiaFormContext';
import { setNestedReactState } from '../../../../utils/object-modification.util';
import { YesNoInput } from '../../../../types/enums/yes-no.enum';
import { getUserPrivileges } from '../../../../utils/statusList/common';
import { MPOReviewSection } from './MPOReviewSection';
import { CPOReviewSection } from './CPOReviewSection';
import { ProgramAreaReviewSection } from './PAReviewSection';

const PIAReview = ({ printPreview }: IPIAReviewProps) => {
  const { pia, piaStateChangeHandler } =
    useContext<IPiaFormContext>(PiaFormContext);

  const initialFormState: IReview = useMemo(
    () => ({
      programArea: {
        selectedRoles: [],
        reviews: {},
      },
      mpo: {
        isAcknowledged: false,
        reviewNote: '',
      },
      cpo: {},
    }),
    [],
  );

  const [updatePia, setUpdatePia] = useState(false);
  const [mandatoryADM, setMandatoryADM] = useState(false);
  const [reviewForm, setReviewForm] = useState<IReview>(
    pia.review || initialFormState,
  );

  const stateChangeHandler = (value: any, path: string, callApi?: boolean) => {
    setNestedReactState(setReviewForm, path, value);
    if (callApi) setUpdatePia(true);
  };

  const addRole = useCallback(
    (role: string) => {
      if (!role) return; // no empty role

      const existingRoles = reviewForm.programArea?.selectedRoles || [];
      const casedRoles = existingRoles.map((r) => r.toLowerCase());

      if (casedRoles.includes(role.toLowerCase())) return; // role with the same name already exists

      const updatedRoles = [...existingRoles, role];

      const updatedProgramArea = {
        ...reviewForm.programArea,
        selectedRoles: updatedRoles,
      };

      piaStateChangeHandler(
        {
          ...reviewForm,
          programArea: updatedProgramArea,
        },
        'review',
        true,
      );

      stateChangeHandler(updatedRoles, 'programArea.selectedRoles', true);
    },
    [piaStateChangeHandler, reviewForm],
  );

  /**
   * Update pia.review when reviewForm is updated
   */
  useEffect(() => {
    if (!updatePia) return;
    setUpdatePia(false);
    piaStateChangeHandler(reviewForm, 'review', true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviewForm, updatePia]);

  /**
   * Update reviewForm when pia.review is updated
   */
  useEffect(() => {
    if (!pia.review) return;
    setReviewForm(pia.review);
  }, [pia.review]);

  /**
   * Update reviewForm.programArea when
   * Part 4 Assessment(storing personal information tab) (PIDSOC), If Assessment of Disclosures Outside of Canada is filled out in PIA,
   * ADM(Assistant Deputy Minister) is a preselected role
   * and can not be deleted
   * personalInformation.storedOutsideCanada is yes
   * sensitivePersonalInformation.doesInvolve is yes
   * sensitivePersonalInformation.disclosedOutsideCanada is no
   */
  useEffect(() => {
    // if the condition does satisfy the rule, add the adm to programArea
    // otherwise do nothing
    if (
      pia?.hasAddedPiToDataElements !== false &&
      pia?.storingPersonalInformation?.personalInformation
        ?.storedOutsideCanada === YesNoInput.YES &&
      pia?.storingPersonalInformation?.sensitivePersonalInformation
        .doesInvolve === YesNoInput.YES &&
      pia?.storingPersonalInformation?.sensitivePersonalInformation
        .disclosedOutsideCanada === YesNoInput.NO
    ) {
      setMandatoryADM(true);
      addRole(ApprovalRoles.ADM);
    }
  }, [
    addRole,
    pia?.hasAddedPiToDataElements,
    pia?.review?.programArea.selectedRoles,
    pia?.storingPersonalInformation?.personalInformation?.storedOutsideCanada,
    pia?.storingPersonalInformation?.sensitivePersonalInformation
      .disclosedOutsideCanada,
    pia?.storingPersonalInformation?.sensitivePersonalInformation.doesInvolve,
    reviewForm.programArea?.selectedRoles,
  ]);

  // Review page privileges.
  const reviewPageParams = getUserPrivileges(pia)?.Pages?.review?.params;
  const showPrintPreview = reviewPageParams?.showPrintPreview ?? false;
  const showCpoReview = reviewPageParams?.showCpoReview ?? false;
  const showMpoReview = reviewPageParams?.showMpoReview ?? false;
  const showProgramAreaReview =
    reviewPageParams?.showProgramAreaReview ?? false;

  const hasCPOReviews =
    pia?.review?.cpo && Object.entries(pia?.review?.cpo).length > 0;

  return (
    <>
      <section>
        <h2 className="results-header">
          <b>{messages.PiaReviewHeader.Title.en}</b>
        </h2>
      </section>

      {/* Show PendingReview when printPreview prop is true and showPrintPreview is false */}
      {printPreview && !showPrintPreview ? (
        <div className="review-container ">
          <div className=" ">Pending review</div>
        </div>
      ) : (
        <>
          {showProgramAreaReview && (
            <ProgramAreaReviewSection
              pia={pia}
              addRole={addRole}
              reviewForm={reviewForm}
              mandatoryADM={mandatoryADM}
              stateChangeHandler={stateChangeHandler}
              printPreview={printPreview}
            />
          )}

          {showMpoReview && (
            <MPOReviewSection
              pia={pia}
              stateChangeHandler={stateChangeHandler}
              printPreview={printPreview}
            />
          )}

          {pia.hasAddedPiToDataElements !== false &&
            (hasCPOReviews || isCPORole()) &&
            showCpoReview && (
              <CPOReviewSection
                pia={pia}
                stateChangeHandler={stateChangeHandler}
                printPreview={printPreview}
              />
            )}
        </>
      )}
    </>
  );
};

export default PIAReview;

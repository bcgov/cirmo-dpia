import messages from './messages';
import { ApprovalRoles, PiaStatuses } from '../../../../constant/constant';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { IReview, IReviewSection } from './interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getGUID, isCPORole } from '../../../../utils/user';
import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../../contexts/PiaFormContext';
import { setNestedReactState } from '../../../../utils/object-modification.util';
import ViewMPOReview from './viewMPOReview';
import PendingReview from './pendingReview';
import ViewProgramAreaReview from './viewProgramArea';
import { YesNoInput } from '../../../../types/enums/yes-no.enum';
import ProgramArea from './ProgamArea';
import EditCPOReview from './editCPOReview';
import ViewCPOReview from './viewCPOReview';
import EditMPOReview from './editMPOReview';
import { getUserPrivileges } from '../../../../utils/statusList/common';

export interface IReviewProps {
  printPreview?: boolean;
}

const PIAReview = ({ printPreview }: IReviewProps) => {
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
  const [reviewForm, setReviewForm] = useState<IReview>(
    pia.review || initialFormState,
  );
  // For requirement
  // if  PIA Part 4 Assessment(storing personal information tab) (PIDSOC),
  // If Assessment of Disclosures Outside of Canada is filled out in PIA,
  // ADM(Assistant Deputy Minister) is a preselected role and can not be delete
  // we need to distinguish user select ADM role vs system pre-select ADM

  const [mandatoryADM, setMandatoryADM] = useState(false);

  const [editReviewNote, setEditReviewNote] = useState(false);
  const stateChangeHandler = (value: any, path: string, callApi?: boolean) => {
    setNestedReactState(setReviewForm, path, value);
    if (callApi) setUpdatePia(true);
  };

  const addRole = useCallback(
    (role: string) => {
      const casedRoles =
        reviewForm.programArea?.selectedRoles?.map((r) => r.toLowerCase()) ||
        [];

      if (!role) return; // no empty role

      if (casedRoles?.includes(role.toLowerCase())) return; // role with the same name already exists

      if (!reviewForm.programArea?.selectedRoles) {
        reviewForm.programArea = {
          ...reviewForm?.programArea,
          selectedRoles: [],
        };
      }

      reviewForm.programArea?.selectedRoles.push(role);

      stateChangeHandler(
        reviewForm.programArea?.selectedRoles,
        'programArea.selectedRoles',
      );

      piaStateChangeHandler(
        {
          programArea: {
            ...reviewForm.programArea,
            selectedRoles: reviewForm.programArea.selectedRoles,
          },
        },
        'review',
        true,
      );
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
  const userGuid = getGUID();

  const allowUserReviewCPO = () => {
    // only allow one CPO user do review once

    if (pia?.review?.cpo !== undefined) {
      if (
        Object.values<IReviewSection>(pia?.review?.cpo).some(
          (review) =>
            review !== null &&
            review?.isAcknowledged !== false &&
            review.reviewedByGuid === userGuid,
        )
      )
        return false;
    }
    return true;
  };

  const addNewCPOReview = () => {
    const newCPOReview = {
      [userGuid]: {
        isAcknowledged: false,
        reviewNote: '',
      },
    };
    if (reviewForm?.cpo !== undefined) {
      setReviewForm({
        ...reviewForm,
        cpo: {
          ...reviewForm.cpo,
          ...newCPOReview,
        },
      });
    } else {
      setReviewForm({
        ...reviewForm,
        cpo: {},
      });
    }

    stateChangeHandler(reviewForm, 'review', true);
  };

  const enableAddNewCPOReviewer = () => {
    /**
     * the logic is list as below
     * if a PIA not reviewed by any cpo, the cpo user can not add a new CPO reviewer
     * if a cpo already reviewed this PIA, this cpo can not add a new CPO review section
     * only a PIA reviewed by other CPO user but not current login CPO user,
     * the current login CPO user allowed to see the button and add themselves as a reviewer for this pia
     */
    // if the current login user GUID exist in CPO section, the user can not see the button
    if (
      pia?.review?.cpo &&
      Object.keys(pia?.review?.cpo).some((cpoId: string) => cpoId === userGuid)
    )
      return false;
    // if this current user already review the pia, can not see this button
    if (!allowUserReviewCPO()) return false;

    if (!getUserPrivileges(pia)?.Pages?.review?.params?.editCpoReview)
      return false;

    return true;
  };
  const enableMPOReviewViewMode = () => {
    // if the user already done review the MPO review field, we will show
    // the review result page, otherwise the app will show review page
    // display a checkbox and ask the MPO to accept the accountability and add review note

    // for PI PIA, it allows users just check the checkbox without inputting any review note, and if they click confirm button, will send to the backend
    // and there will be a reviewedAt timestamp that attaches to the object.
    // but if the user never checks the checkbox, the reivewedAt will not exist.
    // so if the reviewedAt field have a value, we show the review result otherwise show review
    if (pia?.review?.mpo?.reviewedAt && editReviewNote === false) return true;
    return false;
  };

  const reviewPageParams = getUserPrivileges(pia)?.Pages?.review?.params;

  const showCpoReview = reviewPageParams?.showCpoReview ?? false;
  const showMpoReview = reviewPageParams?.showMpoReview ?? false;
  const showProgramAreaReview =
    reviewPageParams?.showProgramAreaReview ?? false;

  // CPO Review can't be shown if there is no cpoId.
  const invalidCpoReviewData =
    Object.entries(!pia?.review?.cpo).length < 0 && !isCPORole();

  return (
    <>
      <section>
        <h2 className="results-header">
          <b>{messages.PiaReviewHeader.Title.en}</b>
        </h2>
        {!printPreview && showProgramAreaReview && (
          <>
            <h3>{messages.PiaReviewHeader.ProgramAreaSection.Title.en}</h3>
            <p className="pb-4">
              {messages.PiaReviewHeader.ProgramAreaSection.Description.en}
            </p>
          </>
        )}
      </section>
      {!printPreview ? (
        <>
          {showProgramAreaReview && (
            <ProgramArea
              pia={pia}
              reviewForm={reviewForm}
              addRole={addRole}
              stateChangeHandler={stateChangeHandler}
              mandatoryADM={mandatoryADM}
            />
          )}
          {showMpoReview && (
            <section className="mt-5 ">
              <h3>{messages.PiaReviewHeader.MinistrySection.MPO.Title.en}</h3>
              <p className="pb-4">
                {messages.PiaReviewHeader.MinistrySection.MPO.Description.en}
              </p>
              <div className="drop-shadow card p-4 p-md-5">
                <div className="data-table__container">
                  {enableMPOReviewViewMode() ? (
                    <ViewMPOReview
                      pia={pia}
                      stateChangeHandler={stateChangeHandler}
                    />
                  ) : (
                    <EditMPOReview
                      pia={pia}
                      stateChangeHandler={stateChangeHandler}
                    />
                  )}
                </div>
              </div>
            </section>
          )}
          {pia.hasAddedPiToDataElements !== false &&
          showCpoReview &&
          !invalidCpoReviewData ? (
            <section className="mt-5 ">
              <h3>{messages.PiaReviewHeader.MinistrySection.CPO.Title.en}</h3>
              <p className="pb-4">
                {messages.PiaReviewHeader.MinistrySection.CPO.Description.en}
              </p>
              <div className="drop-shadow card p-4 p-md-5">
                <div className="data-table__container">
                  {pia?.review?.cpo ? (
                    Object.entries(pia?.review?.cpo)?.map(
                      ([cpoId, reviewSection]) => {
                        return reviewForm.cpo ? (
                          <div
                            className="d-flex align-items-center"
                            key={cpoId}
                          >
                            {!allowUserReviewCPO() ||
                            Object(pia?.review?.cpo)?.[cpoId]
                              ?.isAcknowledged ? (
                              <ViewCPOReview
                                pia={pia}
                                cpoId={cpoId}
                                stateChangeHandler={stateChangeHandler}
                              />
                            ) : (
                              <EditCPOReview
                                pia={pia}
                                cpoId={cpoId}
                                stateChangeHandler={stateChangeHandler}
                              />
                            )}
                          </div>
                        ) : null;
                      },
                    )
                  ) : (
                    <EditCPOReview
                      pia={pia}
                      cpoId={userGuid}
                      stateChangeHandler={stateChangeHandler}
                    />
                  )}
                  {enableAddNewCPOReviewer() ? (
                    <>
                      <div className="horizontal-divider "></div>
                      <div className="d-flex justify-content-center">
                        <button
                          onClick={addNewCPOReview}
                          className="bcgovbtn bcgovbtn__tertiary bold min-gap"
                        >
                          Add CPO reviewer
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </section>
          ) : null}
        </>
      ) : pia?.status === PiaStatuses.EDIT_IN_PROGRESS ||
        pia?.status === PiaStatuses.INCOMPLETE ||
        pia?.status === PiaStatuses.MPO_REVIEW ? (
        <PendingReview />
      ) : (
        <>
          <div className="mt-2 pb-2">
            <h3>
              <b>Program Area</b>
            </h3>
          </div>
          {pia?.review?.programArea?.selectedRoles.map((role: string) => (
            <>
              <ViewProgramAreaReview
                pia={pia}
                printPreview
                role={role}
                stateChangeHandler={stateChangeHandler}
                editReviewNote={setEditReviewNote}
              />
            </>
          ))}
          <ViewMPOReview
            pia={pia}
            printPreview
            stateChangeHandler={stateChangeHandler}
          />
          {pia?.review?.cpo ? (
            Object.entries(pia?.review?.cpo)?.map(([cpoId, reviewSection]) => (
              <>
                <ViewCPOReview
                  pia={pia}
                  printPreview
                  stateChangeHandler={stateChangeHandler}
                  cpoId={cpoId}
                />
              </>
            ))
          ) : (
            <>
              <div> Reviewed by</div>
              <div> Review incomplete</div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default PIAReview;

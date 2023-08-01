import InputText from '../../../../components/common/InputText/InputText';
import Dropdown from '../../../../components/common/Dropdown';
import Checkbox from '../../../../components/common/Checkbox';
import messages from './messages';
import { ApprovalRoles, PiaStatuses } from '../../../../constant/constant';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { IReview } from './interfaces';
import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../../contexts/PiaFormContext';
import { setNestedReactState } from '../../../../utils/object-modification.util';
import ViewMPOReview from './viewMPOReview';
import PendingReview from './pendingReview';
import ViewProgramAreaReview from './viewProgramArea';
import EditProgramAreaReview from './editProgramArea';
import { YesNoInput } from '../../../../types/enums/yes-no.enum';
import ProgramArea from './ProgamArea';

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
    }),
    [],
  );

  const [updatePia, setUpdatePia] = useState(false);
  const [mpoAcknowledged, setMpoAcknowledged] = useState(
    pia.review?.mpo?.isAcknowledged || false,
  );
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

  const [reviewNote, setReviewNote] = useState<string>(
    pia?.review?.mpo?.reviewNote || '',
  );

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
    pia?.review?.programArea.selectedRoles,
    pia?.storingPersonalInformation?.personalInformation?.storedOutsideCanada,
    pia?.storingPersonalInformation?.sensitivePersonalInformation
      .disclosedOutsideCanada,
    pia?.storingPersonalInformation?.sensitivePersonalInformation.doesInvolve,
    reviewForm.programArea?.selectedRoles,
  ]);

  const disableConfirmButton = () => {
    if (pia.hasAddedPiToDataElements === false && reviewNote.trim() === '')
      return true;
    return false;
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

  const handleMPOReviewSubmit = () => {
    setEditReviewNote(false);
    const review = { isAcknowledged: mpoAcknowledged, reviewNote };
    stateChangeHandler(review, `mpo`, true);
  };

  return (
    <>
      <section>
        <h2 className="results-header">
          <b>{messages.PiaReviewHeader.Title.en}</b>
        </h2>
        {!printPreview ? (
          <>
            <h3>{messages.PiaReviewHeader.ProgramAreaSection.Title.en}</h3>
            <p className="pb-4">
              {messages.PiaReviewHeader.ProgramAreaSection.Description.en}
            </p>
          </>
        ) : null}
      </section>
      {!printPreview ? (
        <>
          <ProgramArea
            pia={pia}
            reviewForm={reviewForm}
            addRole={addRole}
            stateChangeHandler={stateChangeHandler}
            mandatoryADM={mandatoryADM}
          />
          <section className="mt-5 ">
            <h3>{messages.PiaReviewHeader.MinistrySection.Title.en}</h3>
            <p className="pb-4">
              {messages.PiaReviewHeader.MinistrySection.Description.en}
            </p>
            <div className="drop-shadow card p-4 p-md-5">
              <div className="data-table__container">
                {enableMPOReviewViewMode() ? (
                  <ViewMPOReview
                    pia={pia}
                    editReviewNote={setEditReviewNote}
                    isAcknowledged={pia?.review?.mpo?.isAcknowledged || false}
                  />
                ) : (
                  <>
                    <div className="data-row">
                      <Checkbox
                        value=""
                        isLink={false}
                        checked={mpoAcknowledged}
                        label={
                          messages.PiaReviewHeader.MinistrySection.Input
                            .AcceptAccountability.en
                        }
                        onChange={(e) => setMpoAcknowledged(e.target.checked)}
                      />
                      {mpoAcknowledged && (
                        <div className="d-block pb-3">
                          <div>
                            <div className="d-block pb-3">
                              <b>
                                {
                                  messages.PiaReviewHeader.MinistrySection.Input
                                    .ReviewNote.en
                                }
                                &nbsp;
                                {pia.hasAddedPiToDataElements === false ? (
                                  <span className="error-text">(required)</span>
                                ) : (
                                  <span>(optional)</span>
                                )}
                              </b>
                            </div>
                            <div className="d-block">
                              <textarea
                                className="w-50 h-200"
                                value={reviewNote}
                                onChange={(e) => {
                                  setReviewNote(e.target.value);
                                }}
                              ></textarea>
                            </div>
                          </div>
                          <div className="d-flex">
                            <button
                              className="bcgovbtn bcgovbtn__secondary mt-3 me-3"
                              onClick={() => {
                                setReviewNote('');
                                setMpoAcknowledged(false);
                                stateChangeHandler(null, 'mpo', true);
                              }}
                            >
                              Clear
                            </button>
                            <button
                              className="bcgovbtn bcgovbtn__primary mt-3 ml-3"
                              disabled={disableConfirmButton()}
                              onClick={handleMPOReviewSubmit}
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
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
                isAcknowledged={
                  pia?.review?.programArea?.reviews?.[role].isAcknowledged ||
                  false
                }
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
            editReviewNote={setEditReviewNote}
            isAcknowledged={pia?.review?.mpo?.isAcknowledged || false}
          />
        </>
      )}
    </>
  );
};

export default PIAReview;

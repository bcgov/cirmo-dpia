import InputText from '../../../../components/common/InputText/InputText';
import Dropdown from '../../../../components/common/Dropdown';
import Checkbox from '../../../../components/common/Checkbox';
import messages from './messages';
import { ApprovalRoles, PiaStatuses } from '../../../../constant/constant';
import { useContext, useEffect, useMemo, useState } from 'react';
import { IReview, IReviewSection } from './interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { HttpRequest } from '../../../../utils/http-request.util';
import { API_ROUTES } from '../../../../constant/apiRoutes';
import { useParams } from 'react-router-dom';
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../../contexts/PiaFormContext';
import { setNestedReactState } from '../../../../utils/object-modification.util';
import ViewMPOReview from './viewMPOReview';
import PendingReview from './pendingReview';
import ViewProgramAreaReview from './viewProgramArea';
import EditProgramAreaReview from './editProgramArea';

export interface IReviewProps {
  printPreview?: boolean;
}

const PIAReview = ({ printPreview }: IReviewProps) => {
  const { id } = useParams();
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

  const [reviewForm, setReviewForm] = useState<IReview>(initialFormState);
  const [editReviewNote, setEditReviewNote] = useState(false);
  const stateChangeHandler = (value: any, path: string) => {
    setNestedReactState(setReviewForm, path, value);
  };
  useEffect(() => {
    const getPIADATA = async () => {
      const piaData = await HttpRequest.get(
        API_ROUTES.GET_PIA_INTAKE.replace(':id', `${id}`),
      );
      const data: IPiaForm = Object(piaData).data;
      if (data.review) {
        setReviewForm(Object(data).review);
      }
      if (!data.review?.programArea) {
        setReviewForm({
          mpo: { ...reviewForm.mpo },
          programArea: { ...initialFormState.programArea },
        });
      }
    };
    getPIADATA();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  // passing updated data to parent for auto-save to work efficiently only if there are changes

  useEffect(() => {
    if (reviewForm.programArea.selectedRoles.length > 0) {
      const newReviews = reviewForm.programArea.selectedRoles.reduce(
        (acc: any, role: string) => {
          if (
            Object(reviewForm.programArea.reviews)[
              role as keyof IReview['programArea']['reviews']
            ] === undefined
          ) {
            acc[role] = {
              isAcknowledged: false,
              reviewNote: '',
            };
          } else {
            acc[role] = Object(reviewForm.programArea.reviews)[
              role as keyof IReview['programArea']['reviews']
            ];
          }
          return acc;
        },
        {},
      );

      setReviewForm({
        ...reviewForm,
        programArea: {
          ...reviewForm.programArea,
          reviews: newReviews,
        },
      });

      piaStateChangeHandler(
        {
          programArea: {
            ...reviewForm.programArea,
          },
        },
        'review',
        true,
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    /* When the selectedRoles length changes, we need to update the reviews object */
  }, [reviewForm.programArea.selectedRoles.length]);

  const [rolesSelect, setRolesSelect] = useState<string>('');
  const [rolesInput, setRolesInput] = useState<string>('');
  const [reviewNote, setReviewNote] = useState<string>(
    pia?.review?.mpo?.reviewNote || '',
  );
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
          <section className="drop-shadow card p-4 p-md-5">
            <div className="data-table__container">
              <div
                className={`${
                  (pia.status === PiaStatuses.MPO_REVIEW ||
                    pia.status === PiaStatuses.CPO_REVIEW) &&
                  'data-row'
                }`}
              >
                {/**
                 * UI for adding roles to the program area section starts here
                 */}
                {(pia.status === PiaStatuses.MPO_REVIEW ||
                  pia.status === PiaStatuses.CPO_REVIEW) && (
                  <>
                    <div className="d-flex">
                      <div className="p-2 col-md-5">
                        <Dropdown
                          id="programArea"
                          label="Select a role from the list"
                          options={Object.keys(ApprovalRoles).map(
                            (role: string) => ({
                              value: role,
                              label: ApprovalRoles[role],
                            }),
                          )}
                          value={rolesSelect}
                          changeHandler={(e) => setRolesSelect(e.target.value)}
                        />
                        <button
                          className="bcgovbtn bcgovbtn__secondary mt-3"
                          onClick={() => {
                            if (rolesSelect === '') {
                              return;
                            }
                            reviewForm.programArea?.selectedRoles.push(
                              ApprovalRoles[rolesSelect],
                            );
                            setRolesSelect('');
                            stateChangeHandler(
                              reviewForm.programArea?.selectedRoles,
                              'programArea.selectedRoles',
                            );
                            piaStateChangeHandler(
                              {
                                programArea: {
                                  selectedRoles:
                                    reviewForm.programArea.selectedRoles,
                                },
                              },
                              'review',
                              true,
                            );
                          }}
                        >
                          Add
                        </button>
                      </div>
                      <div className="p-2 col-md-2 d-flex justify-content-center align-items-center">
                        Or
                      </div>
                      <div className="p-2 col-md-5">
                        <InputText
                          id="programArea"
                          label={
                            messages.PiaReviewHeader.ProgramAreaSection.Input
                              .EnterRoleTitle.en
                          }
                          value={rolesInput}
                          onChange={(e) => setRolesInput(e.target.value)}
                        />
                        <button
                          className="bcgovbtn bcgovbtn__secondary mt-3"
                          onClick={() => {
                            reviewForm.programArea?.selectedRoles.push(
                              rolesInput,
                            );
                            stateChangeHandler(
                              reviewForm.programArea.selectedRoles,
                              'programArea.selectedRoles',
                            );
                            setRolesInput('');
                            piaStateChangeHandler(
                              {
                                programArea: {
                                  selectedRoles:
                                    reviewForm.programArea.selectedRoles,
                                },
                              },
                              'review',
                              true,
                            );
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                    <div className="horizontal-divider mt-5 mb-5"></div>
                  </>
                )}
                {/**
                 * UI for adding roles to the program area section ends here
                 */}

                {/**
                 * UI for displaying selected roles in the program area section starts here
                 */}
                <div>
                  {(pia.status === PiaStatuses.MPO_REVIEW ||
                    pia.status === PiaStatuses.CPO_REVIEW) && (
                    <h4 className="mb-3">Selected Roles</h4>
                  )}
                  {reviewForm.programArea?.selectedRoles.length > 0 ? (
                    reviewForm.programArea?.selectedRoles.map(
                      (role: string, index: number) => {
                        return reviewForm.programArea?.selectedRoles &&
                          pia.status === PiaStatuses.FINAL_REVIEW ? (
                          <div
                            className="d-flex align-items-center"
                            key={index}
                          >
                            {Object(pia?.review?.programArea)?.review
                              ?.isAcknowledged ? (
                              <ViewProgramAreaReview
                                pia={pia}
                                role={role}
                                editReviewNote={setEditReviewNote}
                              />
                            ) : (
                              <EditProgramAreaReview
                                pia={pia}
                                role={role}
                                changeHandler={stateChangeHandler}
                              />
                            )}
                          </div>
                        ) : (
                          <div
                            key={index}
                            className="d-flex gap-1 justify-content-start align-items-center"
                          >
                            <p className="m-0">{role}</p>
                            <button
                              className="bcgovbtn bcgovbtn__tertiary bold delete__btn p-3"
                              onClick={() => {
                                reviewForm.programArea.selectedRoles?.splice(
                                  index,
                                  1,
                                );
                                stateChangeHandler(
                                  reviewForm.programArea.selectedRoles,
                                  'programArea.selectedRoles',
                                );
                                piaStateChangeHandler(reviewForm, 'review');
                              }}
                            >
                              <FontAwesomeIcon
                                className=""
                                icon={faTrash}
                                size="xl"
                              />
                            </button>
                          </div>
                        );
                      },
                    )
                  ) : (
                    <p>{messages.PiaReviewHeader.NoRolesSelected.en}</p>
                  )}
                </div>
              </div>
            </div>
          </section>
          <section className="mt-5 ">
            <h3>{messages.PiaReviewHeader.MinistrySection.Title.en}</h3>
            <p className="pb-4">
              {messages.PiaReviewHeader.MinistrySection.Description.en}
            </p>
            <div className="drop-shadow card p-4 p-md-5">
              <div className="data-table__container">
                <div>
                  {reviewForm.mpo?.reviewNote &&
                  reviewForm.mpo?.reviewNote !== '' &&
                  editReviewNote === false ? (
                    <ViewMPOReview
                      pia={pia}
                      editReviewNote={setEditReviewNote}
                    />
                  ) : (
                    <>
                      <Checkbox
                        value=""
                        isLink={false}
                        checked={reviewForm?.mpo?.isAcknowledged ? true : false}
                        label={
                          messages.PiaReviewHeader.MinistrySection.Input
                            .AcceptAccountability.en
                        }
                        onChange={(e) => {
                          setReviewForm({
                            ...reviewForm,
                            mpo: {
                              ...reviewForm.mpo,
                              isAcknowledged: e.target.checked,
                            },
                          });
                        }}
                      />
                      {reviewForm.mpo?.isAcknowledged && (
                        <div className="d-block pb-3">
                          <div>
                            <div className="d-block pb-3">
                              <b>
                                {
                                  messages.PiaReviewHeader.MinistrySection.Input
                                    .ReviewNote.en
                                }
                                <span className="error-text">( required )</span>
                              </b>
                            </div>
                            <div className="d-block">
                              <textarea
                                className="w-50  h-200"
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
                                setReviewForm({
                                  ...reviewForm,
                                  mpo: {
                                    ...reviewForm.mpo,
                                    reviewNote: '',
                                    isAcknowledged: false,
                                  },
                                });
                                piaStateChangeHandler(
                                  {
                                    mpo: null,
                                  },
                                  'review',
                                  true,
                                );
                              }}
                            >
                              Clear
                            </button>
                            <button
                              className="bcgovbtn bcgovbtn__primary mt-3 ml-3"
                              disabled={reviewNote === ''}
                              onClick={() => {
                                setReviewForm({
                                  ...reviewForm,
                                  mpo: {
                                    ...reviewForm.mpo,
                                    reviewNote: reviewNote,
                                  },
                                });
                                setEditReviewNote(false);
                                piaStateChangeHandler(
                                  {
                                    mpo: {
                                      isAcknowledged: true,
                                      reviewNote: reviewNote,
                                    },
                                  },
                                  'review',
                                  true,
                                );
                              }}
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
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
                pia={pia}
                printPreview
                role={role}
                editReviewNote={setEditReviewNote}
              />
            </>
          ))}
          <ViewMPOReview
            pia={pia}
            printPreview
            editReviewNote={setEditReviewNote}
          />
        </>
      )}
    </>
  );
};

export default PIAReview;

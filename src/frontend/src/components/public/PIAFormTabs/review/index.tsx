import InputText from '../../../../components/common/InputText/InputText';
import Dropdown from '../../../../components/common/Dropdown';
import Checkbox from '../../../../components/common/Checkbox';
import messages from './messages';
import { ApprovalRoles } from '../../../../constant/constant';
import { useEffect, useMemo, useState } from 'react';
import { IReview } from './interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { HttpRequest } from '../../../../utils/http-request.util';
import { API_ROUTES } from '../../../../constant/apiRoutes';
import { useParams } from 'react-router-dom';
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';

const PIAReview = () => {
  const { id } = useParams();

  const initialFormState: IReview = useMemo(
    () => ({
      programArea: {
        selectedRoles: [],
      },
      mpo: {
        isAcknowledged: false,
        reviewNote: '',
        //reviewedBy: '',
        //reviewedByGUID: '',
        //dateReviewed: '',
      },
    }),
    [],
  );

  const [reviewForm, setReviewForm] = useState<IReview>(initialFormState);
  const [rolesSelect, setRolesSelect] = useState<string>('');
  const [rolesInput, setRolesInput] = useState<string>('');
  const [pia, setPia] = useState<IPiaForm>({ id: Number(id), saveId: 0 });

  const submitData = async () => {
    const Updatepia: IPiaForm = await HttpRequest.patch(
      API_ROUTES.PATCH_PIA_INTAKE.replace(':id', `${id}`),
      { id: pia.id, review: reviewForm, saveId: pia.saveId },
    );
    setPia(Updatepia);
  };

  // passing updated data to parent for auto-save to work efficiently only if there are changes
  useEffect(() => {
    const getPIADATA = async () => {
      const piaData = await HttpRequest.get(
        API_ROUTES.GET_PIA_INTAKE.replace(':id', `${id}`),
      );
      const data: IPiaForm = Object(piaData).data;
      console.log(data);
      setPia({
        id: data.id,
        saveId: data.saveId,
      });
      if (data.review) {
        setReviewForm(Object(data).review);
      }
    };
    getPIADATA();
  }, [id]);

  const addApprovalRole = (role: string) => {
    if (role.trim() !== '') {
      if (!reviewForm.programArea.selectedRoles) {
        reviewForm.programArea.selectedRoles = [];
      }
      reviewForm.programArea.selectedRoles.push(role);
      setReviewForm({ ...reviewForm });
      submitData();
    }
  };

  return (
    <>
      <section>
        <h2 className="results-header">
          <b>{messages.PiaReviewHeader.Title.en}</b>
        </h2>
        <h3>{messages.PiaReviewHeader.ProgramAreaSection.Title.en}</h3>
        <p className="pb-4">
          {messages.PiaReviewHeader.ProgramAreaSection.Description.en}
        </p>
      </section>
      <section className="drop-shadow card p-4 p-md-5">
        <div className="data-table__container">
          <div className="data-row">
            <div className="d-flex">
              <div className="p-2 col-md-5">
                <Dropdown
                  id="programArea"
                  label="Select a role from the list"
                  options={Object.keys(ApprovalRoles).map((role: string) => ({
                    value: role,
                    label: ApprovalRoles[role],
                  }))}
                  value={rolesSelect}
                  changeHandler={(e) => setRolesSelect(e.target.value)}
                />
                <button
                  className="bcgovbtn bcgovbtn__secondary mt-3"
                  onClick={() => {
                    addApprovalRole(ApprovalRoles[rolesSelect]);
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
                    addApprovalRole(rolesInput);
                  }}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="horizontal-divider mt-5 mb-5"></div>
            <div>
              <h3>
                {
                  messages.PiaReviewHeader.ProgramAreaSection.Output.Roles.Title
                    .en
                }
              </h3>
              <div>
                {reviewForm.programArea.selectedRoles &&
                  reviewForm.programArea.selectedRoles.map(
                    (role: string, index: number) => (
                      <div className="d-flex align-items-center" key={index}>
                        <div className="d-block mt-3">{role}</div>
                        <div className="d-block">
                          <button
                            className="bcgovbtn bcgovbtn__secondary--negative mt-3 ms-3 bold min-gap delete__btn p-3"
                            onClick={() => {
                              reviewForm.programArea.selectedRoles?.splice(
                                index,
                                1,
                              );
                              setReviewForm({ ...reviewForm });
                              submitData();
                            }}
                          >
                            <FontAwesomeIcon
                              className="ms-1"
                              icon={faTrash}
                              size="lg"
                            />
                          </button>
                        </div>
                      </div>
                    ),
                  )}
              </div>
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
            <div className="data-row">
              <Checkbox
                value=""
                checked={reviewForm?.mpo.isAcknowledged ? true : false}
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
              {reviewForm.mpo.isAcknowledged && (
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
                        value={reviewForm.mpo.reviewNote}
                        onChange={(e) =>
                          setReviewForm({
                            ...reviewForm,
                            mpo: {
                              ...reviewForm.mpo,
                              reviewNote: e.target.value,
                            },
                          })
                        }
                      ></textarea>
                    </div>
                  </div>
                  <div className="d-flex">
                    <button
                      className="bcgovbtn bcgovbtn__secondary mt-3 me-3"
                      onClick={() => {
                        setReviewForm({
                          ...reviewForm,
                          mpo: {
                            ...reviewForm.mpo,
                            isAcknowledged: false,
                            reviewNote: '',
                          },
                        });
                      }}
                    >
                      Clear
                    </button>
                    <button
                      className="bcgovbtn bcgovbtn__primary mt-3 ml-3"
                      onClick={() => {
                        submitData();
                      }}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PIAReview;

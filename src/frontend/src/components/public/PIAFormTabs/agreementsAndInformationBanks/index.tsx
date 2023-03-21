import { useEffect, useMemo, useState } from 'react';
import Messages from './messages';
import InputText from '../../../common/InputText/InputText';

import { useOutletContext } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import { PiaStateChangeHandlerType } from '../../../../pages/PIAForm';
import { IAgreementsAndInformationBanks } from './AgreementsAndInformationBanks';
import CustomInputDate from '../../../common/CustomInputDate';
import { dateToString, stringToDate } from '../../../../utils/date';
import { deepEqual } from '../../../../utils/object-comparison.util';
import { setNestedReactState } from '../../../../utils/object-modification.util';
import { YesNoInput } from '../../../../types/enums/yes-no.enum';
import PIBInputText from './viewPIBTextInput';
import ISAInputText from './viewISATextInput';

const PIAAgreementsAndInformationBanks = () => {
  const [pia, piaStateChangeHandler, isReadOnly, accessControl] =
    useOutletContext<
      [IPiaForm, PiaStateChangeHandlerType, boolean, () => void]
    >();

  if (accessControl) accessControl();

  const defaultState: IAgreementsAndInformationBanks = useMemo(
    () => ({
      personalInformationBanks: {
        willResultInPIB: YesNoInput.YES,
        description: '',
        mainMinistryOrAgencyInvolved: '',
        otherGroupsInvolved: '',
        contactTitle: '',
        contactPhone: '',
      },
      informationSharingAgreement: {
        doesInvolveISA: YesNoInput.YES,
        description: '',
        mainMinistryOrAgencyInvolved: '',
        otherGroupsInvolved: '',
        contactTitle: '',
        contactPhone: '',
        startDate: null,
        endDate: null,
      },
    }),
    [],
  );

  const initialFormState = useMemo(
    () => pia.agreementsAndInformationBanks || defaultState,
    [defaultState, pia.agreementsAndInformationBanks],
  );

  const [
    agreementsAndInformationBanksForm,
    setAgreementsAndInformationBanksForm,
  ] = useState<IAgreementsAndInformationBanks>(initialFormState);

  const stateChangeHandler = (value: any, path: string) => {
    setNestedReactState(setAgreementsAndInformationBanksForm, path, value);
  };

  // passing updated data to parent for auto-save to work efficiently only if there are changes
  useEffect(() => {
    if (!deepEqual(initialFormState, agreementsAndInformationBanksForm)) {
      piaStateChangeHandler(
        agreementsAndInformationBanksForm,
        'agreementsAndInformationBanks',
      );
    }
  }, [
    piaStateChangeHandler,
    agreementsAndInformationBanksForm,
    initialFormState,
  ]);

  return (
    <>
      <div>
        <h2 className="results-header">
          <b>{Messages.Headings.Title.en}</b>
        </h2>
        <h3 className="pt-4 pb-3">{Messages.InvolveISA.Headings.Title.en}</h3>
        <section className="card">
          <div className="form-group px-4 py-4">
            {!isReadOnly ? (
              <label htmlFor="pibQuestionWillResultInPIB">
                {Messages.InvolveISA.Section.QuestionInvolveISA.en}
              </label>
            ) : (
              <h4> {Messages.InvolveISA.Section.QuestionInvolveISA.en}</h4>
            )}
            <div className="form-group row ">
              {!isReadOnly ? (
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="involve-isa-radio"
                      value={YesNoInput.YES}
                      checked={
                        agreementsAndInformationBanksForm
                          ?.informationSharingAgreement?.doesInvolveISA ===
                        YesNoInput.YES
                      }
                      onChange={(e) =>
                        stateChangeHandler(
                          e.target.value,
                          'informationSharingAgreement.doesInvolveISA',
                        )
                      }
                    />
                    Yes
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="involve-isa-radio"
                      value={YesNoInput.NO}
                      checked={
                        agreementsAndInformationBanksForm
                          ?.informationSharingAgreement?.doesInvolveISA === 'NO'
                      }
                      onChange={(e) =>
                        stateChangeHandler(
                          e.target.value,
                          'informationSharingAgreement.doesInvolveISA',
                        )
                      }
                    />
                    No
                  </div>
                </div>
              ) : (
                <p>
                  {agreementsAndInformationBanksForm.informationSharingAgreement.doesInvolveISA.charAt(
                    0,
                  )}
                  {agreementsAndInformationBanksForm.informationSharingAgreement.doesInvolveISA
                    .slice(1)
                    .toLowerCase()}
                </p>
              )}
            </div>

            {agreementsAndInformationBanksForm?.informationSharingAgreement
              ?.doesInvolveISA === YesNoInput.YES && (
              <div>
                <div className="form-group">
                  {!isReadOnly ? (
                    <label className="pt-4" htmlFor="isaDescription">
                      {Messages.InvolveISA.Section.DescriptionISA.en}
                    </label>
                  ) : (
                    <h4> {Messages.InvolveISA.Section.DescriptionISA.en}</h4>
                  )}
                  {!isReadOnly ? (
                    <MDEditor
                      id="isaDescription"
                      preview="edit"
                      value={
                        agreementsAndInformationBanksForm
                          ?.informationSharingAgreement?.description || ''
                      }
                      onChange={(value) =>
                        stateChangeHandler(
                          value,
                          'informationSharingAgreement.description',
                        )
                      }
                    />
                  ) : agreementsAndInformationBanksForm
                      .informationSharingAgreement.description ? (
                    <MDEditor.Markdown
                      source={
                        agreementsAndInformationBanksForm
                          .informationSharingAgreement.description
                      }
                    />
                  ) : (
                    <p>
                      <i>Not answered</i>
                    </p>
                  )}
                </div>
                {!isReadOnly ? (
                  <>
                    <div className="row mt-2">
                      <div className="col">
                        <InputText
                          label="Main ministry or agency involved"
                          value={
                            agreementsAndInformationBanksForm
                              ?.informationSharingAgreement
                              ?.mainMinistryOrAgencyInvolved || ''
                          }
                          required={true}
                          onChange={(e) => {
                            stateChangeHandler(
                              e.target.value,
                              'informationSharingAgreement.mainMinistryOrAgencyInvolved',
                            );
                          }}
                        />
                      </div>
                      <div className="col ">
                        <InputText
                          label="Any other ministries, agencies, public bodies or organizations involved"
                          value={
                            agreementsAndInformationBanksForm
                              ?.informationSharingAgreement
                              ?.otherGroupsInvolved || ''
                          }
                          required={true}
                          onChange={(e) => {
                            stateChangeHandler(
                              e.target.value,
                              'informationSharingAgreement.otherGroupsInvolved',
                            );
                          }}
                        />
                      </div>
                    </div>

                    <div className="row mt-2 form__row--flex-end">
                      <div className="col">
                        <InputText
                          label="Business contact title of person responsible for maintaining the ISA"
                          helperText="This individual may change positions– please enter their title, not their name."
                          id="businessContactPersonName"
                          value={
                            agreementsAndInformationBanksForm
                              ?.informationSharingAgreement?.contactTitle || ''
                          }
                          onChange={(e) => {
                            stateChangeHandler(
                              e.target.value,
                              'informationSharingAgreement.contactTitle',
                            );
                          }}
                          required={true}
                        />
                      </div>
                      <div className="col mt-2">
                        <div>
                          <InputText
                            label="Business contact phone number of person responsible for maintaining the ISA"
                            id="businessContactPersonPhone"
                            className="mt-4"
                            value={
                              agreementsAndInformationBanksForm
                                ?.informationSharingAgreement?.contactPhone ||
                              ''
                            }
                            onChange={(e) => {
                              stateChangeHandler(
                                e.target.value,
                                'informationSharingAgreement.contactPhone',
                              );
                            }}
                            required={true}
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col">
                        <div className="form-group">
                          <label id="start-date-label">ISA start date</label>
                          <CustomInputDate
                            key="isaStartDate"
                            selected={
                              agreementsAndInformationBanksForm
                                ?.informationSharingAgreement?.startDate
                                ? stringToDate(
                                    agreementsAndInformationBanksForm
                                      .informationSharingAgreement.startDate,
                                  )
                                : null
                            }
                            onChange={(date: any) => {
                              stateChangeHandler(
                                dateToString(date),
                                'informationSharingAgreement.startDate',
                              );
                            }}
                            required
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className=" form-group ">
                          <label id="end-date-label">ISA end date</label>
                          <CustomInputDate
                            key="isaEndDate"
                            selected={
                              agreementsAndInformationBanksForm
                                ?.informationSharingAgreement?.endDate
                                ? stringToDate(
                                    agreementsAndInformationBanksForm
                                      .informationSharingAgreement.endDate,
                                  )
                                : null
                            }
                            onChange={(date: any) => {
                              stateChangeHandler(
                                dateToString(date),
                                'informationSharingAgreement.endDate',
                              );
                            }}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <ISAInputText pia={pia} />
                )}
              </div>
            )}
          </div>
        </section>

        <h3 className="pt-5">{Messages.ResultingPIB.Headings.Title.en}</h3>
        <p> {Messages.ResultingPIB.Headings.Description.en}</p>
        <section className="card">
          <div className="form-group px-4 py-4">
            {!isReadOnly ? (
              <label htmlFor="pibQuestionWillResultInPIB">
                {Messages.ResultingPIB.Section.QuestionWillResultInPIB.en}
              </label>
            ) : (
              <h4>
                {Messages.ResultingPIB.Section.QuestionWillResultInPIB.en}
              </h4>
            )}
            <div>
              <div className="form-group row">
                {!isReadOnly ? (
                  <div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="will-resultPIB-radio"
                        value={YesNoInput.YES}
                        checked={
                          agreementsAndInformationBanksForm
                            ?.personalInformationBanks?.willResultInPIB ===
                          YesNoInput.YES
                        }
                        onChange={(e) =>
                          stateChangeHandler(
                            e.target.value,
                            'personalInformationBanks.willResultInPIB',
                          )
                        }
                      />
                      Yes
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="will-resultPIB-radio"
                        value={YesNoInput.NO}
                        checked={
                          agreementsAndInformationBanksForm
                            ?.personalInformationBanks?.willResultInPIB === 'NO'
                        }
                        onChange={(e) =>
                          stateChangeHandler(
                            e.target.value,
                            'personalInformationBanks.willResultInPIB',
                          )
                        }
                      />
                      No
                    </div>
                  </div>
                ) : (
                  <p>
                    {agreementsAndInformationBanksForm.personalInformationBanks.willResultInPIB.charAt(
                      0,
                    )}
                    {agreementsAndInformationBanksForm.personalInformationBanks.willResultInPIB
                      .slice(1)
                      .toLowerCase()}
                  </p>
                )}
              </div>
              {agreementsAndInformationBanksForm?.personalInformationBanks
                ?.willResultInPIB === YesNoInput.YES && (
                <div>
                  <div className="form-group">
                    {!isReadOnly ? (
                      <label className="pt-4" htmlFor="pibDescriptionType">
                        {
                          Messages.ResultingPIB.Section.QuestionPIBDescription
                            .en
                        }
                      </label>
                    ) : (
                      <h4>
                        {
                          Messages.ResultingPIB.Section.QuestionPIBDescription
                            .en
                        }
                      </h4>
                    )}
                    {!isReadOnly ? (
                      <MDEditor
                        id="pibDescriptionType"
                        preview="edit"
                        value={
                          agreementsAndInformationBanksForm
                            ?.personalInformationBanks?.description || ''
                        }
                        onChange={(value) =>
                          stateChangeHandler(
                            value,
                            'personalInformationBanks.description',
                          )
                        }
                      />
                    ) : agreementsAndInformationBanksForm
                        .personalInformationBanks.description ? (
                      <MDEditor.Markdown
                        source={
                          agreementsAndInformationBanksForm
                            ?.personalInformationBanks?.description
                        }
                      />
                    ) : (
                      <p>
                        <i>Not answered</i>
                      </p>
                    )}
                  </div>
                  {!isReadOnly ? (
                    <>
                      <div className="row mt-2">
                        <div className="col">
                          <InputText
                            label="Main ministry or agency involved"
                            value={
                              agreementsAndInformationBanksForm
                                ?.personalInformationBanks
                                ?.mainMinistryOrAgencyInvolved || ''
                            }
                            required={true}
                            onChange={(e) => {
                              stateChangeHandler(
                                e.target.value,
                                'personalInformationBanks.mainMinistryOrAgencyInvolved',
                              );
                            }}
                          />
                        </div>
                        <div className="col ">
                          <InputText
                            label="Any other ministries, agencies, public bodies or organizations involved"
                            value={
                              agreementsAndInformationBanksForm
                                ?.personalInformationBanks
                                ?.otherGroupsInvolved || ''
                            }
                            required={true}
                            onChange={(e) => {
                              stateChangeHandler(
                                e.target.value,
                                'personalInformationBanks.otherGroupsInvolved',
                              );
                            }}
                          />
                        </div>
                      </div>
                      <div className="row mt-2 form__row--flex-end">
                        <div className="col">
                          <InputText
                            label="Business contact title of person responsible for maintaining the PIB"
                            helperText="This individual may change positions– please enter their title, not their name."
                            id="managingPersonName"
                            value={
                              agreementsAndInformationBanksForm
                                ?.personalInformationBanks?.contactTitle || ''
                            }
                            onChange={(e) => {
                              stateChangeHandler(
                                e.target.value,
                                'personalInformationBanks.contactTitle',
                              );
                            }}
                            required={true}
                          />
                        </div>
                        <div className="col ">
                          <InputText
                            label="Business contact phone number of person responsible for maintaining the PIB"
                            id="managingPersonPhone"
                            value={
                              agreementsAndInformationBanksForm
                                ?.personalInformationBanks?.contactPhone || ''
                            }
                            onChange={(e) => {
                              stateChangeHandler(
                                e.target.value,
                                'personalInformationBanks.contactPhone',
                              );
                            }}
                            required={true}
                            type="text"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <PIBInputText pia={pia} />
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PIAAgreementsAndInformationBanks;

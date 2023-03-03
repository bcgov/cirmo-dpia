import { useEffect, useMemo, useState } from 'react';
import Messages from './messages';
import InputText from '../../../common/InputText/InputText';

import { useOutletContext } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import { PiaStateChangeHandlerType } from '../../../../pages/PIAIntakeForm';
import { IAgreementsAndInformationBanks } from './AgreementsAndInformationBanks';
import CustomInputDate from '../../../common/CustomInputDate';
import { dateToString, stringToDate } from '../../../../utils/date';
import { deepEqual } from '../../../../utils/object-comparison.util';

const PIAAgreementsAndInformationBanks = () => {
  const [pia, piaStateChangeHandler] =
    useOutletContext<[IPiaForm, PiaStateChangeHandlerType]>();

  const defaultState: IAgreementsAndInformationBanks = useMemo(
    () => ({
      personalInformationBanks: {
        willResultInPIB: 'YES',
        description: '',
        mainMinistryOrAgencyInvolved: '',
        otherGroupsInvolved: '',
        contactTitle: '',
        contactPhone: '',
      },
      informationSharingAgreement: {
        doesInvolveISA: 'YES',
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
  const [startDate, setStartDate] = useState<Date | null>(
    pia.agreementsAndInformationBanks?.informationSharingAgreement?.startDate
      ? stringToDate(
          pia.agreementsAndInformationBanks?.informationSharingAgreement
            ?.startDate,
        )
      : null,
  );
  const [endDate, setEndDate] = useState<Date | null>(
    pia.agreementsAndInformationBanks?.informationSharingAgreement?.endDate
      ? stringToDate(
          pia.agreementsAndInformationBanks?.informationSharingAgreement
            ?.endDate,
        )
      : null,
  );
  const initialFormState = useMemo(
    () => pia.agreementsAndInformationBanks || defaultState,
    [defaultState, pia.agreementsAndInformationBanks],
  );
  const [
    agreementsAndInformationBanksForm,
    setAgreementsAndInformationBanksForm,
  ] = useState<IAgreementsAndInformationBanks>(initialFormState);

  const stateChangeHandler = (value: any, nestedKey: string) => {
    if (nestedKey) {
      const keyString = nestedKey.split('.');
      const key1 = keyString[0];
      const key2 = keyString[1];
      if (key1 === 'personalInformationBanks') {
        setAgreementsAndInformationBanksForm((state) => ({
          ...state,
          personalInformationBanks: {
            ...state.personalInformationBanks,
            [key2]: value,
          },
        }));
      } else if (key1 === 'informationSharingAgreement') {
        if (key2 === 'startDate' || key2 === 'endDate')
          value = dateToString(value);
        setAgreementsAndInformationBanksForm((state) => ({
          ...state,
          informationSharingAgreement: {
            ...state.informationSharingAgreement,
            [key2]: value,
          },
        }));
      }
    }
  };

  // passing updated data to parent for auto-save for work efficiently only if there are changes
  useEffect(() => {
    if (!deepEqual(initialFormState, agreementsAndInformationBanksForm)) {
      piaStateChangeHandler(
        agreementsAndInformationBanksForm,
        'agreementsAndInformationBanks',
      );
    }
  }, [
    pia.agreementsAndInformationBanks,
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
            <label htmlFor="pibQuestionWillResultInPIB">
              {Messages.InvolveISA.Section.QuestionInvolveISA.en}
            </label>
            <div className="form-group row ">
              <div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="involve-isa-radio"
                    value="YES"
                    checked={
                      agreementsAndInformationBanksForm
                        ?.informationSharingAgreement?.doesInvolveISA === 'YES'
                        ? true
                        : false
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
                    value="NO"
                    checked={
                      agreementsAndInformationBanksForm
                        ?.informationSharingAgreement?.doesInvolveISA === 'NO'
                        ? true
                        : false
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
            </div>

            {agreementsAndInformationBanksForm?.informationSharingAgreement
              ?.doesInvolveISA === 'YES' && (
              <div>
                <div className="form-group">
                  <label className="pt-4" htmlFor="isaDescription">
                    {Messages.InvolveISA.Section.DescriptionISA.en}
                  </label>
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
                </div>
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
                          ?.informationSharingAgreement?.otherGroupsInvolved ||
                        ''
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
                            ?.informationSharingAgreement?.contactPhone || ''
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
                        placeholderText={'yyyy/mm/dd'}
                        dateFormat="yyyy/MM/dd"
                        selected={startDate === null ? null : startDate}
                        onChange={(date: any) => {
                          setStartDate(date);
                          stateChangeHandler(
                            date,
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
                        placeholderText={'yyyy/mm/dd'}
                        dateFormat="yyyy/MM/dd"
                        selected={endDate === null ? null : endDate}
                        onChange={(date: any) => {
                          setEndDate(date);
                          stateChangeHandler(
                            date,
                            'informationSharingAgreement.endDate',
                          );
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <h3 className="pt-5">{Messages.ResultingPIB.Headings.Title.en}</h3>
        <p> {Messages.ResultingPIB.Headings.Description.en}</p>
        <section className="card">
          <div className="form-group px-4 py-4">
            <label htmlFor="pibQuestionWillResultInPIB">
              {Messages.ResultingPIB.Section.QuestionWillResultInPIB.en}
            </label>
            <div>
              <div className="form-group row">
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="will-resultPIB-radio"
                      value="YES"
                      checked={
                        agreementsAndInformationBanksForm
                          ?.personalInformationBanks?.willResultInPIB === 'YES'
                          ? true
                          : false
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
                      value="NO"
                      checked={
                        agreementsAndInformationBanksForm
                          ?.personalInformationBanks?.willResultInPIB === 'NO'
                          ? true
                          : false
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
              </div>
              {agreementsAndInformationBanksForm?.personalInformationBanks
                ?.willResultInPIB === 'YES' && (
                <div>
                  <div className="form-group">
                    <label className="pt-4" htmlFor="pibDescriptionType">
                      {Messages.ResultingPIB.Section.QuestionPIBDescription.en}
                    </label>
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
                  </div>
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
                            ?.personalInformationBanks?.otherGroupsInvolved ||
                          ''
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

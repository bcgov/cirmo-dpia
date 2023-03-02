import { useState } from 'react';
import Messages from './messages';
import InputText from '../../../common/InputText/InputText';

import { useOutletContext } from 'react-router-dom';
import { YesNoInputOptions } from '../../../../constant/constant';
import MDEditor from '@uiw/react-md-editor';
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import { PiaStateChangeHandlerType } from '../../../../pages/PIAIntakeForm';
import { IAgreementsAndInformationBanks } from './AgreementsAndInformationBanks';
import CustomInputDate from '../../../common/CustomInputDate';

const PIAAgreementsAndInformationBanks = () => {
  const [pia, piaStateChangeHandler] =
    useOutletContext<[IPiaForm, PiaStateChangeHandlerType]>();

  const defaultState: IAgreementsAndInformationBanks = {
    resultingPIB: {
      willResultInPIB: 'YES',
      descriptionInformationType: '',
      mainMinistryInvolved: '',
      otherMinistryInvolved: '',
      managingPersonName: '',
      managingPersonPhone: '',
    },
    involveISA: {
      willInvolveISA: 'YES',
      descriptionISA: '',
      mainMinistryInvolved: '',
      otherMinistryInvolved: '',
      businessContactPersonName: '',
      businessContactPersonPhone: '',
      ISAStartDate: null,
      ISAEndDate: null,
    },
  };
  const [
    agreementsAndInformationBanksForm,
    setAgreementsAndInformationBanksForm,
  ] = useState<IAgreementsAndInformationBanks>(
    pia.agreementsAndInformationBanks || defaultState,
  );

  const [isaStartDate, setIsaStartDate] = useState<Date | null>(null);
  const [isaEndDate, setIsaEndDate] = useState<Date | null>(null);

  const stateChangeHandler = (value: any, nestedKey: string) => {
    if (nestedKey) {
      const keyString = nestedKey.split('.');
      const key1 = keyString[0];
      const key2 = keyString[1];
      if (key1 === 'resultingPIB') {
        setAgreementsAndInformationBanksForm((state) => ({
          ...state,
          resultingPIB: {
            ...state.resultingPIB,
            [key2]: value,
          },
        }));
      } else if (key1 === 'involveISA') {
        setAgreementsAndInformationBanksForm((state) => ({
          ...state,
          involveISA: {
            ...state.involveISA,
            [key2]: value,
          },
        }));
      }
    }
    piaStateChangeHandler(
      agreementsAndInformationBanksForm,
      'agreementsAndInformationBanks',
    );
  };

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
                      agreementsAndInformationBanksForm?.involveISA
                        ?.willInvolveISA === 'YES'
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      stateChangeHandler(
                        e.target.value,
                        'involveISA.willInvolveISA',
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
                      agreementsAndInformationBanksForm?.involveISA
                        ?.willInvolveISA === 'NO'
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      stateChangeHandler(
                        e.target.value,
                        'involveISA.willInvolveISA',
                      )
                    }
                  />
                  No
                </div>
              </div>
            </div>

            {agreementsAndInformationBanksForm?.involveISA?.willInvolveISA ===
              'YES' && (
              <div>
                <div className="form-group">
                  <label className="pt-4" htmlFor="isaDescription">
                    {Messages.InvolveISA.Section.DescriptionISA.en}
                  </label>
                  <MDEditor
                    id="isaDescription"
                    preview="edit"
                    value={
                      agreementsAndInformationBanksForm?.involveISA
                        ?.descriptionISA || ''
                    }
                    onChange={(value) =>
                      stateChangeHandler(value, 'involveISA.descriptionISA')
                    }
                  />
                </div>
                <div className="row mt-2">
                  <div className="col">
                    <InputText
                      label="Main ministry or agency involved"
                      value={
                        agreementsAndInformationBanksForm?.involveISA
                          ?.mainMinistryInvolved || ''
                      }
                      required={true}
                      onChange={(e) => {
                        stateChangeHandler(
                          e.target.value,
                          'involveISA.mainMinistryInvolved',
                        );
                      }}
                    />
                  </div>
                  <div className="col ">
                    <InputText
                      label="Any other ministries, agencies, public bodies or organizations involved"
                      value={
                        agreementsAndInformationBanksForm?.involveISA
                          ?.otherMinistryInvolved || ''
                      }
                      required={true}
                      onChange={(e) => {
                        stateChangeHandler(
                          e.target.value,
                          'involveISA.otherMinistryInvolved',
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
                        agreementsAndInformationBanksForm?.involveISA
                          ?.businessContactPersonName || ''
                      }
                      onChange={(e) => {
                        stateChangeHandler(
                          e.target.value,
                          'involveISA.businessContactPersonName',
                        );
                      }}
                      required={true}
                    />
                  </div>
                  <div className="col">
                    <div>
                      <InputText
                        label="Business contact phone number of person responsible for maintaining the ISA"
                        id="businessContactPersonPhone"
                        className="mt-4"
                        value={
                          agreementsAndInformationBanksForm?.involveISA
                            ?.businessContactPersonPhone || ''
                        }
                        onChange={(e) => {
                          stateChangeHandler(
                            e.target.value,
                            'involveISA.businessContactPersonPhone',
                          );
                        }}
                        required={true}
                        type="text"
                      />
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
                          selected={isaStartDate === null ? null : isaStartDate}
                          onChange={(date: any) => setIsaStartDate(date)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="px-3 form-group">
                        <label id="end-date-label">ISA end date</label>
                        <CustomInputDate
                          key="isaEndDate"
                          placeholderText={'yyyy/mm/dd'}
                          dateFormat="yyyy/MM/dd"
                          selected={isaEndDate === null ? null : isaEndDate}
                          onChange={(date: any) => setIsaEndDate(date)}
                          required
                        />
                      </div>
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
                        agreementsAndInformationBanksForm?.resultingPIB
                          ?.willResultInPIB === 'YES'
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        stateChangeHandler(
                          e.target.value,
                          'resultingPIB.willResultInPIB',
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
                        agreementsAndInformationBanksForm?.resultingPIB
                          ?.willResultInPIB === ''
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        stateChangeHandler(
                          e.target.value,
                          'resultingPIB.willResultInPIB',
                        )
                      }
                    />
                    No
                  </div>
                </div>
              </div>
              {agreementsAndInformationBanksForm?.resultingPIB
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
                        agreementsAndInformationBanksForm?.resultingPIB
                          ?.descriptionInformationType || ''
                      }
                      onChange={(value) =>
                        stateChangeHandler(
                          value,
                          'resultingPIB.descriptionInformationType',
                        )
                      }
                    />
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <InputText
                        label="Main ministry or agency involved"
                        value={
                          agreementsAndInformationBanksForm?.resultingPIB
                            ?.mainMinistryInvolved || ''
                        }
                        required={true}
                        onChange={(e) => {
                          stateChangeHandler(
                            e.target.value,
                            'resultingPIB.mainMinistryInvolved',
                          );
                        }}
                      />
                    </div>
                    <div className="col ">
                      <InputText
                        label="Any other ministries, agencies, public bodies or organizations involved"
                        value={
                          agreementsAndInformationBanksForm?.resultingPIB
                            ?.otherMinistryInvolved || ''
                        }
                        required={true}
                        onChange={(e) => {
                          stateChangeHandler(
                            e.target.value,
                            'resultingPIB.otherMinistryInvolved',
                          );
                        }}
                      />
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col">
                      <InputText
                        label="Name of person responsible for managing the PIB"
                        id="managingPersonName"
                        value={
                          agreementsAndInformationBanksForm?.resultingPIB
                            ?.managingPersonName || ''
                        }
                        onChange={(e) => {
                          stateChangeHandler(
                            e.target.value,
                            'resultingPIB.managingPersonName',
                          );
                        }}
                        required={true}
                      />
                    </div>
                    <div className="col">
                      <InputText
                        label="Phone number of person responsible for managing the PIB"
                        id="managingPersonPhone"
                        value={
                          agreementsAndInformationBanksForm?.resultingPIB
                            ?.managingPersonPhone || ''
                        }
                        onChange={(e) => {
                          stateChangeHandler(
                            e.target.value,
                            'resultingPIB.managingPersonPhone',
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

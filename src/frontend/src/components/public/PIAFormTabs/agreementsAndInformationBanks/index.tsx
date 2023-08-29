import { useContext, useEffect, useMemo, useState } from 'react';
import Messages from './messages';
import InputText from '../../../common/InputText/InputText';
import MDEditor from '@uiw/react-md-editor';
import { IAgreementsAndInformationBanks } from './AgreementsAndInformationBanks';
import CustomInputDate from '../../../common/CustomInputDate';
import { dateToString, stringToDate } from '../../../../utils/date';
import { deepEqual } from '../../../../utils/object-comparison.util';
import { setNestedReactState } from '../../../../utils/object-modification.util';
import { YesNoInput } from '../../../../types/enums/yes-no.enum';
import PIBInputText from './viewPIBTextInput';
import ISAInputText from './viewISATextInput';
import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../../contexts/PiaFormContext';
import ViewComments from '../../../common/ViewComment';
import Radio from '../../../common/Radio';
import { PiaSections } from '../../../../types/enums/pia-sections.enum';

interface PIAAgreementsAndInformationBanksProps {
  hideViewComments: boolean;
}

const PIAAgreementsAndInformationBanks = ({
  hideViewComments,
}: PIAAgreementsAndInformationBanksProps) => {
  const {
    pia,
    commentCount,
    selectedSection,
    piaStateChangeHandler,
    isReadOnly,
    accessControl,
  } = useContext<IPiaFormContext>(PiaFormContext);

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

  const InvolveIsaRadio = [
    {
      index: 1,
      value: YesNoInput.YES,
      groupName: 'involve-isa-radio',
      isDefault:
        agreementsAndInformationBanksForm?.informationSharingAgreement
          ?.doesInvolveISA === YesNoInput.YES,
      changeHandler: (e: any) =>
        stateChangeHandler(
          e.target.value,
          'informationSharingAgreement.doesInvolveISA',
        ),
    },
    {
      index: 2,
      value: YesNoInput.NO,
      groupName: 'involve-isa-radio',
      isDefault:
        agreementsAndInformationBanksForm?.informationSharingAgreement
          ?.doesInvolveISA === YesNoInput.NO,
      changeHandler: (e: any) =>
        stateChangeHandler(
          e.target.value,
          'informationSharingAgreement.doesInvolveISA',
        ),
    },
  ];

  const WillResultPIBRadio = [
    {
      index: 1,
      value: YesNoInput.YES,
      groupName: 'will-resultPIB-radio',
      isDefault:
        agreementsAndInformationBanksForm?.personalInformationBanks
          ?.willResultInPIB === YesNoInput.YES,
      changeHandler: (e: any) =>
        stateChangeHandler(
          e.target.value,
          'personalInformationBanks.willResultInPIB',
        ),
    },
    {
      index: 2,
      value: YesNoInput.NO,
      groupName: 'will-resultPIB-radio',
      isDefault:
        agreementsAndInformationBanksForm?.personalInformationBanks
          ?.willResultInPIB === YesNoInput.NO,
      changeHandler: (e: any) =>
        stateChangeHandler(
          e.target.value,
          'personalInformationBanks.willResultInPIB',
        ),
    },
  ];

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
        <section
          className={`drop-shadow card p-4 p-md-5 ${
            selectedSection &&
            selectedSection ===
              PiaSections.AGREEMENTS_AND_INFORMATION_BANKS_INFORMATION_SHARING_AGREEMENT
              ? 'section-focus'
              : ''
          }`}
        >
          <div className="form-group">
            {!isReadOnly ? (
              <label htmlFor="pibQuestionWillResultInPIB">
                {Messages.InvolveISA.Section.QuestionInvolveISA.en}
              </label>
            ) : (
              <h4> {Messages.InvolveISA.Section.QuestionInvolveISA.en}</h4>
            )}
            <div className="form-group row ">
              {!isReadOnly ? (
                InvolveIsaRadio.map((radio, index) => (
                  <Radio key={index} {...radio} />
                ))
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
                      defaultTabEnable={true}
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
                      aria-label="Information Sharing Agreement Textarea Input"
                    />
                  ) : agreementsAndInformationBanksForm
                      .informationSharingAgreement.description ? (
                    <MDEditor.Markdown
                      source={
                        agreementsAndInformationBanksForm
                          .informationSharingAgreement.description
                      }
                      aria-label="Information Sharing Agreement Textarea Input Preview"
                    />
                  ) : (
                    <p>
                      <i>Not answered</i>
                    </p>
                  )}
                </div>
                {!isReadOnly ? (
                  <>
                    <div className="row mt-2 form__row--flex-end">
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
                    <div className="row mt-2 form__row--flex-end">
                      <div className="col">
                        <div className="form-group">
                          <label>
                            ISA start date
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
                          </label>
                        </div>
                      </div>
                      <div className="col">
                        <div className=" form-group ">
                          <label>
                            ISA end date
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
                          </label>
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
          {!hideViewComments && (
            <ViewComments
              count={
                commentCount?.[
                  PiaSections
                    .AGREEMENTS_AND_INFORMATION_BANKS_INFORMATION_SHARING_AGREEMENT
                ]
              }
              path={
                PiaSections.AGREEMENTS_AND_INFORMATION_BANKS_INFORMATION_SHARING_AGREEMENT
              }
            />
          )}
        </section>

        <h3 className="pt-5">{Messages.ResultingPIB.Headings.Title.en}</h3>
        <p> {Messages.ResultingPIB.Headings.Description.en}</p>
        <section
          className={`drop-shadow card p-4 p-md-5 ${
            selectedSection &&
            selectedSection ===
              PiaSections.AGREEMENTS_AND_INFORMATION_BANKS_PERSONAL_INFORMATION_BANKS
              ? 'section-focus'
              : ''
          }`}
        >
          <div className="form-group">
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
                  WillResultPIBRadio.map((radio, index) => (
                    <Radio key={index} {...radio} />
                  ))
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
                        defaultTabEnable={true}
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
                        aria-label="Personal Information Bank Textarea Input"
                      />
                    ) : agreementsAndInformationBanksForm
                        .personalInformationBanks.description ? (
                      <MDEditor.Markdown
                        source={
                          agreementsAndInformationBanksForm
                            ?.personalInformationBanks?.description
                        }
                        aria-label="Personal Information Bank Textarea Input Preview"
                      />
                    ) : (
                      <p>
                        <i>Not answered</i>
                      </p>
                    )}
                  </div>
                  {!isReadOnly ? (
                    <>
                      <div className="row mt-2 form__row--flex-end">
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
          {!hideViewComments && (
            <ViewComments
              count={
                commentCount?.[
                  PiaSections
                    .AGREEMENTS_AND_INFORMATION_BANKS_PERSONAL_INFORMATION_BANKS
                ]
              }
              path={
                PiaSections.AGREEMENTS_AND_INFORMATION_BANKS_PERSONAL_INFORMATION_BANKS
              }
            />
          )}
        </section>
      </div>
    </>
  );
};

export default PIAAgreementsAndInformationBanks;

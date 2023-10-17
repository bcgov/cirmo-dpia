import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import Radio from '../../../../common/Radio';
import { YesNoInput } from '../../../../../types/enums/yes-no.enum';
import Messages from './../helper/messages';
import { PiaSections } from '../../../../../types/enums/pia-sections.enum';
import InputText from '../../../../common/InputText/InputText';
import { dateToString, stringToDate } from '../../../../../utils/date';
import CustomInputDate from '../../../../common/CustomInputDate';
import ISAInputText from '../helper/viewISATextInput';
import ViewComments from '../../../../common/ViewComment';
import { InformationSharingAgreementProps } from '../helper/IAgreementsInfo-interface';
export const InformationSharingAgreementSection: React.FC<
  InformationSharingAgreementProps
> = ({
  agreementsAndInformationBanksForm,
  pia,
  selectedSection,
  isReadOnly,
  stateChangeHandler,
  showComments,
  commentCount,
  InvolvesRadioHelper,
}) => {
  return (
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
            InvolvesRadioHelper.map((radio, index) => (
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
              ) : agreementsAndInformationBanksForm.informationSharingAgreement
                  .description ? (
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
      {showComments && (
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
  );
};

export default InformationSharingAgreementSection;

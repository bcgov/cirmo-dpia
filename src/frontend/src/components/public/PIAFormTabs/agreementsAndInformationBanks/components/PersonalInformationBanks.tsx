import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import Radio from '../../../../common/Radio';
import { YesNoInput } from '../../../../../types/enums/yes-no.enum';
import { PersonalInformationBanksProps } from '../helper/IAgreementsInfo-interface';
import Messages from '../helper/messages';
import { PiaSections } from '../../../../../types/enums/pia-sections.enum';
import InputText from '../../../../common/InputText/InputText';
import ViewComments from '../../../../common/ViewComment';
import PIBInputText from '../helper/viewPIBTextInput';

// Define a functional component for the Personal Information Banks section
const PersonalInformationBanksSection: React.FC<
  PersonalInformationBanksProps
> = ({
  agreementsAndInformationBanksForm,
  pia,
  selectedSection,
  isReadOnly,
  stateChangeHandler,
  showComments,
  commentCount,
  WillResultPIBRadio,
}) => {
  return (
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
          <h4>{Messages.ResultingPIB.Section.QuestionWillResultInPIB.en}</h4>
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
                    {Messages.ResultingPIB.Section.QuestionPIBDescription.en}
                  </label>
                ) : (
                  <h4>
                    {Messages.ResultingPIB.Section.QuestionPIBDescription.en}
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
                ) : agreementsAndInformationBanksForm.personalInformationBanks
                    .description ? (
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
                </>
              ) : (
                <PIBInputText pia={pia} />
              )}
            </div>
          )}
        </div>
      </div>
      {showComments && (
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
  );
};

export default PersonalInformationBanksSection;

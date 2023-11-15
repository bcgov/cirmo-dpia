import { useContext, useEffect, useMemo, useState } from 'react';
import Messages from './helper/messages';
import {
  ISecurityPersonalInformation,
  SecurityPersonalInformationProps,
} from './security-personal-info-interface';
import Checkbox from '../../../common/Checkbox';
import { deepEqual } from '../../../../utils/object-comparison.util';
import { YesNoInput } from '../../../../types/enums/yes-no.enum';
import { setNestedReactState } from '../../../../utils/object-modification.util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../../contexts/PiaFormContext';
import ViewComments from '../../../common/ViewComment';
import Radio from '../../../common/Radio';
import { PiaSections } from '../../../../types/enums/pia-sections.enum';
import { RichTextEditor } from '@bcgov/citz-imb-richtexteditor';

export const SecurityPersonalInformation = ({
  showComments = true,
}: SecurityPersonalInformationProps) => {
  const {
    pia,
    commentCount,
    selectedSection,
    piaStateChangeHandler,
    isReadOnly,
    accessControl,
  } = useContext<IPiaFormContext>(PiaFormContext);

  if (accessControl) accessControl();

  const defaultState: ISecurityPersonalInformation = useMemo(
    () => ({
      digitalToolsAndSystems: {
        toolsAndAssessment: {
          involveDigitalToolsAndSystems: YesNoInput.YES,
          haveSecurityAssessment: YesNoInput.YES,
        },
        storage: {
          onGovServers: YesNoInput.YES,
          whereDetails: '',
        },
      },
      accessToPersonalInformation: {
        onlyCertainRolesAccessInformation: YesNoInput.NO,
        accessApproved: YesNoInput.NO,
        useAuditLogs: YesNoInput.NO,
        additionalStrategies: '',
      },
    }),
    [],
  );

  const initialFormState = useMemo(
    () => pia.securityPersonalInformation || defaultState,
    [defaultState, pia.securityPersonalInformation],
  );

  const [securityPersonalInformationForm, setSecurityPersonalInformationForm] =
    useState<ISecurityPersonalInformation>(initialFormState);

  const stateChangeHandler = (value: any, path: string) => {
    setNestedReactState(setSecurityPersonalInformationForm, path, value);
  };

  // State for rich text editors.
  const [whereDetails, setWhereDetails] = useState(
    securityPersonalInformationForm?.digitalToolsAndSystems?.storage
      ?.whereDetails ?? '',
  );
  const [additionalStrategies, setAdditionalStrategies] = useState(
    securityPersonalInformationForm?.accessToPersonalInformation
      .additionalStrategies ?? '',
  );

  // Update form state on rich text editor changes.
  useEffect(() => {
    stateChangeHandler(
      whereDetails,
      'digitalToolsAndSystems.storage.whereDetails',
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [whereDetails]);
  useEffect(() => {
    stateChangeHandler(
      additionalStrategies,
      'accessToPersonalInformation.additionalStrategies',
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [additionalStrategies]);

  // Show the editor unless isReadOnly and whereDetails is empty.
  const showEditorWhereDetails = !(isReadOnly && whereDetails === '');
  // Show the editor unless isReadOnly and additionalStrategies is empty.
  const showEditorAdditionalStrategies = !(
    isReadOnly && additionalStrategies === ''
  );

  const InvolveDigitalTools = [
    {
      index: 1,
      value: YesNoInput.YES,
      groupName: 'InvolveDigitalTools',
      groupLabel:
        'Does your initiative involve digital tools, databases or information systems?',
      isDefault:
        securityPersonalInformationForm?.digitalToolsAndSystems
          ?.toolsAndAssessment?.involveDigitalToolsAndSystems ===
        YesNoInput.YES,
      changeHandler: (e: any) =>
        stateChangeHandler(
          e.target.value,
          'digitalToolsAndSystems.toolsAndAssessment.involveDigitalToolsAndSystems',
        ),
    },
    {
      index: 2,
      value: YesNoInput.NO,
      groupName: 'InvolveDigitalTools',
      groupLabel:
        'Does your initiative involve digital tools, databases or information systems?',
      isDefault:
        securityPersonalInformationForm?.digitalToolsAndSystems
          ?.toolsAndAssessment?.involveDigitalToolsAndSystems === YesNoInput.NO,
      changeHandler: (e: any) =>
        stateChangeHandler(
          e.target.value,
          'digitalToolsAndSystems.toolsAndAssessment.involveDigitalToolsAndSystems',
        ),
    },
  ];

  const SecurityAssessment = [
    {
      index: 1,
      value: YesNoInput.YES,
      groupName: 'SecurityAssessment',
      groupLabel:
        'Do you or will you have a security assessment to help you ensure the initiative meets the reasonable security requirements of FOIPPA section 30?',
      isDefault:
        securityPersonalInformationForm?.digitalToolsAndSystems
          ?.toolsAndAssessment?.haveSecurityAssessment === YesNoInput.YES,
      changeHandler: (e: any) =>
        stateChangeHandler(
          e.target.value,
          'digitalToolsAndSystems.toolsAndAssessment.haveSecurityAssessment',
        ),
    },
    {
      index: 2,
      value: YesNoInput.NO,
      groupName: 'SecurityAssessment',
      groupLabel:
        'Do you or will you have a security assessment to help you ensure the initiative meets the reasonable security requirements of FOIPPA section 30?',
      isDefault:
        securityPersonalInformationForm?.digitalToolsAndSystems
          ?.toolsAndAssessment?.haveSecurityAssessment === YesNoInput.NO,
      changeHandler: (e: any) =>
        stateChangeHandler(
          e.target.value,
          'digitalToolsAndSystems.toolsAndAssessment.haveSecurityAssessment',
        ),
    },
  ];

  const Storage = [
    {
      index: 1,
      value: YesNoInput.YES,
      groupName: 'Storage',
      groupLabel:
        'Are all digital records stored on government servers and are all physical records stored in government offices with government security?',
      isDefault:
        securityPersonalInformationForm?.digitalToolsAndSystems?.storage
          ?.onGovServers === YesNoInput.YES,
      changeHandler: (e: any) =>
        stateChangeHandler(
          e.target.value,
          'digitalToolsAndSystems.storage.onGovServers',
        ),
    },
    {
      index: 2,
      value: YesNoInput.NO,
      groupName: 'Storage',
      groupLabel:
        'Are all digital records stored on government servers and are all physical records stored in government offices with government security?',
      isDefault:
        securityPersonalInformationForm?.digitalToolsAndSystems?.storage
          ?.onGovServers === YesNoInput.NO,
      changeHandler: (e: any) =>
        stateChangeHandler(
          e.target.value,
          'digitalToolsAndSystems.storage.onGovServers',
        ),
    },
  ];

  // passing updated data to parent for auto-save to work efficiently only if there are changes
  useEffect(() => {
    if (!deepEqual(initialFormState, securityPersonalInformationForm)) {
      piaStateChangeHandler(
        securityPersonalInformationForm,
        'securityPersonalInformation',
      );
    }
  }, [
    piaStateChangeHandler,
    securityPersonalInformationForm,
    initialFormState,
  ]);

  return (
    <>
      <div>
        <h2>{Messages.PageTitle.en}</h2>
        <p>{Messages.PageDescription.en}</p>
        <section className="section__padding-block">
          <h3 className="form__h2">
            {Messages.FormElements.DigitalTools.SectionTitle.en}
          </h3>
          <div
            className={`drop-shadow card p-4 p-md-5 ${
              selectedSection &&
              selectedSection ===
                PiaSections.SECURITY_OF_PERSONAL_INFORMATION_DIGITAL_TOOLS_AND_SYSTEMS_TOOLS_AND_ASSESSMENT
                ? 'section-focus'
                : ''
            }`}
          >
            {!isReadOnly ? (
              <p>
                <strong>
                  {
                    Messages.FormElements.DigitalTools.InvolveDigitalTools
                      .Question.en
                  }
                </strong>
              </p>
            ) : (
              <h4>
                {
                  Messages.FormElements.DigitalTools.InvolveDigitalTools
                    .Question.en
                }
              </h4>
            )}
            {!isReadOnly ? (
              InvolveDigitalTools.map((radio, index) => (
                <Radio key={index} {...radio} />
              ))
            ) : (
              <p>
                {securityPersonalInformationForm.digitalToolsAndSystems.toolsAndAssessment.involveDigitalToolsAndSystems.charAt(
                  0,
                )}
                {securityPersonalInformationForm.digitalToolsAndSystems.toolsAndAssessment.involveDigitalToolsAndSystems
                  .slice(1)
                  .toLowerCase()}
              </p>
            )}
            {securityPersonalInformationForm?.digitalToolsAndSystems
              .toolsAndAssessment.involveDigitalToolsAndSystems ===
              YesNoInput.YES &&
              !isReadOnly && (
                <div>
                  <p className="callout-container section__margin-block">
                    {
                      Messages.FormElements.DigitalTools.InvolveDigitalTools
                        .Note.en
                    }
                  </p>
                </div>
              )}
            <div className="section__padding-block">
              {!isReadOnly ? (
                <p>
                  <strong>
                    {
                      Messages.FormElements.DigitalTools.SecurityAssessment
                        .Question.PartOne.en
                    }
                    <a
                      href={
                        Messages.FormElements.DigitalTools.SecurityAssessment
                          .Question.LinkHrefOne
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {
                        Messages.FormElements.DigitalTools.SecurityAssessment
                          .Question.LinkTextOne.en
                      }
                      <FontAwesomeIcon icon={faUpRightFromSquare} />
                    </a>
                    {
                      Messages.FormElements.DigitalTools.SecurityAssessment
                        .Question.PartTwo.en
                    }
                    <a
                      href={
                        Messages.FormElements.DigitalTools.SecurityAssessment
                          .Question.LinkHrefTwo
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {
                        Messages.FormElements.DigitalTools.SecurityAssessment
                          .Question.LinkTextTwo.en
                      }
                      <FontAwesomeIcon icon={faUpRightFromSquare} />
                    </a>
                    {
                      Messages.FormElements.DigitalTools.SecurityAssessment
                        .Question.PartThree.en
                    }
                  </strong>
                </p>
              ) : (
                <h4>
                  {
                    Messages.FormElements.DigitalTools.SecurityAssessment
                      .Question.PartOne.en
                  }
                  <a
                    href={
                      Messages.FormElements.DigitalTools.SecurityAssessment
                        .Question.LinkHrefOne
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {
                      Messages.FormElements.DigitalTools.SecurityAssessment
                        .Question.LinkTextOne.en
                    }
                    <FontAwesomeIcon icon={faUpRightFromSquare} />
                  </a>
                  {
                    Messages.FormElements.DigitalTools.SecurityAssessment
                      .Question.PartTwo.en
                  }
                  <a
                    href={
                      Messages.FormElements.DigitalTools.SecurityAssessment
                        .Question.LinkHrefTwo
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {
                      Messages.FormElements.DigitalTools.SecurityAssessment
                        .Question.LinkTextTwo.en
                    }
                    <FontAwesomeIcon icon={faUpRightFromSquare} />
                  </a>
                  {
                    Messages.FormElements.DigitalTools.SecurityAssessment
                      .Question.PartThree.en
                  }
                </h4>
              )}
              {!isReadOnly ? (
                SecurityAssessment.map((radio, index) => (
                  <Radio key={index} {...radio} />
                ))
              ) : (
                <p>
                  {securityPersonalInformationForm.digitalToolsAndSystems.toolsAndAssessment.haveSecurityAssessment.charAt(
                    0,
                  )}
                  {securityPersonalInformationForm.digitalToolsAndSystems.toolsAndAssessment.haveSecurityAssessment
                    .slice(1)
                    .toLowerCase()}
                </p>
              )}
            </div>
            {showComments && (
              <ViewComments
                count={
                  commentCount?.[
                    PiaSections
                      .SECURITY_OF_PERSONAL_INFORMATION_DIGITAL_TOOLS_AND_SYSTEMS_TOOLS_AND_ASSESSMENT
                  ]
                }
                path={
                  PiaSections.SECURITY_OF_PERSONAL_INFORMATION_DIGITAL_TOOLS_AND_SYSTEMS_TOOLS_AND_ASSESSMENT
                }
              />
            )}
          </div>

          {securityPersonalInformationForm?.digitalToolsAndSystems
            .toolsAndAssessment.haveSecurityAssessment === YesNoInput.NO && (
            <div
              className={`section__margin-block drop-shadow card p-4 p-md-5 ${
                selectedSection &&
                selectedSection ===
                  PiaSections.SECURITY_OF_PERSONAL_INFORMATION_DIGITAL_TOOLS_AND_SYSTEMS_STORAGE
                  ? 'section-focus'
                  : ''
              }`}
            >
              {!isReadOnly ? (
                <p>
                  <strong>
                    {Messages.FormElements.DigitalTools.Storage.Question.en}
                  </strong>
                </p>
              ) : (
                <h4>
                  {Messages.FormElements.DigitalTools.Storage.Question.en}
                </h4>
              )}
              {!isReadOnly ? (
                Storage.map((radio, index) => <Radio key={index} {...radio} />)
              ) : (
                <p>{`${securityPersonalInformationForm.digitalToolsAndSystems.storage.onGovServers.charAt(
                  0,
                )}${securityPersonalInformationForm.digitalToolsAndSystems.storage.onGovServers
                  .slice(1)
                  .toLowerCase()}`}</p>
              )}
              {securityPersonalInformationForm?.digitalToolsAndSystems.storage
                .onGovServers === YesNoInput.NO && (
                <div className="section__padding-block">
                  {!isReadOnly ? (
                    <p>
                      <strong>
                        {
                          Messages.FormElements.DigitalTools.StorageDescription
                            .Question.en
                        }
                      </strong>
                    </p>
                  ) : (
                    <h4>
                      {
                        Messages.FormElements.DigitalTools.StorageDescription
                          .Question.en
                      }
                    </h4>
                  )}
                  {showEditorWhereDetails ? (
                    <RichTextEditor
                      content={whereDetails}
                      setContent={setWhereDetails}
                      readOnly={isReadOnly}
                      aria-label="Digital Tools and Systems Storage Where Details Input"
                    />
                  ) : (
                    <i>Not answered</i>
                  )}
                </div>
              )}
              {showComments && (
                <ViewComments
                  count={
                    commentCount?.[
                      PiaSections
                        .SECURITY_OF_PERSONAL_INFORMATION_DIGITAL_TOOLS_AND_SYSTEMS_STORAGE
                    ]
                  }
                  path={
                    PiaSections.SECURITY_OF_PERSONAL_INFORMATION_DIGITAL_TOOLS_AND_SYSTEMS_STORAGE
                  }
                />
              )}
            </div>
          )}
        </section>

        <section className="section__padding-block">
          <h3 className="form__h2">
            {Messages.FormElements.AccessPI.SectionTitle.en}
          </h3>
          <div
            className={`drop-shadow card p-4 p-md-5 ${
              selectedSection &&
              selectedSection ===
                PiaSections.SECURITY_OF_PERSONAL_INFORMATION_ACCESS_TO_PERSONAL_INFORMATION
                ? 'section-focus'
                : ''
            }`}
          >
            {!isReadOnly ? (
              <>
                <p>
                  <strong>
                    {Messages.FormElements.AccessPI.SectionSuHeading.en}
                  </strong>
                </p>
                <p>{Messages.FormElements.AccessPI.SectionDescription.en}</p>
              </>
            ) : (
              <h4>{Messages.FormElements.AccessPI.SectionSuHeading.en}</h4>
            )}
            <div>
              <div className="section__margin-block checkbox-default">
                <Checkbox
                  checked={
                    securityPersonalInformationForm?.accessToPersonalInformation
                      ?.onlyCertainRolesAccessInformation === YesNoInput.YES
                  }
                  value="AccessPI"
                  label={
                    Messages.FormElements.AccessPI.OnlyCertainRolesAccessInfo
                      .Question.en
                  }
                  readOnly={isReadOnly}
                  onChange={(e) =>
                    stateChangeHandler(
                      e.target.checked ? YesNoInput.YES : YesNoInput.NO,
                      'accessToPersonalInformation.onlyCertainRolesAccessInformation',
                    )
                  }
                />
              </div>
              <div className="section__margin-block checkbox-default">
                <Checkbox
                  checked={
                    securityPersonalInformationForm?.accessToPersonalInformation
                      ?.accessApproved === YesNoInput.YES
                  }
                  value="NeedAccess"
                  label={Messages.FormElements.AccessPI.NeedAccess.Question.en}
                  readOnly={isReadOnly}
                  onChange={(e) =>
                    stateChangeHandler(
                      e.target.checked ? YesNoInput.YES : YesNoInput.NO,
                      'accessToPersonalInformation.accessApproved',
                    )
                  }
                />
              </div>
              <div className="section__margin-block checkbox-default">
                <Checkbox
                  checked={
                    securityPersonalInformationForm?.accessToPersonalInformation
                      ?.useAuditLogs === YesNoInput.YES
                  }
                  value="useAuditLogs"
                  label={Messages.FormElements.AccessPI.auditLogs.Question.en}
                  readOnly={isReadOnly}
                  onChange={(e) =>
                    stateChangeHandler(
                      e.target.checked ? YesNoInput.YES : YesNoInput.NO,
                      'accessToPersonalInformation.useAuditLogs',
                    )
                  }
                />
              </div>
            </div>
            <div className="section__padding-block">
              {!isReadOnly ? (
                <p>
                  <strong>
                    {
                      Messages.FormElements.AccessPI.DescribeStratergies
                        .Question.en
                    }
                  </strong>
                </p>
              ) : (
                <h4>
                  {
                    Messages.FormElements.AccessPI.DescribeStratergies.Question
                      .en
                  }
                </h4>
              )}
              {showEditorAdditionalStrategies ? (
                <RichTextEditor
                  content={additionalStrategies}
                  setContent={setAdditionalStrategies}
                  readOnly={isReadOnly}
                  aria-label="Access to Personal Information Additional Strategies Input"
                />
              ) : (
                <i>Not answered</i>
              )}
            </div>
            {showComments && (
              <ViewComments
                count={
                  commentCount?.[
                    PiaSections
                      .SECURITY_OF_PERSONAL_INFORMATION_ACCESS_TO_PERSONAL_INFORMATION
                  ]
                }
                path={
                  PiaSections.SECURITY_OF_PERSONAL_INFORMATION_ACCESS_TO_PERSONAL_INFORMATION
                }
              />
            )}
          </div>
        </section>
      </div>
    </>
  );
};

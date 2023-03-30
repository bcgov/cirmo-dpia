import MDEditor from '@uiw/react-md-editor';
import { useEffect, useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PiaStateChangeHandlerType } from '../../../../pages/PIAForm';
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import Messages from './helper/messages';
import { ISecurityPersonalInformation } from './security-personal-info-interface';
import Checkbox from '../../../common/Checkbox';
import { deepEqual } from '../../../../utils/object-comparison.util';
import { YesNoInput } from '../../../../types/enums/yes-no.enum';
import { setNestedReactState } from '../../../../utils/object-modification.util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

export const SecurityPersonalInformation = () => {
  const [pia, piaStateChangeHandler, isReadOnly, accessControl] =
    useOutletContext<
      [IPiaForm, PiaStateChangeHandlerType, boolean, () => void]
    >();

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
          <div className="drop-shadow card p-4 p-md-5">
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
              <div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="InvolveDigitalTools"
                    value={YesNoInput.YES}
                    checked={
                      securityPersonalInformationForm?.digitalToolsAndSystems
                        ?.toolsAndAssessment?.involveDigitalToolsAndSystems ===
                      YesNoInput.YES
                    }
                    onChange={(e) =>
                      stateChangeHandler(
                        e.target.value,
                        'digitalToolsAndSystems.toolsAndAssessment.involveDigitalToolsAndSystems',
                      )
                    }
                  />
                  Yes
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="InvolveDigitalTools"
                    value={YesNoInput.NO}
                    checked={
                      securityPersonalInformationForm?.digitalToolsAndSystems
                        ?.toolsAndAssessment?.involveDigitalToolsAndSystems ===
                      YesNoInput.NO
                    }
                    onChange={(e) =>
                      stateChangeHandler(
                        e.target.value,
                        'digitalToolsAndSystems.toolsAndAssessment.involveDigitalToolsAndSystems',
                      )
                    }
                  />
                  No
                </div>
              </div>
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
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="SecurityAssessment"
                      value={YesNoInput.YES}
                      checked={
                        securityPersonalInformationForm?.digitalToolsAndSystems
                          ?.toolsAndAssessment?.haveSecurityAssessment ===
                        YesNoInput.YES
                      }
                      onChange={(e) =>
                        stateChangeHandler(
                          e.target.value,
                          'digitalToolsAndSystems.toolsAndAssessment.haveSecurityAssessment',
                        )
                      }
                    />
                    Yes
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="SecurityAssessment"
                      value={YesNoInput.NO}
                      checked={
                        securityPersonalInformationForm?.digitalToolsAndSystems
                          ?.toolsAndAssessment?.haveSecurityAssessment ===
                        YesNoInput.NO
                      }
                      onChange={(e) =>
                        stateChangeHandler(
                          e.target.value,
                          'digitalToolsAndSystems.toolsAndAssessment.haveSecurityAssessment',
                        )
                      }
                    />
                    No
                  </div>
                </div>
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
          </div>

          {securityPersonalInformationForm?.digitalToolsAndSystems
            .toolsAndAssessment.haveSecurityAssessment === YesNoInput.NO && (
            <div className="section__margin-block drop-shadow card p-4 p-md-5">
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
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="Storage"
                      value={YesNoInput.YES}
                      checked={
                        securityPersonalInformationForm?.digitalToolsAndSystems
                          ?.storage?.onGovServers === YesNoInput.YES
                      }
                      onChange={(e) =>
                        stateChangeHandler(
                          e.target.value,
                          'digitalToolsAndSystems.storage.onGovServers',
                        )
                      }
                    />
                    Yes
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="Storage"
                      value={YesNoInput.NO}
                      checked={
                        securityPersonalInformationForm?.digitalToolsAndSystems
                          ?.storage?.onGovServers === YesNoInput.NO
                      }
                      onChange={(e) =>
                        stateChangeHandler(
                          e.target.value,
                          'digitalToolsAndSystems.storage.onGovServers',
                        )
                      }
                    />
                    No
                  </div>
                </div>
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
                  {!isReadOnly ? (
                    <MDEditor
                      preview="edit"
                      defaultTabEnable={true}
                      value={
                        securityPersonalInformationForm?.digitalToolsAndSystems
                          ?.storage?.whereDetails || ''
                      }
                      onChange={(value) =>
                        stateChangeHandler(
                          value,
                          'digitalToolsAndSystems.storage.whereDetails',
                        )
                      }
                    />
                  ) : securityPersonalInformationForm.digitalToolsAndSystems
                      .storage.whereDetails ? (
                    <MDEditor.Markdown
                      source={
                        securityPersonalInformationForm?.digitalToolsAndSystems
                          ?.storage?.whereDetails
                      }
                    />
                  ) : (
                    <p>
                      <i>Not answered</i>
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </section>

        <section className="section__padding-block">
          <h3 className="form__h2">
            {Messages.FormElements.AccessPI.SectionTitle.en}
          </h3>
          <div className="drop-shadow card p-4 p-md-5">
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
              {!isReadOnly ? (
                <MDEditor
                  preview="edit"
                  defaultTabEnable={true}
                  value={
                    securityPersonalInformationForm.accessToPersonalInformation
                      .additionalStrategies || ''
                  }
                  onChange={(value) =>
                    stateChangeHandler(
                      value,
                      'accessToPersonalInformation.additionalStrategies',
                    )
                  }
                />
              ) : securityPersonalInformationForm.accessToPersonalInformation
                  .additionalStrategies ? (
                <MDEditor.Markdown
                  source={
                    securityPersonalInformationForm.accessToPersonalInformation
                      .additionalStrategies
                  }
                />
              ) : (
                <p>
                  <i>Not answered</i>
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

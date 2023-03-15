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
          onGovServers: YesNoInput.NO,
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
          <div className="drop-shadow section__padding-inline bg-white section__padding-block section-border-radius">
            <p>
              <strong>
                {
                  Messages.FormElements.DigitalTools.InvolveDigitalTools
                    .Question.en
                }
              </strong>
            </p>
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
                  value="NO"
                  checked={
                    securityPersonalInformationForm?.digitalToolsAndSystems
                      ?.toolsAndAssessment?.involveDigitalToolsAndSystems ===
                    'NO'
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
            {securityPersonalInformationForm?.digitalToolsAndSystems
              .toolsAndAssessment.involveDigitalToolsAndSystems ===
              YesNoInput.YES && (
              <div>
                <p className="callout-container section__margin-block">
                  {
                    Messages.FormElements.DigitalTools.InvolveDigitalTools.Note
                      .en
                  }
                </p>
              </div>
            )}
            <div className="section__padding-block">
              <p>
                <strong>
                  {
                    Messages.FormElements.DigitalTools.SecurityAssesment
                      .Question.en
                  }
                </strong>
              </p>
              <div className="">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="SecurityAssesment"
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
                    name="SecurityAssesment"
                    value="NO"
                    checked={
                      securityPersonalInformationForm?.digitalToolsAndSystems
                        ?.toolsAndAssessment?.haveSecurityAssessment === 'NO'
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
            </div>
          </div>

          {securityPersonalInformationForm?.digitalToolsAndSystems
            .toolsAndAssessment.haveSecurityAssessment === 'NO' && (
            <div className="bg-white section__padding-block section__margin-block section__padding-inline section-border-radius">
              <p>
                <strong>
                  {Messages.FormElements.DigitalTools.Storage.Question.en}
                </strong>
              </p>
              <div className="">
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
                    value="NO"
                    checked={
                      securityPersonalInformationForm?.digitalToolsAndSystems
                        ?.storage?.onGovServers === 'NO'
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
              {securityPersonalInformationForm?.digitalToolsAndSystems.storage
                .onGovServers === 'NO' && (
                <div className="section__padding-block">
                  <div>
                    <strong>
                      {
                        Messages.FormElements.DigitalTools.StorageDescription
                          .Question.en
                      }
                    </strong>
                  </div>
                  <MDEditor
                    preview="edit"
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
                </div>
              )}
            </div>
          )}
        </section>

        <section className="section__padding-block">
          <h3 className="form__h2">
            {Messages.FormElements.AccessPI.SectionTitle.en}
          </h3>
          <div className="drop-shadow section__padding-inline bg-white section__padding-block section-border-radius">
            <p>
              <strong>
                {Messages.FormElements.AccessPI.SectionSuHeading.en}
              </strong>
            </p>
            <p>{Messages.FormElements.AccessPI.SectionDescription.en}</p>
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
              <div>
                <strong>
                  {
                    Messages.FormElements.AccessPI.DescribeStratergies.Question
                      .en
                  }
                </strong>
              </div>
              <MDEditor
                preview="edit"
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
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

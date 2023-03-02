import MDEditor from '@uiw/react-md-editor';
import { ChangeEvent, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PiaStateChangeHandlerType } from '../../../../pages/PIAIntakeForm';
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import Messages from './helper/messages';
import { ISecurityPersonalInformation } from './security-personal-info-interface';
import Callout from '../../../common/Callout';

export const SecurityPersonalInformation = () => {
  const [pia, piaStateChangeHandler] =
    useOutletContext<[IPiaForm, PiaStateChangeHandlerType]>();

  const defaultState: ISecurityPersonalInformation = {
    digitalToolsAndSystems: {
      toolsAndAssessment: {
        involveDigitalToolsAndSystems: 'YES',
        haveSecurityAssessment: 'NO',
      },
      storage: {
        onGovServers: 'NO',
        whereDetails: '',
      },
    },
    accessToPersonalInformation: {
      onlyCertainRolesAccessInformation: 'NO',
      accessApproved: 'NO',
      useAuditLogs: 'NO',
      additionalStrategies: '',
    },
  };

  const [securityPersonalInformationForm, setSecurityPersonalInformationForm] =
    useState<ISecurityPersonalInformation>(
      pia.securityPersonalInformation || defaultState,
    );

  const stateChangeHandler = (value: any, nestedkey: string) => {
    if (nestedkey) {
      const keyString = nestedkey.split('.');
      if (keyString.length == 3) {
        const Key1 = keyString[0];
        const Key2 = keyString[1];
        const Key3 = keyString[2];
        console.log(Key1, Key2, Key3);
        console.log('Value is' + value);
        if (Key1 === 'digitalToolsAndSystems') {
          if (Key2 === 'toolsAndAssessment') {
            setSecurityPersonalInformationForm((state) => ({
              ...state,
              digitalToolsAndSystems: {
                ...state.digitalToolsAndSystems,
                toolsAndAssessment: {
                  ...state.digitalToolsAndSystems?.toolsAndAssessment,
                  [Key3]: value,
                },
              },
            }));
          }
          if (Key2 === 'storage') {
            setSecurityPersonalInformationForm((state) => ({
              ...state,
              digitalToolsAndSystems: {
                ...state.digitalToolsAndSystems,
                storage: {
                  ...state.digitalToolsAndSystems?.storage,
                  [Key3]: value,
                },
              },
            }));
          }
        }
      }
      if (keyString.length == 2) {
        const Key1 = keyString[0];
        const Key2 = keyString[1];
        setSecurityPersonalInformationForm((state) => ({
          ...state,
          accessToPersonalInformation: {
            ...state.accessToPersonalInformation,
            [Key2]: value,
          },
        }));
      }
    }
    piaStateChangeHandler(
      securityPersonalInformationForm,
      'securityPersonalInformation',
    );
  };

  return (
    <>
      <div className="">
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
            <div className="">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="InvolveDigitalTools"
                  value="YES"
                  checked={
                    securityPersonalInformationForm?.digitalToolsAndSystems
                      ?.toolsAndAssessment?.involveDigitalToolsAndSystems ===
                    'YES'
                      ? true
                      : false
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
                      ? true
                      : false
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
              .toolsAndAssessment.involveDigitalToolsAndSystems === 'YES' && (
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
                    value="YES"
                    checked={
                      securityPersonalInformationForm?.digitalToolsAndSystems
                        ?.toolsAndAssessment?.haveSecurityAssessment === 'YES'
                        ? true
                        : false
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
                        ? true
                        : false
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
                    value="YES"
                    checked={
                      securityPersonalInformationForm?.digitalToolsAndSystems
                        ?.storage?.onGovServers === 'YES'
                        ? true
                        : false
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
                        ? true
                        : false
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
                  <p>
                    <strong>
                      {
                        Messages.FormElements.DigitalTools.StorageDescription
                          .Question.en
                      }
                    </strong>
                  </p>
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
            <div className="form-check">
              <div className="section__margin-block">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="AccessPI"
                  value="YES"
                  checked={
                    securityPersonalInformationForm?.accessToPersonalInformation
                      ?.onlyCertainRolesAccessInformation === 'YES'
                      ? true
                      : false
                  }
                  onChange={(e) =>
                    stateChangeHandler(
                      e.target.value,
                      'accessToPersonalInformation.onlyCertainRolesAccessInformation',
                    )
                  }
                />
                {
                  Messages.FormElements.AccessPI.OnlyCertainRolesAccessInfo
                    .Question.en
                }
              </div>
              <div className="section__margin-block">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="NeedAccess"
                  value="YES"
                  checked={
                    securityPersonalInformationForm?.accessToPersonalInformation
                      ?.accessApproved === 'YES'
                      ? true
                      : false
                  }
                  onChange={(e) =>
                    stateChangeHandler(
                      e.target.value,
                      'accessToPersonalInformation.accessApproved',
                    )
                  }
                />
                {Messages.FormElements.AccessPI.NeedAccess.Question.en}
              </div>
              <div className="section__margin-block">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="AuditLogs"
                  value="YES"
                  checked={
                    securityPersonalInformationForm?.accessToPersonalInformation
                      ?.useAuditLogs === 'YES'
                      ? true
                      : false
                  }
                  onChange={(e) =>
                    stateChangeHandler(
                      e.target.value,
                      'accessToPersonalInformation.useAuditLogs',
                    )
                  }
                />
                {Messages.FormElements.AccessPI.auditLogs.Question.en}
              </div>
            </div>
            <div className="section__padding-block">
              <p>
                <strong>
                  {
                    Messages.FormElements.AccessPI.DescribeStratergies.Question
                      .en
                  }
                </strong>
              </p>
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

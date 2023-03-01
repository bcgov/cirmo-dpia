import { useState } from 'react';
import Messages from './messages';
import InputText from '../../../common/InputText/InputText';

import { useOutletContext } from 'react-router-dom';
import { YesNoInputOptions } from '../../../../constant/constant';
import MDEditor from '@uiw/react-md-editor';
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import { PiaStateChangeHandlerType } from '../../../../pages/PIAIntakeForm';
import { IPersonalInformationBanks } from './PersonalInformationBanks';

const PIAPersonalInformationBanks = () => {
  const [pia, piaStateChangeHandler] =
    useOutletContext<[IPiaForm, PiaStateChangeHandlerType]>();

  const [personalInformationBanksForm, setPersonalInformationBanksForm] =
    useState<IPersonalInformationBanks>(
      pia.personalInformationBanks || {
        resultingPIB: {},
      },
    );
  const [resultingPIB, setResultingPIB] = useState({
    willResultInPIB: 'YES',
    descriptionInformationType: '',
    mainMinistryInvolved: '',
    otherMinistryInvolved: '',
    managingPersonName: '',
    managingPersonPhone: '',
  });
  const stateChangeHandler = (
    value: any,
    key: keyof IPersonalInformationBanks,
  ) => {
    setPersonalInformationBanksForm((state) => ({
      ...state,
      [key]: value,
    }));
    piaStateChangeHandler(
      personalInformationBanksForm,
      'personalInformationBanks',
    );
  };
  const [containsPIBs, setContainsPIBs] = useState(
    personalInformationBanksForm?.resultingPIB?.willResultInPIB || 'YES',
  );
  const [PIBDescriptionType, setPIBDescriptionType] = useState(
    personalInformationBanksForm?.resultingPIB?.descriptionInformationType ||
      '',
  );
  const [mainMinistryInvolved, setMainMinistryInvolved] = useState(
    personalInformationBanksForm?.resultingPIB?.mainMinistryInvolved || '',
  );
  const [PIBManagingPersonName, setPIBManagingPersonName] = useState(
    personalInformationBanksForm?.resultingPIB?.managingPersonName || '',
  );
  const [otherMinistryInvolved, setOtherMinistryInvolved] = useState(
    personalInformationBanksForm?.resultingPIB?.otherMinistryInvolved || '',
  );
  const [PIBManagingPersonPhone, setPIBManagingPersonPhone] = useState(
    personalInformationBanksForm?.resultingPIB?.managingPersonPhone || '',
  );

  const choosePIBs = (event: any) => {
    const containsPIB = event.target.value === 'Yes' ? 'YES' : 'NO';
    setContainsPIBs(containsPIB);
    // if user choose no, reset all the value in the form json object
    if (containsPIB === 'NO') {
      setResultingPIB({
        willResultInPIB: 'NO',
        descriptionInformationType: '',
        mainMinistryInvolved: '',
        otherMinistryInvolved: '',
        managingPersonName: '',
        managingPersonPhone: '',
      });
    } else {
      setResultingPIB({
        ...resultingPIB,
        willResultInPIB: containsPIB,
      });
    }

    stateChangeHandler(resultingPIB, 'resultingPIB');
  };
  const handlePIBDescriptionTypeChange = (newMessage = '') => {
    setPIBDescriptionType(newMessage);
    setResultingPIB({
      ...resultingPIB,
      descriptionInformationType: newMessage,
    });
    stateChangeHandler(resultingPIB, 'resultingPIB');
  };

  return (
    <div>
      <h2 className="results-header">
        <b>{Messages.Headings.Title.en}</b>
      </h2>
      <p> {Messages.Headings.Description.en}</p>
      <h3 className="pt-4 pb-3">{Messages.Section.Title.en}</h3>
      <section className="card">
        <div className="form-group px-4 py-4">
          <label htmlFor="pibQuestionWillResultInPIB">
            {Messages.Section.QuestionWillResultInPIB.en}
          </label>
          <div>
            <div className="form-group row">
              <div>
                {YesNoInputOptions.map((option, index) => {
                  return YesNoInputOptions[0] === option ? (
                    <div key={index} onChange={choosePIBs}>
                      <label className="input-label">
                        <input
                          key={index}
                          type="radio"
                          name="start-initiative-radio"
                          value={option}
                          checked={containsPIBs === 'YES'}
                        />
                        {option}
                      </label>
                    </div>
                  ) : (
                    <div key={index} onChange={choosePIBs}>
                      <label className="input-label">
                        <input
                          key={index}
                          type="radio"
                          name="start-initiative-radio"
                          value={option}
                          checked={containsPIBs === 'NO'}
                        />
                        {option}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            {containsPIBs === 'YES' && (
              <div>
                <div className="form-group">
                  <label className="pt-4" htmlFor="pibDescriptionType">
                    {Messages.Section.QuestionPIBDescription.en}
                  </label>
                  <MDEditor
                    id="pibDescriptionType"
                    preview="edit"
                    value={PIBDescriptionType}
                    onChange={handlePIBDescriptionTypeChange}
                  />
                </div>
                <div className="row mt-2">
                  <div className="col">
                    <InputText
                      label="Main ministry or agency involved"
                      value={mainMinistryInvolved}
                      required={true}
                      onChange={(e) => {
                        setMainMinistryInvolved(e.target.value);
                        setResultingPIB({
                          ...resultingPIB,
                          mainMinistryInvolved: e.target.value,
                        });
                        stateChangeHandler(resultingPIB, 'resultingPIB');
                      }}
                    />
                  </div>
                  <div className="col ">
                    <InputText
                      label="Any other ministries, agencies, public bodies or organizations involved"
                      value={otherMinistryInvolved}
                      required={true}
                      onChange={(e) => {
                        setOtherMinistryInvolved(e.target.value);
                        setResultingPIB({
                          ...resultingPIB,
                          otherMinistryInvolved: e.target.value,
                        });
                        stateChangeHandler(resultingPIB, 'resultingPIB');
                      }}
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col">
                    <InputText
                      label="Name of person responsible for managing the PIB"
                      id="PIBresponsiblePersonal"
                      value={PIBManagingPersonName}
                      onChange={(e) => {
                        setPIBManagingPersonName(e.target.value);
                        setResultingPIB({
                          ...resultingPIB,
                          managingPersonName: e.target.value,
                        });
                        stateChangeHandler(resultingPIB, 'resultingPIB');
                      }}
                      required={true}
                    />
                  </div>
                  <div className="col">
                    <InputText
                      label="Phone number of person responsible for managing the PIB"
                      id="drafterEmail"
                      value={PIBManagingPersonPhone}
                      onChange={(e) => {
                        setPIBManagingPersonPhone(e.target.value);
                        setResultingPIB({
                          ...resultingPIB,
                          managingPersonPhone: e.target.value,
                        });
                        stateChangeHandler(resultingPIB, 'resultingPIB');
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
  );
};

export default PIAPersonalInformationBanks;

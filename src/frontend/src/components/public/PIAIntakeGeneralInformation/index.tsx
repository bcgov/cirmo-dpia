import { useState } from 'react';
import { MinistryList } from '../../../constant/constant';
import { IPiaForm } from '../../../types/interfaces/pia-form.interface';
import { dateToString } from '../../../utils/date';

interface IGeneralInformationProps {
  pia: IPiaForm;
}

const PIAIntakeGeneralInformation = ({ pia }: IGeneralInformationProps) => {
  const [piaMinistryFullName, setPiaMinistryFullName] = useState(
    MinistryList.filter((item) => item.value === pia.ministry)[0].label || '',
  );
  return (
    <>
      <div className="card p-3">
        <div className="container d-grid gap-3">
          <div>
            <div className="row ">
              <div className="col col-md-3">
                <b>Drafter</b>
              </div>
              <div className="col col-md-3">
                <b>Ministry</b>
              </div>
              <div className="col col-md-3">
                <b>Branch</b>
              </div>
              <div className="col col-md-3">
                <b>Initiative Lead</b>
              </div>
            </div>
            <div className="row">
              <div className="col col-md-3">{pia.drafterName}</div>
              <div className="col col-md-3">{piaMinistryFullName}</div>
              <div className="col col-md-3">{pia.branch}</div>
              <div className="col col-md-3">{pia.mpoName}</div>
            </div>
            <div className="row">
              <div className="col col-md-9">{pia.drafterTitle}</div>
              <div className="col col-md-3">{pia.leadTitle}</div>
            </div>
            <div className="row">
              <div className="col col-md-9">{pia.drafterEmail}</div>
              <div className="col col-md-3">{pia.leadEmail}</div>
            </div>
          </div>
          <div>
            <div className="row">
              <div className="col col-md-3">
                <b>Ministry Privacy Officer </b>
              </div>
              <div className="col col-md-3">
                <strong>Submitted on</strong>
              </div>
              <div className="col col-md-3">
                <strong>Last modified</strong>
              </div>
            </div>
            <div className="row">
              <div className="col col-md-3">{pia.mpoName}</div>
              <div className="col col-md-3">
                {pia.submittedAt ? dateToString(pia.submittedAt) : ''}
              </div>
              <div className="col col-md-3">{dateToString(pia.updatedAt)}</div>
            </div>
            <div className="row">
              <div className="col col-md-3">{pia.mpoEmail}</div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default PIAIntakeGeneralInformation;

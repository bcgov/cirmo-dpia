import { IPiaForm } from '../../../../../types/interfaces/pia-form.interface';
import IntakeDetails from './intakedetails';

const IntakePrintPreview = (pia: IPiaForm) => {
  return (
    <>
      <h2>PIA Intake</h2>
      <div className="container">
        <div>
          <div className="row">
            <div className="col-4">
              <ul className="PIAInfoList-container">
                <li className="PIAinfoList">
                  <h4>Filled By</h4>
                  <p className="PIAInfoName">{pia?.drafterName}</p>
                  <p className="PIAInfoEmail">{pia?.drafterEmail}</p>
                </li>
                <li className="PIAinfoList">
                  <h4>Initiative Lead</h4>
                  <p className="PIAInfoName">{pia?.leadName}</p>
                  <p className="PIAInfoEmail">{pia?.leadEmail}</p>
                </li>
              </ul>
            </div>
            <div className="col-8">
              <IntakeDetails {...pia} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IntakePrintPreview;

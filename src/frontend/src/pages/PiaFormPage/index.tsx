import { Outlet } from 'react-router-dom';
import { IPIAIntake } from '../../types/interfaces/pia-intake.interface';
// import PIASubHeader from '../../../components/public/PIASubHeader';

const PiaFormPage = () => {
  // TODO Complete this - UTOPIA-774

  // Fetch PIA
  // pia

  // auto save functionality

  // onChange Handler
  const piaStateChangeHandler = (value: any, key: keyof IPIAIntake) => {};

  const pia = {};

  return (
    <>
      {/* <PIASubHeader /> */}
      {/* <Sidebar /> */}
      <Outlet context={[pia, piaStateChangeHandler]} />
    </>
  );
};

export default PiaFormPage;

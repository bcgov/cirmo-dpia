import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import EmptyPIAList from '../../components/public/EmptyPIAList';
import PIAListTable from '../../components/public/PIAListTable';
import { usePIALookup } from '../../hooks/usePIALookup';
import { IPIAIntake } from '../../types/interfaces/pia-intake.interface';
import { IDataTable } from '../../components/public/PIAListTable/interface';
const PIAList = () => {
  const tableHeadings = ['Title', 'Last modified', 'Drafter', 'PIA status'];
  const { tableData } = usePIALookup();
  return (
    <div className="bcgovPageContainer background bcgovPageContainer__with-controls">
      <div className="page__controls">
        <h1>List of PIAs</h1>
        <button className="bcgovbtn bcgovbtn__primary">
          Create New
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <PIAListTable headings={tableHeadings} pias={tableData} />
    </div>
  );
};

export default PIAList;

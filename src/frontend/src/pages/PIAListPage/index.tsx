import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import EmptyPIAList from '../../components/public/EmptyPIAList';
import PIAListTable from '../../components/public/PIAListTable';
import { usePIALookup } from '../../hooks/usePIALookup';

const PIAList = () => {
  const tableHeadings = ['Title', 'Last modified', 'Drafter', 'PIA status'];
  const { tableData } = usePIALookup();
  return (
    <div className="bcgovPageContainer background bcgovPageContainer__with-controls">
      <div className="page__controls">
        <h1>List of PIAs</h1>
        <a href="/pia-intake" className="bcgovbtn bcgovbtn__primary">
          Create New
          <FontAwesomeIcon icon={faPlus} />
        </a>
      </div>
      {tableData.length === 0 ? (
        <EmptyPIAList />
      ) : (
        <PIAListTable headings={tableHeadings} pias={tableData} />
      )}
    </div>
  );
};

export default PIAList;

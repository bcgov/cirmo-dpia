import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import EmptyPIAList from '../../components/public/EmptyPIAList';
import PIAListTable from '../../components/public/PIAListTable';

const PIAList = () => {
  const tableHeadings = ['Title', 'Last modified', 'Drafter', 'PIA status'];

  const dummyData = [
    {
      title: 'test1',
      updatedAt: '2023/01/01',
      drafter: 'testUser1',
      status: 'Submitted',
    },
    {
      title: 'test2',
      updatedAt: '2023/01/02',
      drafter: 'testUser2',
      status: 'Submitted',
    },
  ];

  return (
    <div className="bcgovPageContainer background bcgovPageContainer__with-controls">
      <div className="page__controls">
        <h1>List of PIAs</h1>
        <button className="bcgovbtn bcgovbtn__primary">
          Create New
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
};

export default PIAList;

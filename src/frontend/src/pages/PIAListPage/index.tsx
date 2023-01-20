import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import EmptyPIAList from '../../components/public/EmptyPIAList';
import PIAListTable from '../../components/public/PIAListTable';
import { usePIALookup } from '../../hooks/usePIALookup';
import { tableHeadingProperties } from './tableProperties';
import { useEffect, useState } from 'react';
import { PiaSorting } from '../../constant/constant';

const PIAList = () => {
  const [UpdatedAt, setUpdatedAt] = useState(0);
  const [DrafterOrder, setDrafterOrder] = useState(0);
  const [SortBy, setSortBy] = useState('');
  const [SortOrder, setSortOrder] = useState(0);

  const { tableData } = usePIALookup(SortBy, SortOrder);

  useEffect(() => {}, [UpdatedAt, DrafterOrder]);
  const headings = tableHeadingProperties;

  //Switch ordering states
  function startSorting(Sortheading: string) {
    switch (Sortheading) {
      case 'updatedAt':
        headings.drafterName.sortValue = 0;
        headings[Sortheading].sortValue =
          UpdatedAt >= PiaSorting.DESCENDING
            ? PiaSorting.INACTIVE
            : UpdatedAt + 1;
        setDrafterOrder(headings.drafterName.sortValue);
        setSortBy('updatedAt');
        setSortOrder(headings[Sortheading].sortValue);
        setUpdatedAt(headings[Sortheading].sortValue);
        return;
      case 'drafterName':
        headings.updatedAt.sortValue = 0;
        headings[Sortheading].sortValue =
          DrafterOrder >= PiaSorting.DESCENDING
            ? PiaSorting.INACTIVE
            : DrafterOrder + 1;
        setUpdatedAt(headings.updatedAt.sortValue);
        setSortBy('drafterName');
        setSortOrder(headings[Sortheading].sortValue);
        setDrafterOrder(headings[Sortheading].sortValue);
        return;
      default:
        return;
    }
  }
  return (
    <div className="bcgovPageContainer background bcgovPageContainer__with-controls wrapper">
      <div className="page__controls full__width">
        <h1>List of PIAs</h1>
        <a href="/ppq" className="bcgovbtn bcgovbtn__primary">
          Create New
          <FontAwesomeIcon icon={faPlus} />
        </a>
      </div>
      {tableData.length === 0 ? (
        <EmptyPIAList />
      ) : (
        <PIAListTable
          headings={tableHeadingProperties}
          pias={tableData}
          sorting={startSorting}
        />
      )}
    </div>
  );
};

export default PIAList;

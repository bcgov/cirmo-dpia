import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import EmptyPIAList from '../../components/public/EmptyPIAList';
import PIAListTable from '../../components/public/PIAListTable';
import { usePIALookup } from '../../hooks/usePIALookup';
import { tableHeadingProperties } from './tableProperties';
import { useEffect, useState } from 'react';
import { PiaSorting } from '../../constant/constant';

const PIAList = () => {
  const [SortBy, setSortBy] = useState('');
  const [SortOrder, setSortOrder] = useState(0);
  const [headings, setHeading] = useState(tableHeadingProperties);

  const { tableData } = usePIALookup(SortBy, SortOrder);
  const [searchTableData, setSearchTableData] =
    useState<IPIAIntake[]>(tableData);
  const [searchText, setSearchText] = useState('Search by title or drafter');
  const handleClearSearchText = () => {
    setSearchText('');
    navigate('');
  };

  const updateSearchUrl = () => {
    navigate(`?searchText=${searchText}`);
  };

  const handleSearchTextChange = (newSearchText: any) => {
    setSearchText(newSearchText.target.value);
  };
  const handleSearch = async () => {};
  //Switch ordering states
  function startSorting(Sortheading: string) {
    Object.keys(headings).forEach((key) => {
      if (key === Sortheading) {
        headings[Sortheading].sortValue =
          headings[Sortheading].sortValue >= PiaSorting.ASCENDING
            ? PiaSorting.DESCENDING
            : headings[Sortheading].sortValue + 1;
        setSortBy(key);
        setSortOrder(headings[Sortheading].sortValue);
      } else {
        headings[key].sortValue = 0;
      }
    });
    setHeading(headings);
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
      <SearchBox
        searchText={searchText}
        onChange={handleSearchTextChange}
        onSearchClick={updateSearchUrl}
        onClearSearchClick={handleClearSearchText}
      />

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

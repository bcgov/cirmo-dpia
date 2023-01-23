import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import EmptyPIAList from '../../components/public/EmptyPIAList';
import PIAListTable from '../../components/public/PIAListTable';
import { usePIALookup } from '../../hooks/usePIALookup';
import { tableHeadingProperties } from './tableProperties';
import { PiaSorting } from '../../constant/constant';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchBox from '../../components/common/SearchBox';

const PIAList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [SortBy, setSortBy] = useState('');
  const [SortOrder, setSortOrder] = useState(0);
  const [headings, setHeading] = useState(tableHeadingProperties);
  const [searchText, setSearchText] = useState(
    searchParams.get('searchText') || '',
  );
  const { tableData } = usePIALookup(SortBy, SortOrder);

  const updateSearchUrl = () => {
    navigate(`?searchText=${searchText}`);
  };

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault();
        navigate(`?searchText=${searchText}`);
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [navigate, searchText]);

  const handleClearSearchText = () => {
    setSearchText('');
    navigate('');
  };

  const handleSearchTextChange = (newSearchText: any) => {
    setSearchText(newSearchText.target.value);
  };
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

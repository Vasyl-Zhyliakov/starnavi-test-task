// Main page that displays the list of people, search input, pagination, and loading states
import type { Person } from '../../types/Person';
import PeopleList from '../../Components/PeopleList/PeopleList';
import Pagination from '../../Components/Pagination/Pagination';
import SearchHero from '../../Components/SearchHero/SearchHero';
import Loader from '../../Components/Loader/Loader';
import { useEffect, useState } from 'react';
import style from './HomePage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { init } from '../../store/peopleSlice';
import { peoplePerPage } from '../../Constants/constans';

function HomePage() {
  // extracting data from Redux store: people list, loading state, errors, and current page
  const dispatch = useDispatch<AppDispatch>();
  const { people, loading, error, currentPage } = useSelector((state: RootState) => state.people);

  // local state for storing the search input value
  const [inputValue, setInputValue] = useState('');

  // initial people loading
  // if the list is empty, a request to the API is triggered
  useEffect(() => {
    if (people.length === 0) {
      dispatch(init());
    }
  }, [dispatch, people.length]);

  // filtering people by name according to the search query
  const filteredPeople = people.filter((person: Person) =>
    person.name.toLowerCase().includes(inputValue.toLowerCase().trim())
  );

  // calculating total number of pages and selecting people for the current page
  const pageCount = Math.ceil(filteredPeople.length / peoplePerPage);
  const visiblePeople = filteredPeople.slice(
    (currentPage - 1) * peoplePerPage,
    currentPage * peoplePerPage
  );

  return (
    <div className={style['home-page']}>
      <SearchHero inputValue={inputValue} setInputValue={setInputValue} />

      {loading && (!people || people.length === 0) && <Loader />}

      {!loading && (!people || people.length === 0) && (
        <p className={style['home-page__error']}>{error}</p>
      )}

      {!loading && people && people.length > 0 && (
        <>
          <PeopleList visiblePeople={visiblePeople} />

          {filteredPeople.length > peoplePerPage && <Pagination pageCount={pageCount} />}
        </>
      )}

      {!loading && people && people.length > 0 && filteredPeople.length === 0 && (
        <p className={style['home-page__error']}>There no results...</p>
      )}
    </div>
  );
}

export default HomePage;

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

function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { people, loading, error, currentPage } = useSelector((state: RootState) => state.people);

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (people.length === 0) {
      dispatch(init());
    }
  }, [dispatch, people.length]);

  const peoplePerPage = 10;

  const filteredPeople = people.filter((person: Person) =>
    person.name.toLowerCase().includes(inputValue.toLowerCase().trim())
  );

  const pageCount = Math.ceil(filteredPeople.length / peoplePerPage);

  const visiblePeople = filteredPeople.slice(
    (currentPage - 1) * peoplePerPage,
    currentPage * peoplePerPage
  );

  return (
    <div className={style['home-page__content']}>
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

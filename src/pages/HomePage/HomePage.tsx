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
  const { people, loading, error } = useSelector((state: RootState) => state.people);

  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  console.log(people);

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
      <SearchHero
        inputValue={inputValue}
        setInputValue={setInputValue}
        setCurrentPage={setCurrentPage}
      />

      {loading && <Loader />}

      {!loading && people.length === 0 && <p className={style['home-page__error']}>{error}</p>}

      {!loading &&
        !error &&
        (visiblePeople.length > 0 ? (
          <>
            <PeopleList visiblePeople={visiblePeople} />

            {filteredPeople.length > peoplePerPage && (
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pageCount={pageCount}
              />
            )}
          </>
        ) : (
          <p className={style['home-page__error']}>There no results...</p>
        ))}
    </div>
  );
}

export default HomePage;

import { useEffect, useState } from 'react';
import './App.scss';
import type { Person } from './types/Person';
import { getPeople } from './utils/fetchClient';
import PeopleList from './Components/PeopleList/PeopleList';
import Pagination from './Components/Pagination/Pagination';

function App() {
  const [people, setPeople] = useState<Person[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    getPeople().then((res) => setPeople(res));
  }, []);

  const peoplePerPage = 10;

  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(inputValue.toLowerCase().trim())
  );

  const pageCount = Math.ceil(filteredPeople.length / peoplePerPage);

  const visiblePeople = filteredPeople.slice(
    (currentPage - 1) * peoplePerPage,
    currentPage * peoplePerPage
  );

  console.log(pageCount);
  console.log(currentPage);
  console.log(people);
  console.log(visiblePeople);

  return (
    <div className="app">
      <div className="app__content">
        {/* <SearchHero /> */}

        <PeopleList visiblePeople={visiblePeople} />

        {visiblePeople.length > 0 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageCount={pageCount}
          />
        )}
      </div>
    </div>
  );
}

export default App;

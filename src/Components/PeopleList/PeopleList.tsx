import { Link } from 'react-router-dom';
import type { Person } from '../../types/Person';
import styles from './PeopleList.module.scss';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { setCurrentPerson } from '../../store/peopleSlice';

type Props = {
  visiblePeople: Person[];
};

// people list component: renders the list of visible characters
// each item is a link to the character's page and dispatches the current character to the Redux store on click.
const PeopleList = ({ visiblePeople }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <ul className={styles.list}>
      {visiblePeople.map((person) => (
        <li key={person.id} className={styles.list__item}>
          <Link
            className={styles.list__link}
            to={`/people/${person.id}`}
            onClick={() => dispatch(setCurrentPerson(person))}
          >
            {person.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PeopleList;

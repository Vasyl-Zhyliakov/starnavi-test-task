import type { Person } from '../../types/Person';
import styles from './PeopleList.module.scss';

type Props = {
  visiblePeople: Person[];
};

const PeopleList = ({ visiblePeople }: Props) => {
  return (
    <ul className={styles.list}>
      {visiblePeople.map((person) => (
        <li key={person.id} className={styles.list__item}>
          {person.name}
        </li>
      ))}
    </ul>
  );
};

export default PeopleList;

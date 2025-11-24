import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

function PersonPage() {
  const { id } = useParams();
  const people = useSelector((state: RootState) => state.people.people);

  const person = people.find((p) => p.id.toString() === id);

  if (!person) {
    return <p>Character not found</p>;
  }

  return (
    <div>
      <Link to="/">⬅ Back</Link>
      <h1>{person.name}</h1>
      <p>{person.films}</p>
      <p>{person.starships}</p>
    </div>
  );
}

export default PersonPage;

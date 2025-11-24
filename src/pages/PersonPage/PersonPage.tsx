import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { getUnit } from '../../utils/fetchClient';
import { clearCurrentPerson, fetchCurrent } from '../../store/peopleSlice';
import { useEffect, useState } from 'react';
import Loader from '../../Components/Loader/Loader';
import style from './PersonPage.module.scss';
import type { Film } from '../../types/Film';

function PersonPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { currentPerson, loading, error } = useSelector((state: RootState) => state.people);

  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    if (!currentPerson && id) {
      dispatch(fetchCurrent(+id));
    }
  }, [currentPerson, dispatch, id]);

  useEffect(() => {
    if (currentPerson) {
      const loadFilms = async () => {
        const data = await Promise.all(currentPerson.films.map((id) => getUnit('films', id)));
        setFilms(data);
      };

      loadFilms();
    }
  }, [currentPerson]);

  console.log(films);

  return (
    <div>
      <Link to="/" onClick={() => dispatch(clearCurrentPerson())}>
        ⬅ Back
      </Link>

      {loading && <Loader />}

      {!loading && !currentPerson && <p className={style['person-page__error']}>{error}</p>}

      {!loading && currentPerson && (
        <>
          <h1>{currentPerson.name}</h1>
          <p>{currentPerson.films}</p>
          <p>{currentPerson.starships}</p>
        </>
      )}
    </div>
  );
}

export default PersonPage;

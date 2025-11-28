import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { getUnit } from '../../utils/fetchClient';
import { clearCurrentPerson, fetchCurrent } from '../../store/peopleSlice';
import { useEffect, useState } from 'react';
import Loader from '../../Components/Loader/Loader';
import style from './PersonPage.module.scss';
import type { Film } from '../../types/Film';
import type { PersonData } from '../../types/PersonData';
import type { Starship } from '../../types/Starship';
import PersonGraph from '../../Components/PersonGraph/PersonGraph';

function PersonPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { currentPerson, loading, error } = useSelector((state: RootState) => state.people);

  const [mainData, setMainData] = useState<PersonData>();

  useEffect(() => {
    if (!currentPerson && id) {
      dispatch(fetchCurrent(+id));
    }
  }, [currentPerson, dispatch, id]);

  useEffect(() => {
    if (!currentPerson) {
      return;
    }

    const loadAll = async () => {
      const films: Film[] = await Promise.all(
        currentPerson.films.map((id) => getUnit('films', id))
      );

      const preparedFilms = await Promise.all(
        films.map(async (film) => {
          const filteredStarships = film.starships.filter((id) =>
            currentPerson.starships.includes(id)
          );

          const starshipsData: Starship[] = await Promise.all(
            filteredStarships.map((id) => getUnit('starships', id))
          );

          return {
            filmId: film.id,
            filmName: film.title,
            starships: starshipsData.map((ship) => {
              return {
                shipId: ship.id,
                shipName: ship.name,
              };
            }),
          };
        })
      );

      setMainData({
        personName: currentPerson.name,
        films: preparedFilms,
      });
    };

    loadAll();
  }, [currentPerson]);

  return (
    <div>
      <Link to="/" onClick={() => dispatch(clearCurrentPerson())} className={style.page__back}>
        ⬅ Back
      </Link>

      {loading && <Loader />}

      {!loading && !currentPerson && <p className={style['person-page__error']}>{error}</p>}

      {!loading && mainData && <PersonGraph data={mainData} />}
    </div>
  );
}

export default PersonPage;

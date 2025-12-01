import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { getUnit } from '../../utils/fetchClient';
import { fetchCurrent } from '../../store/peopleSlice';
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
  const { currentPerson, loadingPerson, error } = useSelector((state: RootState) => state.people);

  const [mainData, setMainData] = useState<PersonData>();
  const [loadingDetails, setLoadingDetails] = useState(false);

  const [filmsError, setFilmsError] = useState<string>('');
  const [starshipsError, setStarshipsError] = useState<string>('');

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
      setLoadingDetails(true);
      setFilmsError('');
      setStarshipsError('');

      try {
        const films: Film[] = await Promise.all(
          currentPerson.films.map((id) => getUnit('films', id))
        );

        const preparedFilms = await Promise.all(
          films.map(async (film) => {
            try {
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
            } catch {
              setStarshipsError('Something wrong with starships...');
              return {
                filmId: film.id,
                filmName: film.title,
                starships: [],
              };
            }
          })
        );

        setMainData({
          personName: currentPerson.name,
          films: preparedFilms,
        });

        setLoadingDetails(false);
      } catch {
        setFilmsError('Something wrong with films...');
      } finally {
        setLoadingDetails(false);
      }
    };

    loadAll();
  }, [currentPerson]);

  return (
    <div className={style.page}>
      <Link to="/" className={style.page__back}>
        ⬅ Back
      </Link>

      {loadingPerson && (
        <div className={style['page__loader-block']}>
          <Loader />
        </div>
      )}

      {!loadingPerson && currentPerson && loadingDetails && (
        <div className={style['page__loader-block']}>
          <Loader />
        </div>
      )}

      {!loadingPerson && !currentPerson && <p className={style['page__error']}>{error}</p>}

      {filmsError && <p className={style['page__error']}>{filmsError}</p>}

      {starshipsError && <p className={style['page__error']}>{starshipsError}</p>}

      {!loadingPerson && mainData && <PersonGraph data={mainData} />}
    </div>
  );
}

export default PersonPage;

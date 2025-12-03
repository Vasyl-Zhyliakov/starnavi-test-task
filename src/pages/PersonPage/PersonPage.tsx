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
import { getPreparedFilms } from '../../utils/personPage';

function PersonPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { currentPerson, loadingPerson, error } = useSelector((state: RootState) => state.people);

  const [mainData, setMainData] = useState<PersonData>();
  const [loadingDetails, setLoadingDetails] = useState(false);

  const [filmsError, setFilmsError] = useState<string>('');
  const [starshipsError, setStarshipsError] = useState<string>('');

  // loads the character data if it has not been fetched yet
  useEffect(() => {
    if (!currentPerson && id) {
      dispatch(fetchCurrent(+id));
    }
  }, [currentPerson, dispatch, id]);

  // loads film data and related starships for the current character
  useEffect(() => {
    if (!currentPerson) {
      return;
    }

    const loadAll = async () => {
      setLoadingDetails(true);
      setFilmsError('');
      setStarshipsError('');

      let films: Film[] = [];
      let starships: Starship[] = [];

      try {
        films = await getUnit('films', currentPerson.films);
      } catch {
        setFilmsError('Failed to load films...');
      }

      try {
        starships = await getUnit('starships', currentPerson.starships);
      } catch {
        setStarshipsError('Failed to load starships...');
      }

      const preparedFilms = getPreparedFilms(films, starships, currentPerson);

      setMainData({
        personName: currentPerson.name,
        films: preparedFilms,
      });
    };

    loadAll().finally(() => {
      setLoadingDetails(false);
    });
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

      {filmsError && !currentPerson && <p className={style['page__error']}>{filmsError}</p>}

      {starshipsError && !currentPerson && <p className={style['page__error']}>{starshipsError}</p>}

      {!loadingPerson && mainData && <PersonGraph data={mainData} />}
    </div>
  );
}

export default PersonPage;

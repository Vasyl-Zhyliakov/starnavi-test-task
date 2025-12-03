import type { Film } from '../types/Film';
import type { Person } from '../types/Person';
import type { Starship } from '../types/Starship';

export const getPreparedFilms = (films: Film[], starships: Starship[], person: Person) => {
  return films.map((film) => {
    const filteredStarships = film.starships.filter((starship) =>
      person.starships.includes(starship)
    );

    const starshipsData = filteredStarships
      .map((id) => starships.find((ship) => ship.id === id))
      .filter(Boolean) as Starship[];

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
  });
};

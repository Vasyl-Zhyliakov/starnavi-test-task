export interface PersonData {
  personName: string;
  films: {
    filmId: number;
    filmName: string;
    starships: { shipId: number; shipName: string }[];
  }[];
}

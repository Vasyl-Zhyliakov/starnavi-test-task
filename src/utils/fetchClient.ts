import type { PeopleResponse } from '../types/PeopleResponse';
import type { Person } from '../types/Person';

const BASE_URL = 'https://sw-api.starnavi.io';

export async function getPeople() {
  const allPeople: Person[] = [];
  let nextURL: string | null = `${BASE_URL}/people/`;

  while (nextURL) {
    const resp: PeopleResponse = await fetch(nextURL).then((res) => res.json());

    allPeople.push(...resp.results);

    nextURL = resp.next;
  }

  return allPeople.sort((a, b) => a.name.localeCompare(b.name));
}

export function getPerson(id: number) {
  return fetch(`${BASE_URL}/people/${id}`)
    .then((res) => res.json())
    .catch(() => {
      throw new Error();
    });
}

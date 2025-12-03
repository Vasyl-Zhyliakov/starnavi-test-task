import type { PeopleResponse } from '../types/PeopleResponse';
import type { Person } from '../types/Person';

// base API path proxied through Vite
const BASE_URL = 'https://sw-api.starnavi.io';

// fetches all people from the API by following the paginated "next" links.
// adds a short delay between requests and returns the final list sorted by name.
export async function getPeople() {
  const allPeople: Person[] = [];
  let nextURL: string | null = `${BASE_URL}/people/`;

  while (nextURL) {
    const response: PeopleResponse = await fetch(nextURL).then((res) => res.json());

    allPeople.push(...response.results);
    nextURL = response.next ? response.next.replace('https://sw-api.starnavi.io', BASE_URL) : null;
  }

  return allPeople.sort((a, b) => a.name.localeCompare(b.name));
}

// fetches a specific resource (person, film, or starship) based on its type and ID.
// adds a delay after receiving the response and returns the parsed data.
export function getUnit(unit: 'people' | 'films' | 'starships', id: number | number[]) {
  if (unit === 'people') {
    return fetch(`${BASE_URL}/${unit}/${id}`)
      .then((res) => res.json())
      .catch(() => {
        throw new Error();
      });
  }

  const isArray = Array.isArray(id);

  const url = isArray ? `${BASE_URL}/${unit}/?id__in=${id.join(',')}` : `${BASE_URL}/${unit}/${id}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.results)
    .catch(() => {
      throw new Error();
    });
}

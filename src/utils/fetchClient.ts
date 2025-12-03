import type { PeopleResponse } from '../types/PeopleResponse';
import type { Person } from '../types/Person';

// base API path proxied through Vite
const BASE_URL = 'https://sw-api.starnavi.io';

// utility function that creates an artificial delay during asynchronous operations.
export function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

// fetches all people from the API by following the paginated "next" links.
// adds a short delay between requests and returns the final list sorted by name.
export async function getPeople() {
  const allPeople: Person[] = [];
  let nextURL: string | null = `${BASE_URL}/people/`;

  while (nextURL) {
    await wait(300);

    const response: PeopleResponse = await fetch(nextURL).then((res) => res.json());

    allPeople.push(...response.results);
    nextURL = response.next ? response.next.replace('https://sw-api.starnavi.io', BASE_URL) : null;
  }

  return allPeople.sort((a, b) => a.name.localeCompare(b.name));
}

// fetches a specific resource (person, film, or starship) based on its type and ID.
// adds a delay after receiving the response and returns the parsed data.
export function getUnit(unit: 'people' | 'films' | 'starships', id: number) {
  return fetch(`${BASE_URL}/${unit}/${id}`)
    .then((res) => res.json())
    .then(async (data) => {
      await wait(300);
      return data;
    })
    .catch(() => {
      throw new Error();
    });
}

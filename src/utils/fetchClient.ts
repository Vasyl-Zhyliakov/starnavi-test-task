import type { PeopleResponse } from '../types/PeopleResponse';
import type { Person } from '../types/Person';

const BASE_URL = '/api';

export function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

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

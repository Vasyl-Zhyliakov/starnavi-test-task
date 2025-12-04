import type { Person } from '../types/Person';

export const getFilteredPeople = (people: Person[], query: string) => {
  return people.filter((person) => person.name.toLowerCase().includes(query.toLowerCase().trim()));
};

export const getPageCount = (people: Person[], peoplePerPage: number) => {
  return Math.ceil(people.length / peoplePerPage);
};

export const getVisiblePeople = (people: Person[], pageNumber: number, peoplePerPage: number) => {
  return people.slice((pageNumber - 1) * peoplePerPage, pageNumber * peoplePerPage);
};

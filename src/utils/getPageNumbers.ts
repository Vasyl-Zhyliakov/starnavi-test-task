// generates an array of values to render in the pagination.
// returns numeric page indices or the string '...' as a separator.
// the logic ensures compact rendering for large page counts.
export const getPageNumbers = (count: number, current: number) => {
  const pages: (string | number)[] = [];

  // if there are 5 or fewer pages, return all page numbers.
  if (count <= 5) {
    for (let i = 1; i <= count; i++) {
      pages.push(i);
    }
    return pages;
  }

  // if current page is less then 3, show the first 3 pages and '...' before the last page.
  if (current < 3) {
    return [1, 2, 3, '...', count];
  }

  // special case for current === 3, it expand the block near the start.
  if (current === 3) {
    return [1, 2, 3, 4, '...', count];
  }

  // special case for current === last - 2, it expand the block near the end.
  if (current === count - 2) {
    return [1, '...', count - 3, count - 2, count - 1, count];
  }

  //if current page is close to the end, display the last 3 pages with '...' after the first page.
  if (current > count - 2) {
    return [1, '...', count - 2, count - 1, count];
  }

  // For all other cases, show first page, '...', prev, current, next, '...', last page.
  return [1, '...', current - 1, current, current + 1, '...', count];
};

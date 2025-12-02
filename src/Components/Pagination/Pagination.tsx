import styles from './Pagination.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { setCurrentPage } from '../../store/peopleSlice';

type Props = {
  pageCount: number;
};

// pagination component: renders navigation controls for switching pages,
// computes a set of page numbers with abbreviated representation ("..."),
// and dispatches an action to change the current page in the Redux store.
const Pagination = ({ pageCount }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage } = useSelector((state: RootState) => state.people);

  // generates an array of values to render in the pagination.
  // returns numeric page indices or the string '...' as a separator.
  // the logic ensures compact rendering for large page counts.
  const getPageNumbers = (count: number, current: number) => {
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

  const pageNumbers = getPageNumbers(pageCount, currentPage);

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => dispatch(setCurrentPage(currentPage - 1))}
        disabled={currentPage === 1}
        className={styles.pagination__button}
      >
        Prev
      </button>
      <div className={styles['pagination__buttons-wrapper']}>
        {pageNumbers.map((number, i) =>
          typeof number === 'number' ? (
            <button
              onClick={() => dispatch(setCurrentPage(number))}
              key={number}
              className={`${styles.pagination__button} ${number === currentPage ? styles['pagination__button--active'] : ''}`}
            >
              {number}
            </button>
          ) : (
            <span key={`dot-${i}`} className={styles.pagination__separator}>
              ...
            </span>
          )
        )}
      </div>
      <button
        onClick={() => dispatch(setCurrentPage(currentPage + 1))}
        disabled={currentPage === pageCount}
        className={styles.pagination__button}
      >
        Next
      </button>{' '}
    </div>
  );
};

export default Pagination;

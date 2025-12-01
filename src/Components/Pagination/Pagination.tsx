import styles from './Pagination.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { setCurrentPage } from '../../store/peopleSlice';

type Props = {
  pageCount: number;
};

const Pagination = ({ pageCount }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage } = useSelector((state: RootState) => state.people);

  const getPageNumbers = (count: number, current: number) => {
    const pages: (string | number)[] = [];

    if (count <= 5) {
      for (let i = 1; i <= count; i++) {
        pages.push(i);
      }
      return pages;
    }

    if (current < 3) {
      return [1, 2, 3, '...', count];
    }

    if (current === 3) {
      return [1, 2, 3, 4, '...', count];
    }

    if (current === count - 2) {
      return [1, '...', count - 3, count - 2, count - 1, count];
    }

    if (current > count - 2) {
      return [1, '...', count - 2, count - 1, count];
    }

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

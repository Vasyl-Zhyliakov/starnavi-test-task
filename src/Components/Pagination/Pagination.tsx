import styles from './Pagination.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { setCurrentPage } from '../../store/peopleSlice';
import { getPageNumbers } from '../../utils/getPageNumbers';

type Props = {
  pageCount: number;
};

// pagination component: renders navigation controls for switching pages,
// computes a set of page numbers with abbreviated representation ("..."),
// and dispatches an action to change the current page in the Redux store.
const Pagination = ({ pageCount }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage } = useSelector((state: RootState) => state.people);

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

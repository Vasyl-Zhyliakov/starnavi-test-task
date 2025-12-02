import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import styles from './SearchHero.module.scss';
import { setCurrentPage } from '../../store/peopleSlice';

type Props = {
  inputValue: string;
  setInputValue: (value: string) => void;
};

// hero search component: input field for entering a character's name.
// on change, updates the local inputValue state and resets the current pagination page to 1.
const SearchHero = ({ inputValue, setInputValue }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setInputValue(e.target.value);
    dispatch(setCurrentPage(1));
  };

  return (
    <input
      type="text"
      className={styles.input}
      placeholder="Type hero name"
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};

export default SearchHero;

import styles from './SearchHero.module.scss';

type Props = {
  inputValue: string;
  setInputValue: (value: string) => void;
  setCurrentPage: (value: number) => void;
};

const SearchHero = ({ inputValue, setInputValue, setCurrentPage }: Props) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setInputValue(e.target.value);
    setCurrentPage(1);
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

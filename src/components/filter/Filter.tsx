import React, { useState } from 'react';
import styles from './Filter.module.scss';
import InputSelect from '../../atoms/input-select/InputSelect';
import Button from '../../atoms/button/Button';
import Input from '../../atoms/input/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

type Option = {
  value: string;
  label: string;
};

type FilterSearchProps = {
  categories: Option[];
  onSearch: (searchTerm: string, category: string) => void;
};

const Filter: React.FC<FilterSearchProps> = ({ categories, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all'); // Valor por defecto 'all'

  const handleSearch = () => {
    onSearch(searchTerm, selectedCategory);
  };

  return (
    <div className={styles.filterSearch}>
      <div className={styles.inputWrapper}>
        <div className={styles.row}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <Input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.selectWrapper}>
        <div className={styles.row}>
          <FontAwesomeIcon icon={faFilter} />
          <InputSelect
            options={categories}
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value)}
          />
        </div>
        <Button onClick={handleSearch}>
          Buscar
        </Button>
      </div>
    </div>
  );
};

export default Filter;
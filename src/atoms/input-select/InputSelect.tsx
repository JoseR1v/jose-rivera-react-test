import React from 'react';
import styles from './InputSelect.module.scss';

type Option = {
  value: string;
  label: string;
};

type InputSelectProps = {
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

const InputSelect: React.FC<InputSelectProps> = ({ label, options, value, onChange, error }) => {
  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        className={styles['input-select']}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>
          -- Selecciona una opción --
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default InputSelect;

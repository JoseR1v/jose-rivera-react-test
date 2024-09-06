import React from 'react';
import styles from './Input.module.scss';

interface InputProps {
  label?: string;
  type: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  accept?: string
  name?: string
}

const Input: React.FC<InputProps> = ({ label, type, placeholder, value, onChange, disabled = false, accept, name }) => {
  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.inputLabel}>{label}</label>}
      <input
        className={styles.inputField}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        accept={accept}
        name={name}
      />
    </div>
  );
};

export default Input;

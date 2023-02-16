import React, { ChangeEventHandler, FocusEventHandler } from 'react';

import styles from './style.module.css';

export type FieldProps = {
  name: string,
  label: string,
  value: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
  onBlur: FocusEventHandler<HTMLInputElement>,
  children?: React.ReactNode,
};

const Field = ({ name, label, value, onChange, onBlur, children }: FieldProps) => (
  <div className={styles.root}>
    <div className={styles.label}>{label}</div>
    <div className={styles.body}>
      <input
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={styles.input}
      />
      {children}
    </div>
  </div>
);

export default Field;

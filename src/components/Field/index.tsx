import React, { ChangeEventHandler, FocusEventHandler } from 'react';

export type FieldProps = {
  name: string,
  label: string,
  value: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
  onBlur: FocusEventHandler<HTMLInputElement>,
  children?: React.ReactNode,
};

const Field = ({ name, label, value, onChange, onBlur, children }: FieldProps) => (
  <div className="field">
    <div className="field__label">{label}</div>
    <div className="field__body">
      <input
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="field__input"
      />
      {children}
    </div>
  </div>
);

export default Field;

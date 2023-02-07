import React from 'react';

import Field, { FieldProps } from 'components/Field';

type FieldWithUnitProps = FieldProps & {
  isFixed: boolean,
  setIsFixed: (key: string, val: boolean) => void,
  unitSymbol: string,
};

const FieldWithUnit = ({ name, label, value, onChange, onBlur, isFixed, setIsFixed, unitSymbol}: FieldWithUnitProps) => (
  <Field
    name={name}
    label={label}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
  >
    <button
      className="field__button"
      disabled={!isFixed}
      onClick={() => setIsFixed(name, false)}
    >
      %
    </button>
    <button
      className="field__button"
      disabled={isFixed}
      onClick={() => setIsFixed(name, true)}
    >
      {unitSymbol}
    </button>
  </Field>
);

export default FieldWithUnit;

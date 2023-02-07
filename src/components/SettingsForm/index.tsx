import React, { ChangeEvent, FocusEvent } from 'react';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from 'store';
import formSlice, { FieldName, FieldWithUnitName } from 'store/formSlice';

import Field from 'components/Field';
import FieldWithUnit from 'components/FieldWithUnit';

const SettingsForm = () => {
  const dispatch = useAppDispatch();
  const { updateValue, updateNumValue, updateFixed } = formSlice.actions;
  const { bank, bankFee, fee, networkFee } = useSelector((state: RootState) => state.form);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target as { name: FieldName, value: string };

    dispatch(updateValue({ name, value }));
  };
  const onBlur = (event: FocusEvent<HTMLInputElement>) => {
    const name = event.target.name as FieldName;
    const value = Number(event.target.value);

    dispatch(updateNumValue({ name, value: value }));
  };
  const onChangeFixed = (name: string, value: boolean) => {
    dispatch(updateFixed({ name: (name as FieldWithUnitName), value }));
  };

  return (
    <>
      <Field
        label="Банк"
        name="bank"
        value={bank.value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <FieldWithUnit
        label="Комиссия банка"
        name="bankFee"
        value={bankFee.value}
        onChange={onChange}
        onBlur={onBlur}
        isFixed={bankFee.isFixed}
        setIsFixed={onChangeFixed}
        unitSymbol="P"
      />
      <Field
        label="Комиссия приемки"
        name="fee"
        value={fee.value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <FieldWithUnit
        label="Комиссия сети"
        name="networkFee"
        value={networkFee.value}
        onChange={onChange}
        onBlur={onBlur}
        isFixed={networkFee.isFixed}
        setIsFixed={onChangeFixed}
        unitSymbol="$"
      />
    </>
  );
};

export default SettingsForm;

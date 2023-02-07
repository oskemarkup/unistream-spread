import React, { useState } from 'react';

import List from 'components/List';

const BankSelector = () => {
  const banks = ['sber', 'raif', 'tink'];
  const [ activeBank, setActiveBank ] = useState('sber');

  return (
    <div>
      {banks.map(bank => (
        <button disabled={activeBank === bank} onClick={() => setActiveBank(bank)}>{bank}</button>
      ))}
      <List key={activeBank} bankName={activeBank} />
    </div>
  );
}

export default BankSelector;

import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from 'store';
import api from 'store/api';

import SettingsForm from 'components/SettingsForm';
import UnistreamRates from 'components/UnistreamRates';
import BankSelector from 'components/BankSelector';
import Compare from 'components/Compare';

import './App.css';

const App = () => (
  <div className="app">
    <SettingsForm />
    <UnistreamRates />
    <BankSelector />
    <Compare />
  </div>
);

export default App;

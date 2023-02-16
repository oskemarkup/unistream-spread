import React from 'react';

import SettingsForm from 'components/SettingsForm';
import UnistreamRates from 'components/UnistreamRates';
import Compare from 'components/Compare';
import List from 'components/List';

import './App.css';

const App = () => (
  <div className="app">
    <SettingsForm />
    <UnistreamRates />
    <List />
    <Compare />
  </div>
);

export default App;

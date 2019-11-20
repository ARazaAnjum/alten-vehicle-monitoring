import React from 'react';
import './App.css';
import VehicleInfo from './VehicleInfo';
import { Provider } from 'react-redux';
import { configureStore } from './store';

function App() {
  return (
    <Provider store={configureStore()}>
      <VehicleInfo />
    </Provider>
  );
}

export default App;

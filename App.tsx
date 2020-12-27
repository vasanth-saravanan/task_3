import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Navigation from './navigations/appNavigation';

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
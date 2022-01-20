import { render } from '@testing-library/react';
import React from 'react';
import { createStore } from 'redux';
import rootReducers from '../redux/index';
import { Provider } from 'react-redux';

const store = createStore(rootReducers);

const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: ReduxProvider, ...options });

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender as render };

import React from 'react';
import { render, screen } from './utils/test-utils';
import App from './App';

test('renders App component', () => {
  render(<App />);
  const usernameLabel = screen.getByText(/Username/i);
  const loginButtonText = screen.getByText(/Login/i);
  expect(usernameLabel).toBeInTheDocument();
  expect(loginButtonText).toBeInTheDocument();
});

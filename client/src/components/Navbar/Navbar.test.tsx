import '@testing-library/jest-dom';
import Navbar from './Navbar';
import {  render, screen } from '../../utils/test-utils';

test('renders navbar component', () => {
  render(<Navbar />);
  expect(screen.getByText('Playing with no user')).toBeInTheDocument();
  expect(screen.getByText('Win the game or win the job')).toBeInTheDocument();
});

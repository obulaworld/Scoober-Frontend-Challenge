import '@testing-library/jest-dom';
import Loader from './Loader';
import {  render, screen } from '../../utils/test-utils';

test('renders loader component', () => {
  render(<Loader />);
  expect(screen.getByTestId('loader-component')).toBeInTheDocument();
});

import '@testing-library/jest-dom';
import Output from './Output';
import {  render, screen } from '../../utils/test-utils';

test('renders output component', () => {
  render(<Output text={'hello'} />);
  expect(screen.getByText('hello')).toBeInTheDocument();
});

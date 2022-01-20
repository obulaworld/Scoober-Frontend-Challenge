import '@testing-library/jest-dom';
import Selection from './Selection';
import {  render, screen } from '../../utils/test-utils';

test('renders selection component', () => {
  render(<Selection color={'#fff'} background={'#fff'} number={8} />);
  expect(screen.getByText('8')).toBeInTheDocument();
});

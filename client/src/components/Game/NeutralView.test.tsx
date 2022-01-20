import '@testing-library/jest-dom';
import Neutralview from './NeutralView';
import { render, screen } from '../../utils/test-utils';

test('renders Neutralview component', () => {
  render(<Neutralview message={{ number: 81 }} />);
  expect(screen.getByText('81')).toBeInTheDocument();
});

import '@testing-library/jest-dom';
import Opponentview from './Opponentview';
import { render, screen } from '../../utils/test-utils';

test('renders Opponentview with message props', () => {
  render(<Opponentview message={{ message: 'hello' }} />);
  expect(screen.getByText('hello')).toBeInTheDocument();
});

test('renders Opponentview with isFirst props', () => {
  render(<Opponentview message={{ isFirst: true, number: 8 }} />);
  expect(screen.getByText('8')).toBeInTheDocument();
});

test('renders Opponentview with selectedNumber props', () => {
  render(<Opponentview message={{ isFirst: false, number: 8, selectedNumber: 1 }} />);
  expect(screen.getByText('1')).toBeInTheDocument();
});

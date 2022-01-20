import '@testing-library/jest-dom';
import PlayerView from './Playerview';
import { render, screen } from '../../utils/test-utils';

test('renders PlayerView with message props', () => {
  render(<PlayerView index={0} message={{ message: 'hello' }} />);
  expect(screen.getByText('hello')).toBeInTheDocument();
});

test('renders PlayerView with isFirst props', () => {
  render(<PlayerView index={1} message={{ isFirst: true, number: 8 }} />);
  expect(screen.getByText('8')).toBeInTheDocument();
});

test('renders PlayerView with selectedNumber props', () => {
  render(<PlayerView index={1} message={{ isFirst: false, number: 8, selectedNumber: 1 }} />);
  expect(screen.getByText('1')).toBeInTheDocument();
});

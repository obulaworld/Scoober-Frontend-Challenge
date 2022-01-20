import '@testing-library/jest-dom';
import Sidebar from './Sidebar';
import { render, screen } from '../../utils/test-utils';
const io = require('socket.io-client');

const socket = io('http://localhost:8082', { forceNew: true });
const rooms = {
  rooms: [
    {
      type: 'CPU',
      name: 'My room',
      id: '1',
      owner: 'me'
    },
  ],
  error: null,
  loading: false,
};

test('renders Sidebar component', () => {
  render(<Sidebar socket={socket} rooms={rooms} />);
  expect(screen.getByText('Choose you game room')).toBeInTheDocument();
  expect(screen.getByText('My room')).toBeInTheDocument();
});

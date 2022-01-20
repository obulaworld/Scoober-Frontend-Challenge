import '@testing-library/jest-dom';
import Sidemenu from './Sidemenu';
import { render, screen } from '../../utils/test-utils';
const io = require('socket.io-client');

const socket = io('http://localhost:8082', { forceNew: true });
const room = {
  type: 'CPU',
  name: 'My room',
  id: '1',
  owner: 'me',
};

test('renders Sidemenu component', () => {
  render(<Sidemenu socket={socket} room={room} />);
  expect(screen.getByText('My room')).toBeInTheDocument();
});

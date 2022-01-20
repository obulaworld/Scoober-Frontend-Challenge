import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { SideBartext } from '../../shared/Shared';
import ArrowImage from '../../assets/forwardArrow.svg';
import { activeRoomRequest, activeRoomSuccess } from '../../redux/actions';
import { State, Message, RoomType } from '../../utils/types';

const selectActiveRoom = (state: State) => state.activeRoom;
const selectUser = (state: State) => state.user?.user?.user;

const SidemenuContainer = styled.div<{ activeRoom: boolean }>`
  width: 229px;
  height: 64px;
  background: ${(props) => (props.activeRoom ? '#1574F5' : '#fff')};
  color: ${(props) => (props.activeRoom ? '#fff' : '#205A6D')};
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
`;

const SidemenuText = styled(SideBartext)<{ activeRoom: boolean }>`
  color: ${(props) => (props.activeRoom ? '#fff' : '#205A6D')};
`;

export const Arrow = styled.img`
  height: 9.33px;
  width: 16px;
`;

interface ISidemenuProps {
  socket: any;
  room: RoomType;
}

function Sidemenu({ room, socket }: ISidemenuProps): ReactElement {
  const dispatch = useDispatch();
  const activeRoom = useSelector(selectActiveRoom);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (socket == null) return;
    socket.on('message', ({ user, message, room }: Message) => {
      const roomObject = {
        room: room,
      };
      dispatch(activeRoomSuccess(roomObject));
    });
    return () => socket.off('message');
  }, [socket]);

  const joinRoom = () => {
    dispatch(activeRoomRequest());
    if (room) {
      socket.emit('leaveRoom');
    }

    setTimeout(() => {
      socket.emit('joinRoom', {
        room: room.name,
        roomType: room.type,
        username: user,
      });
    }, 100);
  };

  return (
    <SidemenuContainer
      activeRoom={activeRoom?.room === room.name}
      onClick={joinRoom}
      data-testid='side-menu'
    >
      <div>
        <SidemenuText activeRoom={activeRoom?.room === room.name}>
          {room.name}
        </SidemenuText>
      </div>
      <div>
        <svg
          width='10'
          height='16'
          viewBox='0 0 10 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M0.715038 13.7687L6.50043 7.99956L0.715038 2.23037C0.45933 1.97592 0.333252 1.6402 0.333252 1.30447C0.333252 0.970514 0.45933 0.634787 0.715038 0.380342C1.22645 -0.126781 2.06106 -0.126781 2.57069 0.380342L9.28302 7.07366C9.53873 7.32987 9.66658 7.66383 9.66658 7.99956C9.66658 8.33528 9.53873 8.67101 9.28302 8.92369L2.57069 15.617C2.06106 16.1277 1.22645 16.1277 0.715038 15.617C0.45933 15.3643 0.333252 15.0286 0.333252 14.6929C0.333252 14.3589 0.45933 14.0232 0.715038 13.7687Z'
            fill={activeRoom?.room === room.name ? '#fff' : '#1574F5'}
          />
        </svg>
      </div>
    </SidemenuContainer>
  );
}

export default Sidemenu;

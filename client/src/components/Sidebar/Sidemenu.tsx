import React, { ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { SideBartext } from '../../shared/Shared';
import ArrowImage from '../../assets/forwardArrow.svg';
import {
  activeRoomRequest,
  activeRoomSuccess,
} from '../../redux/actions';
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
        <Arrow src={ArrowImage} />
      </div>
    </SidemenuContainer>
  );
}

export default Sidemenu;

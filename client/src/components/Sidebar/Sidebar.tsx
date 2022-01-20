import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Sidemenu from './Sidemenu';
import { SideBartext } from '../../shared/Shared';
import { Room, RoomType } from '../../utils/types';

const SidebarContainer = styled.div`
  width: 35%;
  height: 878px;
  background: #f2f2f2;
  padding: 19.5px 24px 16px;
  display: flex;
  flex-direction: column;
`;

interface ISidebarProps {
  socket: any;
  rooms: Room;
}

function Sidebar({ socket, rooms }: ISidebarProps): ReactElement {
  return (
    <SidebarContainer>
      <SideBartext>Choose you game room</SideBartext>
      {rooms?.rooms.map((room: RoomType, index: number) => (
        <Sidemenu key={index} socket={socket} room={room} />
      ))}
    </SidebarContainer>
  );
}

export default Sidebar;

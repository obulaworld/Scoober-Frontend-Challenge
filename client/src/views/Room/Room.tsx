import React, { ReactElement, useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar/Sidebar';
import Game from '../../components/Game/Game';
import Navbar from '../../components/Navbar/Navbar';
import Loader from '../../components/Loader/Loader';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  getRoomsRequest,
  getRoomsSuccess,
  getRoomsFailure,
} from '../../redux/actions';
import axios from 'axios';

const baseUrl = 'http://localhost:3004';

const selectRooms = (state: any) => state.rooms;
const selectActiveRoom = (state: any) => state.activeRoom;

const RoomContainer = styled.div`
  width: 100%;
  display: flex;
  max-height: 100vh;
`;

function Room({ socket }: any): ReactElement {
  const [roomLoader, setLoader] = useState(true);
  const rooms = useSelector(selectRooms);
  const activeRoom = useSelector(selectActiveRoom);
  const dispatch = useDispatch();

  const getRooms = useCallback(async () => {
    dispatch(getRoomsRequest());
    try {
      const rooms = await axios.get(`${baseUrl}/rooms`);
      dispatch(getRoomsSuccess(rooms?.data));
      setLoader(false);
    } catch (error) {
      dispatch(getRoomsFailure(error));
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getRooms();
  }, [getRooms]);

  return (
    <React.Fragment>
      {roomLoader ? (
        <Loader />
      ) : (
        <React.Fragment>
          <Navbar />
          <RoomContainer>
            <Sidebar rooms={rooms} socket={socket} />
            <Game activeRoom={activeRoom} socket={socket} />
          </RoomContainer>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Room;

import React, { ReactElement } from 'react';
import styled from 'styled-components';
import TakeAwayLogo from '../../assets/logo.svg';
import { useSelector } from 'react-redux';

const selectActiveRoom = (state: any) => state.activeRoom;

const NavContainer = styled.div`
  width: 100%;
  height: 70.05px;
  padding: 16px;
  display: flex;
  align-items: center;
  background: #ff8000;
  box-shadow: 0px 3px 3px rgba(29, 33, 55, 0.12),
    0px 3px 4px rgba(29, 33, 55, 0.14), 0px 1px 8px rgba(29, 33, 55, 0.12);
`;

const Logo = styled.img`
  height: 40px;
  width: 40px;
  margin-right: 12px;
`;

const NavBarHeader = styled.span`
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 20px;
  color: #ffffff;
`;

const NavBarSubHeader = styled.span`
  font-family: Nunito;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  color: #ffffff;
`;

const NavBarDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

function Navbar(): ReactElement {
  const activeRoom = useSelector(selectActiveRoom);
  return (
    <NavContainer>
      <Logo src={TakeAwayLogo} />
      <NavBarDescription>
        <NavBarHeader>Playing with {activeRoom.room ?? 'no user' }</NavBarHeader>
        <NavBarSubHeader>Win the game or win the job</NavBarSubHeader>
      </NavBarDescription>
    </NavContainer>
  );
}

export default Navbar;

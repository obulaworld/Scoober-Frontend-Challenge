import React, { ReactElement, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginUser, loginUserSuccess } from '../../redux/actions';
import { useSelector } from 'react-redux';
import TakeAwayLogo from '../../assets/logo.svg';

const LoginWrapper = styled.div`
  height: 100vh;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ff8000;
  box-shadow: 0px 3px 3px rgba(29, 33, 55, 0.12),
    0px 3px 4px rgba(29, 33, 55, 0.14), 0px 1px 8px rgba(29, 33, 55, 0.12);
`;

const Logo = styled.img`
  height: 40px;
  width: 40px;
`;

const LoginFormContainer = styled.div`
  width: 26.875rem;
  margin: auto;
  height: 376px;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 1px 8px rgb(0 0 0 / 9%);
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const UsernameContainer = styled.div`
  display: flex;
  width: 20rem;
  margin-bottom: 4px;
  flex-direction: column;
`;

const InputLabel = styled.label`
  width: auto;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  margin-bottom: 7px;
  color: #000;
  text-align: start;
`;

const UsernameInput = styled.input`
  height: 2.375rem;
  padding: 4px 0 5px 6px;
  font-family: Nunito !important;
  margin-bottom: 0.75rem;
  margin-right: 0.5rem;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #878787;
  width: inherit;
  background: #fff;
  border: 0.5px solid #000;
  box-sizing: border-box;
  border-radius: 4px;
`;

const LoginButtonContainer = styled.div`
  display: flex;
  width: 20rem;
  cursor: pointer;
  margin-bottom: 30px;
`;

const LoginButton = styled.button`
  font-family: Nunito;
  font-style: normal;
  cursor: pointer;
  background: #ff8000;
  border-radius: 6px;
  border: 1px solid #ff8000;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  width: 100%;
  height: 2.375rem;
  text-align: center;
  color: #fff;
`;

interface ILoginProps {
  socket: any;
}

const selectUser = (state: any) => state.user;

function Login({ socket }: ILoginProps): ReactElement {
  const [username, setusername] = useState('');
  const user = useSelector(selectUser);
  const history = useHistory();

  useEffect(() => {
    if (user?.user?.socketId) {
      history.push('/rooms');
    }
  }, [user]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (socket == null) return;
    socket.on('message', ({ user, message, socketId }: any) => {
      const userObject = {
        user: user,
        socketId,
      };
      dispatch(loginUserSuccess(userObject));
    });
    return () => socket.off('message');
  }, [socket]);

  const sendData = () => {
    if (username !== '') {
      dispatch(loginUser());
      socket.emit('login', { username });
    } else {
      alert('username is a must !');
      window.location.reload();
    }
  };

  return (
    <LoginWrapper>
      <LoginFormContainer>
        <Logo src={TakeAwayLogo} />
        <UsernameContainer>
          <InputLabel>Username</InputLabel>
          <UsernameInput onChange={(e) => setusername(e.target.value)} />
        </UsernameContainer>
        <LoginButtonContainer>
          <LoginButton onClick={() => sendData()}>Login</LoginButton>
        </LoginButtonContainer>
      </LoginFormContainer>
    </LoginWrapper>
  );
}

export default Login;

import React from 'react';
import './App.css';
import styled from 'styled-components';
import { createBrowserHistory } from 'history';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Room from './views/Room/Room';
import Login from './views/Login/Login';
import ProtectedRoute from './ProtectedRoute';
import io from 'socket.io-client';

const socket = io('http://localhost:8082', { forceNew: true });

socket.emit('leaveRoom');

socket.emit('disconnect');

const AppWrapper = styled.div`
  text-align: center;
  max-width: 768px;
  margin: auto;
`;

function App() {
  const history = createBrowserHistory();
  return (
    <BrowserRouter history={history}>
      <AppWrapper>
        <Switch>
          <Route exact path='/'>
            <Login socket={socket} />
          </Route>
          <ProtectedRoute
            socket={socket}
            exact
            path='/rooms'
            component={Room}
          />
        </Switch>
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;

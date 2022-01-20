import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const selectUser = (state) => state.user;

function AuthenticatedRoute({ component: Component, socket, ...rest }) {
  const user = useSelector(selectUser);

  return (
    <>
      <Route
        {...rest}
        render={(props) => {
          return user?.user?.socketId ? (
            <Component socket={socket} {...props} from={props.location} />
          ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location },
              }}
            />
          );
        }}
      />
    </>
  );
}

export default AuthenticatedRoute;

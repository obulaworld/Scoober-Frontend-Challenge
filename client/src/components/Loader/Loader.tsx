import React from 'react';
import styled from 'styled-components';
import BeatLoader from 'react-spinners/BeatLoader';

const LoaderComponent = styled.div`
  height: 30rem;
  display: flex;
  justify-content: center;
  margin-top: auto;
  align-items: center;
  padding: 2rem 2rem 1rem 1rem;
`;

const MainLoader = () => (
  <LoaderComponent data-testid='loader-component'>
    <BeatLoader size={15} color={'#ff8000'} css='margin-right: 1rem' />
  </LoaderComponent>
);

export default MainLoader;

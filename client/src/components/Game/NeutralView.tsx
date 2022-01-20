import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Output from './Output';
import { Message } from '../../utils/types';

const NeutralviewContainer = styled.div`
  margin-bottom: 18px;
  display: flex;
  justify-content: center;
`;

interface INeutralviewProps {
  message: Message;
}

function Neutralview({ message }: INeutralviewProps): ReactElement {
  return (
    <NeutralviewContainer>
      <Output text={message.number} />
    </NeutralviewContainer>
  );
}

export default Neutralview;

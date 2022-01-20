import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Selection from './Selection';
import Output from './Output';
import OpponentLogo from '../../assets/opponent.svg';
import { Message } from '../../utils/types';

const OppenentContainer = styled.div`
  margin-bottom: 18px;
  display: flex;
  justify-content: flex-end;
`;

const OppenentImage = styled.img`
  height: 40px;
  width: 40px;
  margin-left: 16px;
`;

const OutputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

interface IOpponentviewProps {
    message: Message;
  }

function Opponentview({ message }: IOpponentviewProps): ReactElement {
  const renderMessage = (message: Message) => {
    if (message.isFirst) {
      return <Output text={message.number} />;
    } else {
      return (
        <OutputContainer>
          <Selection
            background={'#1574F5'}
            color={'#fff'}
            number={Number(message.selectedNumber)}
          />
          <Output
            text={`[ ( ${message.selectedNumber} + ${message.previousNumber} )  / 3 ] = ${message.number}  `}
          />
          <Output text={message.number} />
        </OutputContainer>
      );
    }
  };
  return (
    <OppenentContainer>
      {message.message ? (
        <Output text={message.message} />
      ) : (
        renderMessage(message)
      )}
      <OppenentImage src={OpponentLogo} />
    </OppenentContainer>
  );
}

export default Opponentview;

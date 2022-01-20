import React, { ReactElement } from 'react';
import styled from 'styled-components';
import Selection from './Selection';
import Output from './Output';
import PlayerLogo from '../../assets/player.svg';
import { Message } from '../../utils/types';

const PlayrviewContainer = styled.div`
  width: 254px;
  margin-bottom: 18px;
  display: flex;
  justify-content: flex-start;
`;

const PlayerImage = styled.img`
  height: 40px;
  width: 40px;
  margin-right: 16px;
`;

const OutputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface IPlayerviewProps {
  message: Message;
  index: number;
}

const getPreviousNumber = (message: Message, index: number) => {
  if (!message.isCorrectResult) {
    return message.number;
  }

  if (message.isCorrectResult) {
    return (
      3 * Number(message?.number) +
      (Math.sign(Number(message.selectedNumber)) === -1
        ? Math.abs(Number(message.selectedNumber))
        : Number(message.selectedNumber))
    );
  }
};

function Playerview({ message, index }: IPlayerviewProps): ReactElement {
  const renderMessage = (message: Message) => {
    if (message.isFirst) {
      return <Output text={message.number} />;
    } else {
      return (
        <OutputContainer>
          <Selection
            background={'#205A6D'}
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
    <PlayrviewContainer>
      <PlayerImage src={PlayerLogo} />
      {message.message ? (
        <Output text={message.message} />
      ) : (
        renderMessage(message)
      )}
    </PlayrviewContainer>
  );
}

export default Playerview;

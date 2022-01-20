import React, { ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Playerview from './Playerview';
import Opponentview from './Opponentview';
import NeutralView from './NeutralView';
import { SideBartext } from '../../shared/Shared';
import { SelectionContainer } from '../../shared/Shared';
import { useDispatch } from 'react-redux';
import Trophy from '../../assets/trophy.svg';
import Baloons from '../../assets/baloons.svg';
import {
  activateTurn,
  addNewOutput,
  toggleRoomState,
  toggleGameOver,
} from '../../redux/actions';
import {
  State,
  ActiveRoom,
  Message,
  Turn,
  ReadyState,
  GameOver,
} from '../../utils/types';

enum GameState {
  WAIT = 'wait',
  PLAY = 'play',
}

const selectUser = (state: State) => state.user?.user?.user;
const selectSocketId = (state: State) => state.user?.user?.socketId;
const selectTurn = (state: State) => state.activeRoom?.turn;
const selectCurrentNumber = (state: State) => state.activeRoom?.currentNumber;

const GameContainer = styled.div`
  width: 100%;
  height: 850px;
  background: #ffffff;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const Logo = styled.img`
  margin-bottom: 20px;
`;

const OverText = styled.span`
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 41px;
  line-height: 52px;
  margin-bottom: 16px;
  color: #ffffff;
`;

const GameWrapper = styled.div`
  width: 65%;
  height: 878px;
`;

const GameOverlay = styled.div`
  position: absolute;
  width: 482px;
  height: 913.5px;
  background: rgba(0, 0, 0, 0.5);
  mix-blend-mode: normal;
  opacity: 0.9;
  z-index: 2;
  font-style: normal;
  font-weight: 700;
  display: flex;
  justify-content: center;
  font-size: 16px;
  align-items: center;
  line-height: 22px;
  color: #000;
  flex-direction: column;
`;

const NewGamebutton = styled.button`
  width: 243px;
  height: 56px;
  background: #ffffff;
  border-radius: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #1574f5;
  border: 1px solid #ffffff;
  cursor: pointer;
`;

const SelectionWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 16px;
`;

const SelectionButton = styled(SelectionContainer)`
  margin-right: 32px;
  border: 1px solid #d7d7d7;
  box-shadow: 0 1px 8px rgb(0 0 0 / 9%);
  cursor: pointer;
`;

const GameInfoText = styled(SideBartext)`
  align-self: center;
`;

const ScrollerDiv = styled.div`
  margin-bottom: 32px;
`;

interface IGamePops {
  socket: any;
  activeRoom: ActiveRoom;
}

function Game({ socket, activeRoom }: IGamePops): ReactElement {
  const user = useSelector(selectUser);
  const turn = useSelector(selectTurn);
  const currentNumber = useSelector(selectCurrentNumber);
  const socketId = useSelector(selectSocketId);
  const dispatch = useDispatch();
  const { messages } = activeRoom;

  const scrollToBottom = (messages: Message[]) => {
    if (messages?.length && messages.length > 4) {
      document
        .getElementById('scrollView')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => scrollToBottom(messages), [messages]);

  useEffect(() => {
    if (socket == null) return;
    socket.on(
      'randomNumber',
      (
        { number, isFirst, user, selectedNumber, isCorrectResult }: Message,
        room: string,
      ) => {
        const roomObject = {
          currentNumber: number,
          message: {
            user: user,
            number: number,
            isFirst: isFirst,
            selectedNumber: selectedNumber,
            isCorrectResult: isCorrectResult,
          },
        };
        if (isFirst) {
          dispatch(activateTurn({ user: socketId, state: GameState.PLAY }));
        }
        dispatch(addNewOutput(roomObject));
      },
    );

    socket.on('activateYourTurn', ({ user, state }: Turn) => {
      const roomObject = {
        user: user,
        state: state,
      };
      dispatch(activateTurn(roomObject));
    });

    socket.on('gameOver', ({ user, isOver }: GameOver) => {
      const roomObject = {
        user: user,
        isOver: isOver,
      };
      dispatch(toggleGameOver(roomObject));
    });

    socket.on('onReady', ({ state }: ReadyState) => {
      dispatch(toggleRoomState(state));
    });

    return () => {
      socket.off('randomNumber');
      socket.off('activateYourTurn');
      socket.off('onReady');
    };
  }, [socket]);

  const startGame = () => {
    socket.emit('letsPlay');
  };

  const selectNumber = (num: number) => {
    socket.emit('sendNumber', {
      selectedNumber: Number(num),
      number: Number(currentNumber),
    });
  };

  const renderMessageView = (message: Message, index: number) => {
    if (!message.user) {
      return <NeutralView key={index} message={message} />;
    } else if (message.user && message.user === user) {
      return <Playerview key={index} message={message} index={index} />;
    } else {
      return <Opponentview key={index} message={message} />;
    }
  };

  return (
    <GameWrapper>
      {activeRoom?.currentNumber === null && activeRoom?.ready && (
        <GameOverlay>
          <NewGamebutton onClick={startGame}>New Game</NewGamebutton>
        </GameOverlay>
      )}
      {activeRoom?.isOver && activeRoom?.winner === user && (
        <GameOverlay>
          <Logo src={Trophy} />
          <OverText>You won</OverText>
          <NewGamebutton onClick={startGame}>New Game</NewGamebutton>
        </GameOverlay>
      )}
      {activeRoom?.isOver && activeRoom?.winner !== user && (
        <GameOverlay>
          <Logo src={Baloons} />
          <OverText>You lose</OverText>
          <NewGamebutton onClick={startGame}>New Game</NewGamebutton>
        </GameOverlay>
      )}
      <GameContainer>
        {activeRoom?.room ? (
          <>
            {activeRoom?.messages.map((message: Message, index: number) =>
              renderMessageView(message, index),
            )}
          </>
        ) : (
          <GameInfoText>Choose a room to start</GameInfoText>
        )}
        {turn &&
          ((turn.user === socketId && turn.state === GameState.PLAY) ||
            (turn.user !== socketId && turn.state === GameState.WAIT)) && (
            <SelectionWrapper>
              <SelectionButton
                onClick={() => selectNumber(-1)}
                background='#fff'
                color='#1574F5'
              >
                -1
              </SelectionButton>
              <SelectionButton
                onClick={() => selectNumber(0)}
                background='#fff'
                color='#1574F5'
              >
                0
              </SelectionButton>
              <SelectionButton
                onClick={() => selectNumber(1)}
                background='#fff'
                color='#1574F5'
              >
                +1
              </SelectionButton>
            </SelectionWrapper>
          )}
        <ScrollerDiv id='scrollView'></ScrollerDiv>
      </GameContainer>
    </GameWrapper>
  );
}

export default Game;

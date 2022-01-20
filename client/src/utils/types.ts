export type Turn = {
  state: string;
  user: string;
};

export type Message = {
  isCorrectResult?: boolean;
  isFirst?: boolean;
  number?: number | string;
  selectedNumber?: number;
  user?: string;
  message?: string;
  room?: string;
  previousNumber?: number | string | null | undefined;
};

export type ReadyState = {
  state: boolean;
};

export type GameOver = {
  user: string;
  isOver: boolean;
};

export type ActiveRoom = {
  currentNumber: number | null;
  previousNumber: number | null;
  error: any;
  isOver: boolean;
  loading: boolean;
  messages: Message[];
  ready: boolean;
  room: string | null;
  turn: Turn | null;
  winner: string | null;
};

export type RoomType = {
  id: string;
  name: string;
  owner: string;
  type: string;
};

export type Room = {
  error: any;
  loading: boolean;
  rooms: RoomType[];
};

type UserType = {
  socketId: string;
  user: string;
};

type User = {
  error: any;
  loading: boolean;
  user: UserType;
};

export type State = {
  activeRoom: ActiveRoom;
  user: User;
  rooms: Room[];
};

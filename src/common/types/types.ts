type InitContent = {
  type: 'init';
  data: {
    url: string;
    id: string;
  };
};
type ChangeTab = {
  type: 'changeTab';
  text: string;
};
export type MessageFromContent = ChangeTab | InitContent;

export type Action = 'executeTypeToScreen';
export type Command = { action: Action };
export type CommandMessage = {
  type: 'command';
  command: Command;
};
export type Info = { type: 'info' };
export type InfoResponse<T> = (data: T) => void;
export type MessageFromBackground = CommandMessage | Info;

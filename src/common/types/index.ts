export type MessageFromContent = { type: 'init' } | { type: 'changeTab', text: string };

export type Action = 'executeTypeToScreen';
export type Command = { action: Action };
export type MessageFromBackground = { type: 'command'; command: Command };
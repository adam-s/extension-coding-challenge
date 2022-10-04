import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export interface ITab {
  id: string;
  name: string;
  sort: number;
}

interface TabProps {
  tab: ITab;
}

// const ListItemStyled = styled(ListItem)<{ isdragging: string | undefined }>`
//   background: ${(props) =>
//     props.isdragging === 'true' ? 'rgb(235,235,235)' : ''};
// `;

export const Tab: React.FC<TabProps> = ({ tab }) => {
  const { id, name, sort } = tab;

  return (
    <Draggable draggableId={id.toString()} index={sort}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ background: snapshot.isDragging ? 'rgb(235,235,235)' : '' }}
        >
          <div>{name}</div>
        </li>
      )}
    </Draggable>
  );
};

import React from 'react';
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from 'react-beautiful-dnd';
import { Tab, ITab } from './Tab';

interface Props {
  tabs: ITab[];
  onDragEnd: OnDragEndResponder;
}

// const PaperStyled = styled(Paper)`
//   margin: 16px;
//   min-width: 350px;
//   max-width: 600px;
// `;

export const Tabs: React.FC<Props> = ({ tabs, onDragEnd }) => {
  // handleReorder will exist here?

  // While loading show spinner and prevent further actions until finished. Test with a setTimeout on the server
  // Also clear text field after successful handleCreate

  return (
    <div id="tab-container">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {Array.isArray(tabs) && tabs.length ? (
                tabs.map((item: any) => <Tab key={item.id} tab={item} />)
              ) : (
                <span>Make a more meaningful empty text</span>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

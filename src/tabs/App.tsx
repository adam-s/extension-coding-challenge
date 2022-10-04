import React from 'react';
import { Tabs } from './tabs';

const App = (): JSX.Element => {
  const tabs = [
    { id: 'one', name: 'One', sort: 0 },
    { id: 'two', name: 'Two', sort: 1 },
    { id: 'three', name: 'Three', sort: 2 },
  ];
  return (
    <div>
      <Tabs
        tabs={tabs}
        onDragEnd={(event) => {
          console.log(event);
        }}
      />
    </div>
  );
};

export default App;

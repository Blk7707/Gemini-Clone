import React from 'react';
import Main from './components/Main/main';
import Sidebar from './components/Sidebar/Sidebar';

const App = () => {
  return (
    <div id="root" style={{ display: 'flex' }}>
      <Sidebar />
      <Main />
    </div>
  );
}

export default App;

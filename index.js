import React from 'react';
import ReactDom from 'react-dom';

// Component
const App = () => (
  <>
    <h1
      style={{
        backgroundColor: 'red',
        color: 'white',
      }}>
      Hello From App
    </h1>
    <input />
  </>
);

ReactDom.render(<App />, document.getElementById('root'));

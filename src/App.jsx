import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Nav from './components/Nav';
import Container from './components/Container';

library.add(fas);

function App() {
  return (
    <div className="App">
      <Nav />
      <Container />
    </div>
  );
}

export default App;

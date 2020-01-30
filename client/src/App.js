import React from 'react';
import AppNavBar from './components/AppNavbar';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <AppNavBar />
        <Container>
          <TaskModal />
          <TaskList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;

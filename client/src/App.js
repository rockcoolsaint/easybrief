import React, { useEffect } from 'react';

import AppNavBar from './components/AppNavbar';
import Posts from './components/Posts';
import NewPostModal from './components/NewPostModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <AppNavBar />
        <Container>
          <NewPostModal />
          <Posts />
        </Container>
      </div>
    </Provider>
  );
}

export default App;

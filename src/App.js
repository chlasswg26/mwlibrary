import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import Verify from './pages/Verify';
import Login from './pages/Login';
import Token from './pages/Token';
// import Description from './pages/Description';
import Manage from './pages/Manage';
import History from './pages/History';
import MyBook from './pages/Book';

const App = () => {
  return (
    <Fragment>
      <Provider store={store}>
        <Router>
          <Switch>
              <Route path='/' component={Home} exact />
              <Route path='/auth/signup' component={Register} />
              <Route path='/auth/verify' component={Verify} />
              <Route path='/auth/signin' component={Login} />
              <Route path='/auth/token' component={Token} />
              {/* <Route path='/description/:id/:books' component={Description} /> */}
              <Route path='/manage' component={Manage} />
              <Route path='/history' component={History} />
              <Route path='/book' component={MyBook} />
          </Switch>
        </Router>
      </Provider>
    </Fragment>
  );
};

export default App;

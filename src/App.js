import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'typeface-roboto';

import Root from './core/components/root/Root';
import store from './core/store/appStore';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter> 
          <Root />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

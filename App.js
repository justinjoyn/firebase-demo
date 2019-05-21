import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Store from './common/store';
import ActivityLoader from './modules/common/ActivityLoader';
import Router from './Router';

class App extends Component {
  componentDidMount() {
    YellowBox.ignoreWarnings(['Require cycle:']);
  }

  render() {
    return (
      <Provider store={Store.store}>
        <PersistGate loading={<ActivityLoader loading={true} />} persistor={Store.persistor}>
          <Router />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;

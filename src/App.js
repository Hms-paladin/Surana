import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import './App.css';
import './branding.css';
// import AppRouter from './routers';
import configureStore, { history } from './store/configureStore';
import Routes from './routers/Routes';


const store = configureStore();

export const apiurl = "http://54.198.55.249:8159/api/v1"

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </Provider>
      </div>
    );
  }
}

export default App;

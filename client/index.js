import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import cityScavenge from './reducers/index';
import App from './components/App';

const store = createStore(cityScavenge, {}, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>,
document.getElementById('app'));

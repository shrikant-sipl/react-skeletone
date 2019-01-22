import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Master from './components/Layout/Master';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import './styles/styles.scss';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Master />
    </Provider>
  , document.querySelector('.start-container'));

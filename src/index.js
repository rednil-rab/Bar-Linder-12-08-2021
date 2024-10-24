import React from 'react';
import { createRoot } from 'react-dom/client';
import { createStore} from 'redux';
import { Provider} from 'react-redux';
import reducer from './store/reducer';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
  <Provider store={store} ><App/></Provider>
);



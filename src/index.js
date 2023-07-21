import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const store = configureStore({ reducer: rootReducer, devTools: true });
const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <React.Fragment>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.Fragment>
    </QueryClientProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

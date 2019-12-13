/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/extensions */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

const id = (new URL(window.location)).searchParams.get('id') || 1;

ReactDOM.render(<App id={id} />, document.getElementById('payment'));

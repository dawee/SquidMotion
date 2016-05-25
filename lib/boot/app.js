import React from 'react';
import ReactDOM from 'react-dom';
import App from '../component/app';
import {showWindow} from '../native';

ReactDOM.render(<App />, document.getElementById('content'));
showWindow();


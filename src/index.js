import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import AppContainer from './AppContainer';

ReactDOM.render( <
    React.StrictMode >
    <
AppContainer/>
    <
    /React.StrictMode>,
    document.getElementById('root')
);
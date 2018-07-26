import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <CssBaseline>
        <App />
    </CssBaseline>, 
    document.getElementById('root'));
registerServiceWorker();

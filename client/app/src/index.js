import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppComponent from './components/app';

//import './index.css';

const App = () => (
    <MuiThemeProvider>
        <AppComponent />
    </MuiThemeProvider>
);

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


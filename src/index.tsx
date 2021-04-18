import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PrimeReact from 'primereact/api';

import '../node_modules/primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './assets/bootstrap.min.css';

PrimeReact.ripple = true; // ripple effect
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
reportWebVitals();

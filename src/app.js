// Libraries
import 'bootstrap';

// Styling
import './styles/app.scss';

// Controllers
import { AppController } from './controller/AppController';

// Hot reload
if (module.hot) {
    module.hot.accept();
}

window.app = new AppController();
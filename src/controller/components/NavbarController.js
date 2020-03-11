import { NavbarView } from '../../views/components/NavbarView';

export class NavbarController {
    constructor(appController) {
        // Controller
        this.appController = appController;

        // View
        this.view = new NavbarView(this);
    }

    switchPage(page) {
        this.appController.switchPage(page);
    }
}
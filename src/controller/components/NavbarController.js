import { NavbarView } from '../../views/components/NavbarView';

export class NavbarController {
    constructor(app) {
        // Initialize instance variables
        this.app = app;
        this.menuItems = [
            { page: this.app.constants.pages.WAREHOUSE, title: "Magazijn" },
            { page: this.app.constants.pages.PRODUCTS, title: "Producten" },
        ];

        // Show content
        this.draw();
    }

    draw() {
        this.view = new NavbarView(this);
    }

    switchPage(page) {
        this.app.content.switchContent(page);
    }
}
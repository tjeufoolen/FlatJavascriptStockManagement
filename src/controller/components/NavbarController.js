import { NavbarComponent } from '../../views/components/NavbarComponent';

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
        this.view = new NavbarComponent(this);
    }
}
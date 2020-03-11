import { NavbarController } from "./components/NavbarController";
import { ContentController } from "./components/ContentController";

export class AppController {
    constructor() {
        // Setup project
        this.init();

        // Load components
        this.navbar = new NavbarController(this);
        this.content = new ContentController(this);
    }

    init() {
        this.pages = {
            WAREHOUSE: 'warehouse',
            PRODUCTS: 'products'
        };
        this.menuItems = [
            { 
                page: this.pages.WAREHOUSE, 
                title: "Magazijn" 
            },
            { 
                page: this.pages.PRODUCTS, 
                title: "Producten" 
            },
        ]
    }

    switchPage(page) {
        this.content.switchContent(page);
    }
}
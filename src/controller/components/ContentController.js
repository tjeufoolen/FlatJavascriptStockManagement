import { ContentView } from '../../views/components/ContentView';

import { WarehouseController } from '../pages/WarehouseController';
import { ProductsController } from '../pages/ProductsController';

export class ContentController {
    constructor(app) {
        // Initialize instance variables
        this.app = app;
        this.productsController = new ProductsController(this.app);
        this.warehouseController = new WarehouseController();

        // Show content
        this.draw();
    }

    draw() {
        this.view = new ContentView();
        this.switchContent(); // Sets initial content
    }

    switchContent(page) {
        // Remove elements from content area
        this.view.clear();

        // Set new page
        switch(page) {
            case this.app.constants.pages.PRODUCTS:
                this.productsController.draw();
                break;
            case this.app.constants.pages.WAREHOUSE:
            default:
                this.warehouseController.draw();
            break;
        }
    }
}
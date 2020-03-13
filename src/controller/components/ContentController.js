import { ContentComponent } from '../../views/components/ContentComponent';

import { WarehouseController } from '../pages/WarehouseController';
import { ProductsController } from '../pages/ProductsController';

export class ContentController {
    constructor(app) {
        // Initialize instance variables
        this.productsController = new ProductsController(app);
        this.warehouseController = new WarehouseController(app);
        this.app = app;

        // Show content
        this.draw();
    }

    draw() {
        this.view = new ContentComponent();
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
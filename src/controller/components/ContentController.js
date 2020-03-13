import { ContentView } from '../../views/components/ContentView';

import { WarehouseController } from '../pages/WarehouseController';
import { ProductsController } from '../pages/ProductsController';

export class ContentController {
    constructor(app) {
        // Initial variables
        this.app = app;
        this.productsController = new ProductsController(this.app);
        this.warehouseController = new WarehouseController();

        // View
        this.view = new ContentView();

        // Set initial content
        this.switchContent();
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
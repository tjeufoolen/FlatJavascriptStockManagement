import { ContentView } from '../../views/components/ContentView';

import { WarehouseController } from '../pages/WarehouseController';
import { ProductsController } from '../pages/ProductsController';

export class ContentController {
    constructor(appController) {
        // Initial variables
        this.appController = appController;
        this.productsController = new ProductsController(this.appController);
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
            case this.appController.enums.pages.PRODUCTS:
                this.productsController.draw();
                break;
            case this.appController.enums.pages.WAREHOUSE:
            default:
                this.warehouseController.draw();
            break;
        }
    }
}
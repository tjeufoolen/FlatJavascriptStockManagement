import { ContentView } from '../../views/components/ContentView';

import { WarehouseController } from '../pages/WarehouseController';
import { ProductsController } from '../pages/ProductsController';

export class ContentController {
    constructor(appController) {
        // Controller
        this.appController = appController;

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
                this.controller = new ProductsController(this.appController);
                break;
            case this.appController.enums.pages.WAREHOUSE:
            default:
                this.controller = new WarehouseController();
            break;
        }
    }
}
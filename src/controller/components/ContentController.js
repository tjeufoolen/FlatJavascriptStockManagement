import { ContentView } from '../../views/components/ContentView';
import { WarehouseController } from '../pages/WarehouseController';
import { ProductsController } from '../pages/ProductsController';
import { CreateProductController } from '../pages/CreateProductController';

export class ContentController {
    constructor(appController) {
        // Initial variables
        this.appController = appController;
        this.productsController = new ProductsController(this.appController);
        this.warehouseController = new WarehouseController();
        this.createProductController = new CreateProductController();

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
                this.warehouseController.draw();
                break;
            case this.appController.enums.pages.CREATE_PRODUCT:
                this.createProductController.draw();
                break;
            default:
                this.warehouseController.draw();
            break;
        }
    }
}


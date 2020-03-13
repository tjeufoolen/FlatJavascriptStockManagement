import { ContentView } from '../../views/components/ContentView';
import { WarehouseController } from '../pages/WarehouseController';
import { ProductsController } from '../pages/ProductsController';
import { CreateProductController } from '../pages/CreateProductController';

export class ContentController {
    constructor(app) {
        // Initialize instance variables
        this.app = app;
        this.productsController = new ProductsController(this.app);
        this.warehouseController = new WarehouseController();
        this.createProductController = new CreateProductController();

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
                this.warehouseController.draw();
                break;
            case this.app.constants.pages.CREATE_PRODUCT:
                this.createProductController.draw();
                break;
            default:
                this.warehouseController.draw();
            break;
        }
    }
}


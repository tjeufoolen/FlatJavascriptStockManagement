// Controllers
import { CreateProductController } from '../pages/CreateProductController';
import { EditProductController } from '../pages/EditProductController';
import { ProductsController } from '../pages/ProductsController';
import { WarehouseController } from '../pages/WarehouseController';
import { WeatherController } from '../pages/WeatherController';

// View
import { ContentComponent } from '../../views/components/ContentComponent';

export class ContentController {
    constructor(app) {
        // Initialize instance variables
        this.app = app;

        // Register controllers (singleton)
        this.productsController = new ProductsController(this.app);
        this.warehouseController = new WarehouseController(this.app);
        this.weatherController = new WeatherController(this.app);        
        
        // Show content
        this.draw();
    }

    draw() {
        this.view = new ContentComponent();
        this.switchContent(); // Sets initial content
    }

    switchContent(page, productId = null) {
        // Remove elements from content area
        this.view.clear();

        // Set new page
        switch(page) {
            case this.app.constants.pages.CREATE_PRODUCT:
                new CreateProductController(this.app).draw();
                break;
            case this.app.constants.pages.EDIT_PRODUCT:
                new EditProductController(this.app, productId).draw();
                break;
            case this.app.constants.pages.PRODUCTS:
                this.productsController.draw();
                break;
            case this.app.constants.pages.WAREHOUSE:
                this.warehouseController.draw();
                break;
            case this.app.constants.pages.WEATHER:
                this.weatherController.draw();
                break;
            default:
                this.warehouseController.draw();
        }
    }
}


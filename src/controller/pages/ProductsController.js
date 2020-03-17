import { ProductsPage } from '../../views/pages/ProductsPage';

export class ProductsController {
    constructor(app) {
        // Initialize instance variables
        this.app = app;
    }

    draw() {
        this.products = this.app.storage.getData("products");           
        this.view = new ProductsPage(this);
    }

    update() {
        this.products = this.app.storage.getData("products");
        this.view.update();       
    }

    createProduct() {
        this.app.content.switchContent(this.app.constants.pages.CREATE_PRODUCT);
    }

    deleteProduct(id) {
        this.app.storage.removeProduct(id);
        this.update();
    }
}
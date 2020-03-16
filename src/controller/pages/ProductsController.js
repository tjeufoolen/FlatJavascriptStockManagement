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

    createProduct(){
        this.app.content.switchContent(this.app.constants.pages.CREATE_PRODUCT);
    }
}
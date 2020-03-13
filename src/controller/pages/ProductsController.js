import { ProductsPage } from '../../views/pages/ProductsPage';

export class ProductsController {
    constructor(appController) {
        // Set instance variables
        this.appController = appController;
        this.products = this.appController.getProducts();
    }

    draw() {        
        this.view = new ProductsPage(this);
    }

    createProduct(){
        this.appController.switchPage(this.appController.enums.pages.CREATE_PRODUCT);
    }
}
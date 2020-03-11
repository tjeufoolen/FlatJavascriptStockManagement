import { ProductsPage } from '../../views/pages/ProductsPage';

export class ProductsController {
    constructor(appController) {
        // Set instance variables
        this.products = appController.getProducts();
    }

    draw() {
        this.view = new ProductsPage(this);
    }

    createProduct() {
        console.log("CREATE PRODUCT");
    }
}
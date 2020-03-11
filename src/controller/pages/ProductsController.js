import { ProductsPage } from '../../views/pages/ProductsPage';
import { CreateProductsPage } from '../../views/pages/CreateProductsPage';
import { CreateProductsController } from './CreateProductsController';

export class ProductsController {
    constructor(appController) {
        // Set instance variables
        this.products = appController.getProducts();
    }

    draw() {
        this.view = new ProductsPage(this);
    }

    createProduct(){
        this.view.clear();
        this.view = new CreateProductsController(this);

        // let createProductsController = new CreateProductsController(this);
        // this.view = new CreateProductsPage(createProductsController);
    }
}
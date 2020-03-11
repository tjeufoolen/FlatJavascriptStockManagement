import { ProductsPage } from '../../views/pages/ProductsPage';
import { CreateProductsPage } from '../../views/pages/CreateProductPage';
import { CreateProductController } from './CreateProductController';

export class ProductsController {
    constructor(appController) {
        // Set instance variables
        this.products = appController.getProducts();
        this.createProductController = new CreateProductController(this);

    }

    draw() {
        this.view = new ProductsPage(this);
    }

    createProduct(){
        


        // this.view.clear();
        // this.view = new CreateProductsController(this);

        // let createProductsController = new CreateProductsController(this);
        // this.view = new CreateProductsPage(createProductsController);
    }
}
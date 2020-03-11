import { ProductsPage } from '../../views/pages/ProductsPage';
// import { CreateProductsPage } from '../../views/pages/CreateProductsPage';
// import { CreateProductsController } from '../../controller/pages/CreateProductsController';

export class CreateProductsController {
    constructor(productsController) {
        this.view = new ProductsPage(this);
    }

}
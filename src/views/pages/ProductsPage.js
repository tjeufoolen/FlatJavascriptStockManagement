const { Page } = require('./Page');

export class ProductsPage extends Page {
    constructor(productController) {
        super();
        
        this.productController = productController;

        // Create heading
        this.heading = this.createElement("h2", ["heading"]);
        this.heading.innerText = "Producten";
        
        this.button = this.createElement("button", ["btn", "btn-primary"]);
        this.button.innerHTML = "tekst";
        this.button.onclick = () => this.productController.createProduct();

        // Add to root
        this.addElementToRoot(this.button);
    }
}
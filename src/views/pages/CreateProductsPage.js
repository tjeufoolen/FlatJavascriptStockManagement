const { Page } = require('./Page');

export class CreateProductsPage extends Page {
    constructor(createProductsController) {
        super();
        
        this.createProductsController = createProductsController;

        // Create heading
        this.heading = this.createElement("h2", ["heading"]);
        this.heading.innerText = "Product aanmaken";
        
        // Add to root
        this.addElementToRoot(this.heading);
    }
}
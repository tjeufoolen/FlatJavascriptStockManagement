const { Page } = require('./Page');

export class CreateProductPage extends Page {
    constructor(createProductController) {
        super();
        
        this.createProductController = createProductController;

        // Create heading
       this.addHeading("Product aanmaken")
        
        // Add to root
        this.addElementToRoot(this.heading);
    }
}
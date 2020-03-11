const { Page } = require('./Page');

export class ProductsPage extends Page {
    constructor() {
        super();
        
        // Create heading
        this.heading = this.createElement("h2", ["heading"]);
        this.heading.innerText = "Producten";
        
        // Add to root
        this.addElementToRoot(this.heading);
    }
}
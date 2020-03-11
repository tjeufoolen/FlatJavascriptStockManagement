import { ContentView } from '../components/ContentView';

const { Page } = require('./Page');

export class CreateProductsPage extends page {
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
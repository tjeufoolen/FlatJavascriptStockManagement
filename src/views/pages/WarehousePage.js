const { Page } = require('./Page');

export class WarehousePage extends Page {
    constructor() {
        super();
        
        // Create heading
        this.heading = this.createElement("h2", ["heading"]);
        this.heading.innerText = "Magazijn";
        
        // Add to root
        this.addElementToRoot(this.heading);
    }
}
const { Page } = require('./Page');

export class WarehousePage extends Page {
    constructor() {
        super();
        
        // Heading
        this.addHeading("Magazijn");
    }
}
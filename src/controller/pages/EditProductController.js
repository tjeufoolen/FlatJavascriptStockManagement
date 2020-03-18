import { EditProductPage } from "../../views/pages/EditProductPage";

export class EditProductController {
    constructor(app, productId) {
        // Set instance variables
        this.app = app;
        this.product = this.app.storage.getData("products").find(p => p.id == productId);
    }

    draw() {
        this.view = new EditProductPage(this);
    }

    updateProduct(name, description, costPrice, sellPrice, minimalStock, currentStock, customProperties) {
        // Parse data to correct types
        costPrice = parseFloat(costPrice);
        sellPrice = parseFloat(sellPrice);
        minimalStock = parseInt(minimalStock);
        currentStock = parseInt(currentStock);

        // Check if data passes validation
        let validationPassed = name.length > 0 
            && description.length > 0
            && costPrice > 0 
            && sellPrice > costPrice
            && minimalStock > 0;

        // Check if custom properties pass validation
        const properties = Object.entries(customProperties);
        for (const [key, value] of properties) {
            if (key.length == 0 || value.length == 0) {
                validationPassed = false;
                return;
            }
        }

        // If validation passed, update the product.
        if (validationPassed) {
            this.product.name = name;
            this.product.description = description;
            this.product.costPrice = costPrice;
            this.product.sellPrice = sellPrice;
            this.product.minimalStock = minimalStock;
            this.product.currentStock = currentStock;
            this.product.customProperties = customProperties;

            this.app.storage.updateProduct(this.product);
            this.app.content.switchContent(this.app.constants.pages.PRODUCTS);
        }
    }
}
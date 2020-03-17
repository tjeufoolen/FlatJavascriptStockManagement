export class RegionController {
    constructor(warehouseController) {
        // Initialize instance variables
        this.warehouseController = warehouseController;
        this.selectedRegion = this.warehouseController.warehouse.regions[0];
        
        this.selectedProductId = null;
    }

    switchRegion(name) {
        this.selectedRegion = this.warehouseController.warehouse.regions.find(r => r.name == name);
    }

    getProduct(productId) {
        return this.warehouseController.app.storage.getData("products").find(p => p.id == productId);
    }

    updateProductImage(imageUrl){
        let product = this.getProduct(this.selectedProductId);
        product.dataUrl = imageUrl;
        this.warehouseController.app.storage.updateProduct(product);
    }
}
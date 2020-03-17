import { WarehousePage } from '../../views/pages/WarehousePage';
import { RegionController } from '../components/RegionController';

export class WarehouseController {
    constructor(app) {
        // Initialize instance variables
        this.app = app;
        this.warehouse = this.app.storage.getData("warehouse");
        this.regionController = new RegionController(this);
        
        // Local data
        this.products = this.getNonPlacedProductsByCategoryType();
        this.selectedProduct = null;
    }

    draw() {
        this.view = new WarehousePage(this, this.regionController);
        this.update();
    }

    switchRegion(name) {
        this.regionController.switchRegion(name);
        this.products = this.getNonPlacedProductsByCategoryType();
        this.view.update();
    }

    getNonPlacedProductsByCategoryType() {
        return this.app.storage.getData("products").filter(p => {
            if (p.category.type == this.regionController.selectedRegion.name) {

                // Check if product has already been placed
                let hasBeenPlaced = false;
                this.regionController.selectedRegion.sections.forEach(r => {
                    r.forEach(s => {
                        if (s.type == "storage" && s.product != null) {
                            if (s.product.id == p.id) hasBeenPlaced = true;
                            return;
                        }
                    });
                });

                // If not placed, than add it to the list
                return !hasBeenPlaced;
            }
        });
    }

    selectProduct(name) {
        const product = this.products.find(p => p.name == name);
        this.view.selectProduct(product);
    }

    updateProductLocation(product, row, column) {
        this.warehouse
            .regions
            .find(r => r.name == this.regionController.selectedRegion.name)
            .sections[row][column]
            .product = product;
        
        this.app.storage.updateProductLocation(this.warehouse);
    }

    update() {
        this.products = this.getNonPlacedProductsByCategoryType();
        this.view.update();
    }
}
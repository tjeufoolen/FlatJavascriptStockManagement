import { WarehousePage } from '../../views/pages/WarehousePage';
import { RegionController } from '../components/RegionController';

export class WarehouseController {
    constructor(app) {
        // Initialize instance variables
        this.app = app;
        this.warehouse = this.app.storage.getData("warehouse");
        this.regionController = new RegionController(this);
        
        // Local data
        this.products = this.getNonPlaceProductsByCategoryType();
    }

    draw() {
        this.view = new WarehousePage(this, this.regionController);
    }

    switchRegion(name) {
        this.regionController.switchRegion(name);
        this.products = this.getNonPlaceProductsByCategoryType();
        this.view.update();
    }

    getNonPlaceProductsByCategoryType() {
        return this.app.storage.getData("products").filter(p => {
            if (p.category.type == this.regionController.selectedRegion.category) {

                // Check if product has already been placed
                let hasBeenPlaced = false;
                this.regionController.selectedRegion.sections.forEach(r => {
                    r.forEach(s => {
                        if (s.type == "storage" && s.product != null) {
                            if (s.product.id != p.id) hasBeenPlaced = true;
                            return;
                        }
                    });
                });

                // If not placed, than add it to the list
                return hasBeenPlaced;
            }
        });
    }
}
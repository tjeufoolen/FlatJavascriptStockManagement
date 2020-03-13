import { WarehousePage } from '../../views/pages/WarehousePage';

export class WarehouseController {
    constructor(app) {
        // Initialize instance variables
        this.app = app;
        this.warehouse = this.app.storage.getData("warehouse");
        this.selectedRegion = this.warehouse.regions[0];
    }

    draw() {
        this.view = new WarehousePage(this);
    }

    switchRegion(name) {
        this.selectedRegion = this.warehouse.regions.find(r => r.name == name);
        this.view.map.updateMap();
        this.view.updateRegionSelector();
    }
}
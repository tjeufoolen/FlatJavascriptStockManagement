import { WarehousePage } from '../../views/pages/WarehousePage';

export class WarehouseController {
    draw() {
        this.view = new WarehousePage(this);
    }
}
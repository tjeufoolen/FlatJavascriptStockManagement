// Helpers
import { JSONConverterController } from "./helpers/JSONConverterController";

export class StorageController {
    constructor(app) {
        this.app = app;

        // Helpers
        this.converter = new JSONConverterController(this.app, this);

        // Load data
        this.initProducts();
        this.initWarehouse();
    }

    initProducts() {
        if (localStorage.getItem("products") == null) {
            // Create products
            const data = require('../storage/products.json');
            const products = this.converter.convertProducts(data);

            // Save products
            this.setData("products", products);
        }
    }

    initWarehouse() {
        if (localStorage.getItem("warehouse") == null) {
            // Create warehouse
            const context = require.context("../storage/regions/", true, /\.json$/);
            const regions = [];
            context.keys().forEach(function (key) {
                const data = context(key);
                regions.push({"name": data.name, "category": data.category, "sections": data.sections})
            });
            const warehouse = this.converter.convertWarehouse(regions);
            
            // Save warehouse
            this.setData("warehouse", warehouse);
        }
    }

    getData(name) {
        const json = JSON.parse(localStorage.getItem(name));

        switch(name) {
            case "products":
                return this.converter.convertProducts(json);
            case "warehouse":
                return this.converter.convertWarehouse(json.regions);
        }
    }

    setData(name, data) {
        localStorage.setItem(name, JSON.stringify(data));
    }
}
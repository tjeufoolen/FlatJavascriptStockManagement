// Helpers
import { JSONConverterController } from "./helpers/JSONConverterController";

// Models
import { Warehouse } from "../models/Warehouse";


export class StorageController {
    constructor(app) {
        // Initialize instance variables
        this.app = app;

        // Helpers
        this.converter = new JSONConverterController(this.app);

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
            let regions = {};

            // Load all regions
            var context = require.context("../storage/regions/", true, /\.json$/);
            const converter = this.converter;
            context.keys().forEach(function (key) {
                const data = context(key);
                regions[data.name] = converter.convertSections(data.sections);
            });

            // Create warehouse
            const warehouse = new Warehouse(regions);
            
            // Save warehouse
            this.setData("warehouse", warehouse);
        }
    }

    getData(name) {
        return this.converter.convertProducts(JSON.parse(localStorage.getItem(name)));
    }

    setData(name, products) {
        localStorage.setItem(name, JSON.stringify(products));
    }
}
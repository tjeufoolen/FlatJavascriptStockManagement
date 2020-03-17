// Helpers
import { JSONConverterController } from "./helpers/JSONConverterController";

export class StorageController {
    constructor(app) {
        this.app = app;

        this.productsSynched = false;
        this.warehouseSynched = false;
        this.citiesSynched = false;
        this.productCache = null;
        this.warehouseCache = null;
        this.citiesCache = null;

        // Helpers
        this.converter = new JSONConverterController(this.app, this);

        // Load data
        this.initProducts();
        this.initWarehouse();
        this.initCities();
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

    initCities() {
        if (localStorage.getItem("cities") == null) {
            // Create cities
            const cities = require('../storage/cities.json');

            // Save cities
            this.setData("cities", cities);
        }
    }

    getData(name) {
        switch(name){
            case "products":
                if(this.productsSynched) return this.productCache;
                else {
                    const json = JSON.parse(localStorage.getItem(name));
                    this.productCache = this.converter.convertProducts(json);
                    this.productsSynched = true;
                    return this.productCache;
                }
            
            case "warehouse":
                if(this.warehouseSynched) return this.warehouseCache;
                else {
                    const json = JSON.parse(localStorage.getItem(name));
                    this.warehouseCache = this.converter.convertWarehouse(json.regions);
                    this.warehouseSynched = true;
                    return this.warehouseCache;
                }
            case "cities":
                if(this.citiesSynched) return this.citiesCache;
                else {
                    const json = JSON.parse(localStorage.getItem(name));
                    this.citiesCache = json;
                    this.citiesSynched = true;
                    return this.citiesCache;
                }
        }
    }
      
    setData(name, data) {
        localStorage.setItem(name, JSON.stringify(data));
    }
      
    getNewProductId(){
        let data = this.getData("products");
        return data.reduce((max, p) => p.id > max ? p.id : max, data[0].id)+1;
    }
      
    addProduct(product){
        let data = this.getData("products");
        data.push(product);
        this.setData("products", data);
        this.productsSynched = false;
    }

    removeProduct(id) {
        // Remove from warehouse
        let warehouse = this.getData("warehouse");
        warehouse.regions.forEach(region => {
            region.sections.forEach(row => {
                row.forEach(section => {
                    if (section.type === this.app.enums.regionTypes.STORAGE && section.product != null) {
                        if (section.product.id == id) {
                            section.product = null;
                        }
                    }
                });
            });
        });
        this.updateProductLocation(warehouse);

        // Remove from products
        let products = this.getData("products");
        products = products.filter(p => p.id != id);
        this.setData("products", products);
        this.productsSynched = false;
    }

    updateProductLocation(warehouse) {
        this.setData("warehouse", warehouse);
        this.warehouseSynched = false;
    }

    updateProduct(product){
        this.setData("products", 
            this.getData("products").map(p => {
                if (p.id == product.id) p = product;
                return p;
            })
        );
        
        this.warehouseSynched = false;
        this.productsSynched = false;
    }
}
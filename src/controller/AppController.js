import { NavbarController } from "./components/NavbarController";
import { ContentController } from "./components/ContentController";

import { JSONConverterController } from "./helpers/JSONConverterController";

import { Warehouse } from "../models/Warehouse";

export class AppController {
    constructor() {
        // Helpers
        this.jsonConverter = new JSONConverterController(this);

        // Setup project
        this.init();

        // Load components
        this.navbar = new NavbarController(this);
        this.content = new ContentController(this);
    }

    init() {
        // Set global enums
        this.enums = {
            "pages": {
                WAREHOUSE: 'warehouse',
                PRODUCTS: 'products'
            },
            "categories": {
                FRILLS: 'frill',
                DECORATION: 'decoration',
                CLOTHING: 'clothing'
            },
            "regionTypes": {
                PASSAGE: 'passage',
                STORAGE: 'storage'
            }
        };

        // Set navigation menu items
        this.menuItems = [
            { page: this.enums.pages.WAREHOUSE, title: "Magazijn" },
            { page: this.enums.pages.PRODUCTS, title: "Producten" },
        ]

        // Save data to localstorage (if not already present)
        this.initData();
    }

    initData() {
        if (localStorage.getItem("products") == null) {
            // Create products
            const data = require('../storage/products.json');
            const products = this.jsonConverter.convertProducts(data);

            // Save products
            this.setData("products", products);
        }

        if (localStorage.getItem("warehouse") == null) {
            let regions = {};

            // Load all regions
            var context = require.context("../storage/regions/", true, /\.json$/);
            const converter = this.jsonConverter;
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
        return this.jsonConverter.convertProducts(JSON.parse(localStorage.getItem(name)));
    }

    setData(name, products) {
        localStorage.setItem(name, JSON.stringify(products));
    }

    switchPage(page) {
        this.content.switchContent(page);
    }
}
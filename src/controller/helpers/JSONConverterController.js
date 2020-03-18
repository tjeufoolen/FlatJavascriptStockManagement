import { Product } from "../../models/Product";
import { FrillCategory } from "../../models/FrillCategory";
import { ClothingCategory } from "../../models/ClothingCategory";
import { DecorationCategory } from "../../models/DecorationCategory";
import { Warehouse } from "../../models/Warehouse";
import { Region } from "../../models/Region";
import { Section } from "../../models/Section";
import { StorageSection } from "../../models/StorageSection";

export class JSONConverterController {
    constructor(app, storage) {
        // Initialize instance variables
        this.app = app;
        this.storage = storage;
    }

    convertProducts(data) {
        let products = [];

        data.forEach(p => {
            let category = null;

            switch(p.category.type) {
                case this.app.enums.categoryTypes.FRILLS:
                    category = new FrillCategory(
                        this.app.enums.categoryTypes.FRILLS, 
                        p.category.weight
                    );
                    break;
                case this.app.enums.categoryTypes.DECORATION:
                    category = new DecorationCategory(
                        this.app.enums.categoryTypes.DECORATION, 
                        p.category.size, 
                        p.category.color, 
                        p.category.amount
                    );
                    break;
                case this.app.enums.categoryTypes.CLOTHING:
                    category = new ClothingCategory(
                        this.app.enums.categoryTypes.CLOTHING, 
                        p.category.color, 
                        p.category.size
                    );
                    break;
            }

            const product = new Product(
                p.id, 
                p.name, 
                p.description, 
                p.costPrice, 
                p.sellPrice,
                p.minimalStock, 
                p.currentStock, 
                category, 
                p.dataUrl, 
                p.imageDescription, 
                p.customProperties
            );

            products.push(product);
        });

        return products;
    }

    convertWarehouse(data) {
        let regions = [];

        data.forEach(r => {
            regions.push(new Region(r.name, r.category, this.convertSections(r.sections)));
        });
        
        return new Warehouse(regions);
    }

    convertSections(data) {
        let sections = [];

        data.forEach((row, index) => {
            sections.push([]);

            row.forEach(r => {
                let section = null;

                switch (r.type) {
                    case this.app.enums.regionTypes.STORAGE:
                        let product = null;

                        if (r.hasOwnProperty("product")) 
                            if (r.product != null)
                                product = this.storage.getData("products").find(p => p.id == r.product.id);
                        if (r.hasOwnProperty("productId")) 
                            product = this.storage.getData("products").find(p => p.id == r.productId);
                        
                        if (product == undefined) product = null;
                        
                        section = new StorageSection(r.type, product);
                        break;
                    case this.app.enums.regionTypes.PASSAGE:
                        section = new Section(r.type);
                        break;
                }
                
                sections[index].push(section);
            });
        });

        return sections;
    }
}
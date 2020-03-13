import { Product } from "../../models/Product";
import { FrillCategory } from "../../models/FrillCategory";
import { ClothingCategory } from "../../models/ClothingCategory";
import { DecorationCategory } from "../../models/DecorationCategory";

import { Region } from "../../models/Region";
import { Section } from "../../models/Section";
import { StorageSection } from "../../models/StorageSection";

export class JSONConverterController {
    constructor(appController) {
        this.appController = appController;
    }

    convertProducts(data) {
        let products = [];

        data.forEach(p => {
            let category = null;
            switch(p.category.type) {
                case this.appController.enums.categories.FRILLS:
                    category = new FrillCategory(p.category.weight);
                    break;
                case this.appController.enums.categories.DECORATION:
                    category = new DecorationCategory(p.category.size, p.category.color, p.category.amount);
                    break;
                case this.appController.enums.categories.CLOTHING:
                    category = new ClothingCategory(p.category.color, p.category.size);
                    break;
            }

            const product = new Product(
                p.name, p.description, p.costPrice, p.sellPrice, p.minimalStock, p.currentStock, category
            );

            products.push(product);
        });

        return products;
    }

    convertSections(data) {
        let sections = [];

        data.forEach((row, index) => {
            sections.push([]);

            row.forEach(r => {
                let section = null;

                switch (r.type) {
                    case this.appController.enums.regionTypes.STORAGE:
                        section = new StorageSection(r.type, r.productId);
                        break;
                    case this.appController.enums.regionTypes.PASSAGE:
                        section = new Section(r.type);
                        break;
                }
                
                sections[index].push(section);
            });
        });

        return new Region(data.name, sections);
    }
}
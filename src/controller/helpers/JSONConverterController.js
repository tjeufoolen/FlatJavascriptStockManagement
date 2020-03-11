import { Product } from "../../models/Product";
import { FrillCategory } from "../../models/FrillCategory";
import { ClothingCategory } from "../../models/ClothingCategory";
import { DecorationCategory } from "../../models/DecorationCategory";

export class JSONConverterController {
    constructor(appController) {
        this.appController = appController;
    }

    convertJSON(data) {
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

            let product = new Product(
                p.name, p.description, p.costPrice, p.sellPrice, p.minimumStock, p.currentStock, category
            );

            products.push(product);
        });

        return products;
    }
}
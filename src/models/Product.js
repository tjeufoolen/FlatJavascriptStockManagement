export class Product {
    constructor(name, description, costPrice, sellPrice, minimalStock, currentStock, category) {
        this.name = name;
        this.description = description;
        this.costPrice = costPrice;
        this.sellPrice = sellPrice;
        this.minimalStock = minimalStock;
        this.currentStock = currentStock;
        this.category = category;
    }

    getSellPriceWithTax() {
        return this.sellPrice * 1.21;
    }
}
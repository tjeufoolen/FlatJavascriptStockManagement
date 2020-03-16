export class Product {
    constructor(id, name, description, costPrice, sellPrice, minimalStock, currentStock, category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.costPrice = costPrice;
        this.sellPrice = sellPrice;
        this.minimalStock = minimalStock;
        this.currentStock = currentStock;
        this.category = category;
    }

    getSellPriceWithBTW() {
        return this.sellPrice * 1.21;
    }
}
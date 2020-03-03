class Product {
    constructor(name, description, costPrice, sellPrice, minimumStock, currentStock, category) {
        this.name = name;
        this.description = description;
        this.costPrice = costPrice;
        this.sellPrice = sellPrice;
        this.minimumStock = minimumStock;
        this.currentStock = currentStock;
        this.category = category;
    }

    getSellPriceWithTax() {
        return this.sellPrice * 1.21;
    }
}
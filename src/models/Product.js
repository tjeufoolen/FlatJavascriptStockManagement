export class Product {
    constructor(id, name, description, costPrice, sellPrice, minimalStock, currentStock, category, dataUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.costPrice = costPrice;
        this.sellPrice = sellPrice;
        this.minimalStock = minimalStock;
        this.currentStock = currentStock;
        this.category = category;
        this.dataUrl = dataUrl;
    }

    getCostPrice() {
        return this.formatPrice(this.costPrice);
    }

    getSellPrice() {
        return this.formatPrice(this.sellPrice);
    }

    getSellPriceWithBTW() {
        return this.formatPrice(this.sellPrice * 1.21);
    }

    formatPrice(price) {
        return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(price);
    }
}
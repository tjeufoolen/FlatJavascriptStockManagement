const { Page } = require('./Page');

export class ProductsPage extends Page {
    constructor(controller) {
        super();
        
        // Heading
        this.addHeading("Producten");

        // Create and add new product button
        this.createProductButton = this.createElement("button", ["btn", "btn-primary", "ml-3"]);
        this.createProductButton.innerText = "Product aanmaken";
        this.createProductButton.onclick = () => controller.createProduct();
        this.heading.appendChild(this.createProductButton);

        // Create and add table
        this.createTable();

        // Add products to table
        this.addProducts(controller.products);
    }

    createTable() {
        this.table = this.createElement("table", ["table", "table-responsive", "mt-3"]);

        // Create table heading
        this.thead = this.createElement("thead", ["thead-light"]);
        
        // Create headers
        this.theadRow = this.createElement("tr");

        this.theadId = this.createElement("th");
        this.theadId.scope = "col";
        this.theadId.innerText = "#";

        this.theadName = this.createElement("th");
        this.theadName.scope = "col";
        this.theadName.innerText = "Naam";

        this.theadCostPrice = this.createElement("th");
        this.theadCostPrice.scope = "col";
        this.theadCostPrice.innerText = "Inkoopprijs";

        this.theadSellPrice = this.createElement("th");
        this.theadSellPrice.scope = "col";
        this.theadSellPrice.innerText = "Verkoopprijs (excl. btw)";

        this.theadMinimumStock = this.createElement("th");
        this.theadMinimumStock.scope = "col";
        this.theadMinimumStock.innerText = "Min. voorraad";

        this.theadCurrentStock = this.createElement("th");
        this.theadCurrentStock.scope = "col";
        this.theadCurrentStock.innerText = "Voorraad";

        // Add headers to table heading
        this.theadRow.appendChild(this.theadId);
        this.theadRow.appendChild(this.theadName);
        this.theadRow.appendChild(this.theadCostPrice);
        this.theadRow.appendChild(this.theadSellPrice);
        this.theadRow.appendChild(this.theadMinimumStock);
        this.theadRow.appendChild(this.theadCurrentStock);
        this.thead.appendChild(this.theadRow);

        // Add table heading to table
        this.table.appendChild(this.thead);

        // Create table body
        this.tbody = this.createElement("tbody");

        // Add table body to table
        this.table.appendChild(this.tbody);

        // Add table to root
        this.addElementToRoot(this.table);
    }

    addProducts(products) {
        products.forEach((p, index) => {
            // Create new row
            let row = this.createElement("tr");

            // Create product id
            let productId = this.createElement("th");
            productId.scope = "row";
            productId.innerText = (index + 1);

            // Create product name
            let productName = this.createElement("td");
            productName.innerText = p.name;

            // Create product cost price
            let productCostPrice = this.createElement("td");
            productCostPrice.innerText = p.costPrice;

            // Create product sell price
            let productSellPrice = this.createElement("td");
            productSellPrice.innerText = p.sellPrice;

            // Create product minimal stock
            let productMinimalStock = this.createElement("td");
            productMinimalStock.innerText = p.minimalStock;

            // Create product stock
            let productStock = this.createElement("td");
            productStock.innerText = p.currentStock;

            // Add product id to row
            row.appendChild(productId);

            // Add product name to row
            row.appendChild(productName);

            // Add product sell price to row
            row.appendChild(productSellPrice);

            // Add product cost price to row
            row.appendChild(productCostPrice);

            // Add product minimal stock to row
            row.appendChild(productMinimalStock);

            // Add product stock to row
            row.appendChild(productStock);
            
            // Add row to table body
            this.tbody.appendChild(row);
        });
    }
}
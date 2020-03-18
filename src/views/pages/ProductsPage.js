const { Page } = require('./Page');

export class ProductsPage extends Page {
    constructor(controller) {
        super();

        // Set instance variables
        this.controller = controller;
        
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

    update() {
        this.getElement("tbody").innerHTML = "";
        this.addProducts(this.controller.products);
    }

    createTable() {
        this.tableContainer = this.createElement("div", ["table-responsive"]);
        this.table = this.createElement("table", ["table", "mt-3"]);

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

        this.theadActions = this.createElement("th");
        this.theadActions.scope = "col";

        // Add headers to table heading
        this.theadRow.appendChild(this.theadId);
        this.theadRow.appendChild(this.theadName);
        this.theadRow.appendChild(this.theadCostPrice);
        this.theadRow.appendChild(this.theadSellPrice);
        this.theadRow.appendChild(this.theadMinimumStock);
        this.theadRow.appendChild(this.theadCurrentStock);
        this.theadRow.appendChild(this.theadActions);
        this.thead.appendChild(this.theadRow);

        // Add table heading to table
        this.table.appendChild(this.thead);

        // Create table body
        this.tbody = this.createElement("tbody");

        // Add table body to table
        this.table.appendChild(this.tbody);

        // Add table to container
        this.tableContainer.appendChild(this.table);

        // Add table to root
        this.addElementToRoot(this.tableContainer);
    }

    addProducts(products) {
        products.forEach((p, index) => {
            // Create new row
            let row = this.createElement("tr");

            // Id
            let productId = this.createElement("th");
            productId.scope = "row";
            productId.innerText = p.id;
            row.appendChild(productId);

            // Product name
            let productName = this.createElement("td");
            productName.innerText = p.name;
            row.appendChild(productName);

            // Cost price
            let productCostPrice = this.createElement("td");
            productCostPrice.innerText = p.costPrice;
            row.appendChild(productCostPrice);

            // Sell price
            let productSellPrice = this.createElement("td");
            productSellPrice.innerText = p.sellPrice;
            row.appendChild(productSellPrice);

            // Minimal stock
            let productMinimalStock = this.createElement("td");
            productMinimalStock.innerText = p.minimalStock;
            row.appendChild(productMinimalStock);

            // Current stock
            let productStock = this.createElement("td");
            productStock.innerText = p.currentStock;
            row.appendChild(productStock);

            // Actions
            let productActions = this.createElement("td");
            let editButton = this.createElement("button", ["btn", "btn-secondary"])
            editButton.appendChild(this.createElement("i", ["fas", "fa-edit"]));
            editButton.onclick = () => this.controller.editProduct(p.id);
            productActions.appendChild(editButton);
            let deleteButton = this.createElement("button", ["btn", "btn-danger", "ml-1"])
            deleteButton.appendChild(this.createElement("i", ["fas", "fa-trash-alt"]));
            deleteButton.onclick = () => this.controller.deleteProduct(p.id);
            productActions.appendChild(deleteButton);
            row.appendChild(productActions);
            
            
            // Add row to table body
            this.tbody.appendChild(row);
        });
    }
}
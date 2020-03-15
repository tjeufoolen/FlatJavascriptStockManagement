import { Page } from "./Page";
import { RegionComponent } from "../components/RegionComponent";

export class WarehousePage extends Page {
    constructor(controller) {
        super();

        // Set instance variables
        this.controller = controller;
        
        // Heading
        this.addHeading("Magazijn");

        // Create root element to contain everything
        const root = this.createElement("div", ["warehouse", "row"]);

        // Products
        const productsColumn = this.createElement("div", ["col-12", "col-lg-4"]);
        this.createProductSelector(productsColumn);
        
        // Map
        const mapColumn = this.createElement("div", ["col-12", "col-lg-8"]);
        this.region = new RegionComponent(this.controller, mapColumn);

        // Append columns to root element
        root.appendChild(productsColumn);
        root.appendChild(mapColumn);

        // Append root to content container
        this.getElement("#content").appendChild(root);
    }

    update() {
        this.region.update();
    }

    selectProduct(name) {
        const product = this.controller.products.find(p => p.name == name);
        const elem = this.getElement(".selected-product");

        // Set data
        elem.querySelector(".selected-product-name").innerText = product.name;
        elem.querySelector(".selected-product-description").innerText = product.description;
        const attributes = elem.querySelector(".selected-product-attributes");
        attributes.querySelector(".selected-product-cost-price").innerText = product.costPrice;
        attributes.querySelector(".selected-product-sell-price").innerText = product.sellPrice;
        attributes.querySelector(".selected-product-minimal-stock").innerText = product.minimalStock;
        attributes.querySelector(".selected-product-stock").innerText = product.currentStock;
    }

    createProductSelector(root) {
        let elem = this.createElement("div", ["product-selector"]);

        // Create and add dropdown
        let dropdown = this.createElement("div", ["dropdown"])
        let dropdownButton = this.createElement("button", ["btn", "btn-secondary", "dropdown-toggle"]);
        dropdownButton.type = "button";
        dropdownButton.id = "dropdownMenuButton";
        dropdownButton.dataset.toggle = "dropdown";
        dropdownButton.setAttribute("aria-haspopup", true);
        dropdownButton.setAttribute("aria-expanded", false);
        dropdownButton.innerText = "Product";

        let dropdownMenu = this.createElement("div", ["dropdown-menu"]);
        dropdownMenu.setAttribute("aria-labelledby", "dropdownMenuButton");

        this.controller.products.forEach(p => {
            let product = this.createElement("span", ["dropdown-item"]);
            product.onclick = () => this.selectProduct(p.name);
            product.innerText = p.name;

            dropdownMenu.appendChild(product);
        });

        dropdown.appendChild(dropdownMenu);
        dropdown.appendChild(dropdownButton);
        elem.appendChild(dropdown);


        // Create selected product container
        let productContainer = this.createElement("div", ["selected-product", "mb-3"]);
        productContainer.draggable = true;
        let productName = this.createElement("h4", ["selected-product-name"]);
        let productDescription = this.createElement("p", ["selected-product-description"]);
        let productAttributes = this.createElement("table", ["selected-product-attributes"]);
        
        let productCostPrice = this.createElement("tr");
        let productCostPriceHeader = this.createElement("th");
        productCostPriceHeader.innerText = "Inkoopprijs";
        let productCostPriceValue = this.createElement("td", ["selected-product-cost-price"]);
        productCostPrice.appendChild(productCostPriceHeader);
        productCostPrice.appendChild(productCostPriceValue);
        productAttributes.appendChild(productCostPrice);
        
        let productSellPrice = this.createElement("tr");
        let productSellPriceHeader = this.createElement("th");
        productSellPriceHeader.innerText = "Verkoopprijs";
        let productSellPriceValue = this.createElement("td", ["selected-product-sell-price"]);
        productSellPrice.appendChild(productSellPriceHeader);
        productSellPrice.appendChild(productSellPriceValue);
        productAttributes.appendChild(productSellPrice);
        
        let productMinimalStock = this.createElement("tr");
        let productMinimalStockHeader = this.createElement("th");
        productMinimalStockHeader.innerText = "Minimale voorraad";
        let productMinimalStockValue = this.createElement("td", ["selected-product-minimal-stock"]);
        productMinimalStock.appendChild(productMinimalStockHeader);
        productMinimalStock.appendChild(productMinimalStockValue);
        productAttributes.appendChild(productMinimalStock);
        
        let productStock = this.createElement("tr");
        let productStockHeader = this.createElement("th");
        productStockHeader.innerText = "Huidige voorraad";
        let productStockValue = this.createElement("td", ["selected-product-stock"]);
        productStock.appendChild(productStockHeader);
        productStock.appendChild(productStockValue);
        productAttributes.appendChild(productStock);
        
        
        productContainer.appendChild(productName);
        productContainer.appendChild(productDescription);
        productContainer.appendChild(productAttributes);
        elem.appendChild(productContainer);


        // Append selector to root element
        root.appendChild(elem);
    }
}
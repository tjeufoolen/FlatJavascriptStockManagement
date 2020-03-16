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
        const productsColumn = this.createElement("div", ["col-12", "col-lg-5"]);
        this.createProductSelector(productsColumn);
        
        // Map
        const mapColumn = this.createElement("div", ["col-12", "col-lg-7"]);
        this.region = new RegionComponent(this.controller.regionController, mapColumn);

        // Append columns to root element
        root.appendChild(productsColumn);
        root.appendChild(mapColumn);

        // Append root to content container
        this.getElement("#content").appendChild(root);

         // Set dropdown values
         this.updateProductSelectorValues();
    }

    update() {
        this.updateProductSelectorValues();
        this.region.update();
    }

    updateProductSelectorValues() {
        const dropdownMenu = this.getElement(".dropdown-menu");
        dropdownMenu.innerHTML = "";

        if (this.controller.products.length > 0) {
            this.getElement("#dropdownMenuButton").disabled = false;
            
            this.controller.products.forEach(p => {
                let product = this.createElement("span", ["dropdown-item"]);
                product.onclick = () => this.selectProduct(p.name);
                product.innerText = p.name;
    
                dropdownMenu.appendChild(product);
            });
        } else {
            this.getElement("#dropdownMenuButton").disabled = true;
            this.getElement(".selected-product").draggable = false;
        }

        this.resetSelectedProduct();
    }

    resetSelectedProduct() {
        this.controller.selectedProduct = null;

        const elem = this.getElement(".selected-product");
        elem.querySelector(".selected-product-name").innerText = "";
        elem.querySelector(".selected-product-description").innerText = "";
        
        const attributes = elem.querySelector(".selected-product-attributes");
        attributes.querySelector(".selected-product-cost-price").innerText = "";
        attributes.querySelector(".selected-product-sell-price").innerText = "";
        attributes.querySelector(".selected-product-sell-price-btw").innerText = "";
        attributes.querySelector(".selected-product-minimal-stock").innerText = "";
        attributes.querySelector(".selected-product-stock").innerText = "";
        
        this.getElement(".selected-product").draggable = false;
    }

    selectProduct(name) {
        const product = this.controller.products.find(p => p.name == name);
        this.controller.selectedProduct = product; 
        
        const elem = this.getElement(".selected-product");

        // Set data
        elem.querySelector(".selected-product-name").innerText = product.name;
        elem.querySelector(".selected-product-description").innerText = product.description;
        const attributes = elem.querySelector(".selected-product-attributes");
        attributes.querySelector(".selected-product-cost-price").innerText = product.getCostPrice();
        attributes.querySelector(".selected-product-sell-price").innerText = product.getSellPrice();
        attributes.querySelector(".selected-product-sell-price-btw").innerText = product.getSellPriceWithBTW();
        attributes.querySelector(".selected-product-minimal-stock").innerText = product.minimalStock;
        attributes.querySelector(".selected-product-stock").innerText = product.currentStock;

        this.getElement(".selected-product").draggable = true;
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
        dropdownButton.innerText = "Selecteer een product";

        let dropdownMenu = this.createElement("div", ["dropdown-menu"]);
        dropdownMenu.setAttribute("aria-labelledby", "dropdownMenuButton");

        dropdown.appendChild(dropdownMenu);
        dropdown.appendChild(dropdownButton);
        elem.appendChild(dropdown);

        // Create selected product container
        let productContainerHeader = this.createElement("h4", ["mt-5"]);
        productContainerHeader.innerText = "Geselecteerde product";
        let productContainerAdditionalInfo = this.createElement("small", ["form-text", "text-muted", "pb-2"]);
        productContainerAdditionalInfo.innerText = "Sleep (nadat je een product hebt geselecteerd) onderstaand blok naar een magazijn sectie om hem een vaste locatie toe te wijzen."; 
        elem.appendChild(productContainerHeader);
        elem.appendChild(productContainerAdditionalInfo);

        let productContainer = this.createElement("div", ["selected-product", "mb-3"]);
        productContainer.draggable = false;
        productContainer.addEventListener('dragstart', this.dragStart)
        productContainer.addEventListener('dragend', this.dragEnd);
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
        productSellPriceHeader.innerText = "Verkoopprijs (Excl. btw)";
        let productSellPriceValue = this.createElement("td", ["selected-product-sell-price"]);
        productSellPrice.appendChild(productSellPriceHeader);
        productSellPrice.appendChild(productSellPriceValue);
        productAttributes.appendChild(productSellPrice);

        let productSellPriceBTW = this.createElement("tr");
        let productSellPriceBTWHeader = this.createElement("th");
        productSellPriceBTWHeader.innerText = "Verkoopprijs (Incl. btw)";
        let productSellPriceBTWValue = this.createElement("td", ["selected-product-sell-price-btw"]);
        productSellPriceBTW.appendChild(productSellPriceBTWHeader);
        productSellPriceBTW.appendChild(productSellPriceBTWValue);
        productAttributes.appendChild(productSellPriceBTW);
        
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

    dragStart() {
        setTimeout(() => this.classList.add('invisible'), 0);
    }

    dragEnd() {
        this.classList.remove('invisible');
    }
}
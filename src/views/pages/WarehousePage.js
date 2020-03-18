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
                product.onclick = () => this.controller.selectProduct(p.name);
                product.innerText = p.name;
    
                dropdownMenu.appendChild(product);
            });
        } else {
            this.getElement("#dropdownMenuButton").disabled = true;
            this.getElement(".selected-product").draggable = false;
        }

        this.selectProduct();
    }

    selectProduct(product = null) {
        this.controller.selectedProduct = product;
        const elem = this.getElement(".selected-product");

        // Set content
        elem.querySelector("#selected-product-name").innerText = (product != null) ? product.name : "";
        elem.querySelector("#selected-product-description").innerText = (product != null) ? product.description : "";
        const attributes = elem.querySelector(".selected-product-attributes");
        attributes.querySelector("#selected-product-cost-price").innerText = (product != null) ? product.getCostPrice() : "";
        attributes.querySelector("#selected-product-sell-price").innerText = (product != null) ? product.getSellPrice() : "";
        attributes.querySelector("#selected-product-sell-price-btw").innerText = (product != null) ? product.getSellPriceWithBTW() : "";
        attributes.querySelector("#selected-product-minimal-stock").innerText = (product != null) ? product.minimalStock : "";
        attributes.querySelector("#selected-product-stock").innerText = (product != null) ? product.currentStock : "";

        // Set draggable
        if (product != null) {
            this.getElement(".selected-product").draggable = true;
        } else {
            this.getElement(".selected-product").draggable = false;
        }
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
        let productName = this.createElement("h4");
        productName.id = "selected-product-name";
        let productDescription = this.createElement("p");
        productDescription.id = "selected-product-description";
        let productAttributes = this.createElement("table", ["selected-product-attributes"]);
        productAttributes.appendChild(this.createTableRow("Inkoopprijs", "selected-product-cost-price"));
        productAttributes.appendChild(this.createTableRow("Verkoopprijs (Excl. btw)", "selected-product-sell-price"));
        productAttributes.appendChild(this.createTableRow("Verkoopprijs (Incl. btw)", "selected-product-sell-price-btw"));
        productAttributes.appendChild(this.createTableRow("Minimale voorraad", "selected-product-minimal-stock"));
        productAttributes.appendChild(this.createTableRow("Huidige voorraad", "selected-product-stock"));
        
        
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
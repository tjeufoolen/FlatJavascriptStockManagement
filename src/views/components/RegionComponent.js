const { View } = require('../View');
import { DrawableCanvas } from "../../views/pages/DrawableCanvas";
import { Form } from "../pages/form";

export class RegionComponent extends View {

    constructor(controller, root) {
        super();

        // Set instance variables
        this.controller = controller;
        this.root = root;

        this.drawCanvas = new DrawableCanvas();
        
        // Create selector
        this.createRegionSelector();

        // Create map container
        this.region = this.createElement("div", ["region"]);

        // Fill container
        this.generateRegion();

        // Create (hover) card info
        this.createHoverableProductCardInfo();

       
    }

    update() {
        this.updateMap();
        this.updateRegionSelector();
        this.updateHoverableProductCardInfo();
    }

    updateMap() {
        this.region.innerHTML = "";
        this.generateRegion();
    }

    updateRegionSelector() {
        let elem = this.regionSelector.querySelector(".nav-item .active");
        if (elem != null) {
            elem.classList.remove("active");
            let items = this.regionSelector.querySelectorAll(".nav-item .nav-link");
            items.forEach(i => {
                if (i.innerText == this.controller.selectedRegion.name) {
                    i.classList.add("active");
                }
            });
        }
    }

    updateHoverableProductCardInfo() {
        this.getElement(".product-info-card").remove();
        this.createHoverableProductCardInfo();
    }

    createRegionSelector(root) {
        this.regionSelector = this.createElement("ul", ["nav", "nav-tabs", "region-selector"]);
        
        this.controller.warehouseController.warehouse.regions.forEach(r => {
            // Create navigation item
            let navItem = this.createElement("li", ["nav-item"]);

            // Create navigation link
            let navLink = this.createElement("a", ["nav-link"]);
            if (this.controller.selectedRegion.name == r.name) navLink.classList.add("active");
            navLink.onclick = () => {
                this.controller.warehouseController.switchRegion(r.name);
            };
            navLink.innerText = r.name;

            // Add navigation link to navigation item
            navItem.appendChild(navLink);

            // Add navigation item to region selector
            this.regionSelector.appendChild(navItem);
        });

        this.root.appendChild(this.regionSelector);
    }

    createHoverableProductCardInfo() {
        let _self = this;
        // Create product card container
        this.productCard = this.createElement("div", ["product-info-card"]);

        // Product information
        const productName = this.createElement("h3", ["product-name"]);
        const productDescription = this.createElement("p", ["product-description"]);
        let productAttributes = this.createElement("table", ["table", "table-bordered"]);
        
        let productCostPrice = this.createElement("tr");
        let productCostPriceHeader = this.createElement("th");
        productCostPriceHeader.innerText = "Inkoopprijs";
        let productCostPriceValue = this.createElement("td", ["product-cost-price"]);
        productCostPrice.appendChild(productCostPriceHeader);
        productCostPrice.appendChild(productCostPriceValue);
        productAttributes.appendChild(productCostPrice);
        
        let productSellPrice = this.createElement("tr");
        let productSellPriceHeader = this.createElement("th");
        productSellPriceHeader.innerText = "Verkoopprijs (Excl. BTW)";
        let productSellPriceValue = this.createElement("td", ["product-sell-price"]);
        productSellPrice.appendChild(productSellPriceHeader);
        productSellPrice.appendChild(productSellPriceValue);
        productAttributes.appendChild(productSellPrice);

        let productSellPriceBtw = this.createElement("tr");
        let productSellPriceBtwHeader = this.createElement("th");
        productSellPriceBtwHeader.innerText = "Verkoopprijs (Incl. BTW)";
        let productSellPriceBtwValue = this.createElement("td", ["product-sell-price-btw"]);
        productSellPriceBtw.appendChild(productSellPriceBtwHeader);
        productSellPriceBtw.appendChild(productSellPriceBtwValue);
        productAttributes.appendChild(productSellPriceBtw);
        
        let productMinimalStock = this.createElement("tr");
        let productMinimalStockHeader = this.createElement("th");
        productMinimalStockHeader.innerText = "Minimale voorraad";
        let productMinimalStockValue = this.createElement("td", ["product-minimal-stock"]);
        productMinimalStock.appendChild(productMinimalStockHeader);
        productMinimalStock.appendChild(productMinimalStockValue);
        productAttributes.appendChild(productMinimalStock);
        
        let productStock = this.createElement("tr");
        let productStockHeader = this.createElement("th");
        productStockHeader.innerText = "Huidige voorraad";
        let productStockValue = this.createElement("td", ["product-stock"]);
        productStock.appendChild(productStockHeader);
        productStock.appendChild(productStockValue);
        productAttributes.appendChild(productStock);
        
        let seperator = this.createElement("hr", []);

        let productCanvas = this.drawCanvas.generateDrawableCanvas();
        productCanvas.id = "productImage";

        let imageGroup = this.createElement("div", ["custom-file", "mt-1", "mb-3"]);
            let imageInput = this.createElement("input", ["custom-file-input"]);
            imageInput.type = "file"; 
            imageInput.id = "imageInput1";
            imageInput.innerText = "Foto aanpassen"

            imageInput.onchange = function(e) {
                let canvas = document.querySelector("#productImage");
                let context = canvas.getContext('2d');
                context.clearRect(0, 0, canvas.width, canvas.height);

                let img = new Image();
                
                if(this.files[0]){
                    img.src = URL.createObjectURL(this.files[0]);
                }
                
                img.onload = ()=>{
                    let scale = Math.min(canvas.width / img.width, canvas.height / img.height);

                    let x = (canvas.width / 2) - (img.width / 2) * scale;
                    let y = (canvas.height / 2) - (img.height / 2) * scale;

                    context.drawImage(img, x, y, img.width * scale, img.height * scale);
                }
              };

            let imageLabel = this.createElement("label", ["custom-file-label"]);
            imageLabel.htmlFor = "imageInput1";
            imageLabel.innerText = "Kies een bestand";
        imageGroup.appendChild(imageInput);
        imageGroup.appendChild(imageLabel);

        let editPhotoButtonGroup = this.createElement("div", ["text-center"]);
        let editPhotoButton = this.createElement("button", ["btn", "btn-secondary", "d-inline-block", "m-1"]);
        editPhotoButton.innerText = "Opslaan";
        editPhotoButton.onclick = () => {                        
            _self.controller.updateProductImage(_self.getElement("#productImage").toDataURL());
            _self.hideCard();
        };
        editPhotoButtonGroup.appendChild(editPhotoButton);

        // Add product information to product card
        this.productCard.appendChild(productName);
        this.productCard.appendChild(productDescription);
        this.productCard.appendChild(productAttributes);
        
        this.productCard.appendChild(seperator);
        
        this.productCard.appendChild(productCanvas)
        this.productCard.appendChild(imageGroup);
        this.productCard.appendChild(editPhotoButtonGroup);

        this.productCard.appendChild(seperator);

        // Create and add remove from warehouse button
        let buttongroup = this.createElement("div", ["text-center"]);
        
        let removeFromWarehouseButton = this.createElement("button", ["btn", "btn-secondary", "d-inline-block", "m-1"]);
        removeFromWarehouseButton.innerText = "Locatie verwijderen";
        removeFromWarehouseButton.onclick = () => this.removeProductFromWarehouse();
        buttongroup.appendChild(removeFromWarehouseButton);
        
        this.productCard.appendChild(buttongroup);

        // Append product card to root element
        this.root.appendChild(this.productCard);
    }

    removeProductFromWarehouse() {
        const productId = this.controller.selectedProductId;

        // Update front-end
        const elem = document.querySelector(`.region-product[data-productid='${productId}']`);
        const row = elem.parentElement.dataset.row;
        const column = elem.parentElement.dataset.column;

        // Save product
        this.controller.warehouseController.updateProductLocation(null, row, column);

        // Cleanup
        elem.remove();
        this.hideCard();

        // Update selector
        this.controller.warehouseController.update();
    }

    generateRegion() {
        // Create and add sections to the map container
        var _self = this;
        this.controller.selectedRegion.sections.forEach((row, y) => {
            let regionRow = _self.createElement("div", ["region-row"])
            
            row.forEach((s, x) => {
                let regionSection = _self.createElement("div", ["region-section", s.type]);
                regionSection.dataset.row = y;
                regionSection.dataset.column = x;

                // Check if section has product, if so.. draw it.
                if (s.product != null) {
                    let regionProduct = _self.createElement("div", ["region-product"]);
                    regionProduct.dataset.productid = s.product.id;
                    regionProduct.onclick = () => this.toggleProductInfo(regionProduct);

                    regionSection.appendChild(regionProduct);
                } else {
                    if (s.type == this.controller.warehouseController.app.enums.regionTypes.STORAGE) {
                        regionSection.addEventListener('dragover', this.productDragOver);
                        regionSection.addEventListener('dragleave', this.productDragLeave);
                        regionSection.addEventListener('drop', (e) => this.productDragDrop(e));
                    }

                    regionSection.onclick = () => this.hideCard();
                }

                regionRow.appendChild(regionSection);
            });

            _self.region.appendChild(regionRow);
        });

        // Append map container to the root element
        this.root.appendChild(this.region);
    }

    productDragOver(e) {
        e.preventDefault();
        this.classList.add("hovered");
    }

    productDragLeave() {
        this.classList.remove("hovered");
    }

    productDragDrop(e) {
        // Update front-end
        const target = e.toElement;
        target.classList.remove("hovered");

        const product = this.controller.warehouseController.selectedProduct;
        let elem = this.createElement("div", ["region-product"]);
        elem.dataset.productid = product.id;
        target.appendChild(elem);
        target.onclick = () => this.toggleProductInfo(elem);

        // Save product
        const row = target.dataset.row;
        const column = target.dataset.column;
        this.controller.warehouseController.updateProductLocation(product, row, column);

        // Update selector
        this.controller.warehouseController.update();
    }

    toggleProductInfo(product) {
        if (product.dataset.productid == this.controller.selectedProductId) {
            switch (this.productCard.style.display) {
                case "inline-block":
                    this.hideCard();
                    break;
                case "none":
                default:
                    this.showCard(product);
                    break;
            }
        } else {
            this.showCard(product);
        }
    }

    hideCard() {
        this.productCard.style.display = "none";
        this.controller.selectedProductId = null;
    }

    showCard(elem) {
        const productId = elem.dataset.productid;
        this.productCard.style.display = "inline-block";
        this.controller.selectedProductId = productId;

        // Get actual product information
        const product = this.controller.getProduct(productId);

        // Set content
        const heading = this.productCard.querySelector(".product-name");
        const description = this.productCard.querySelector(".product-description");
        const costPrice = this.productCard.querySelector(".product-cost-price");
        const sellPrice = this.productCard.querySelector(".product-sell-price");
        const sellPriceBtw = this.productCard.querySelector(".product-sell-price-btw");
        const minimalStock = this.productCard.querySelector(".product-minimal-stock");
        const currentStock = this.productCard.querySelector(".product-stock");
        const canvas = this.productCard.querySelector("#productImage");
        
        heading.innerText = `${product.name} #${product.id}`;
        description.innerText = product.description;
        costPrice.innerText = product.getCostPrice();
        sellPrice.innerText = product.getSellPrice();
        sellPriceBtw.innerText = product.getSellPriceWithBTW();
        minimalStock.innerText = product.minimalStock;
        currentStock.innerText = product.currentStock;
 
        if(product.dataUrl){
            canvas.getContext('2d').clearRect(0,0, canvas.width, canvas.height);
            let img = new Image();
            img.src = product.dataUrl;
            img.onload = () =>{
                canvas.getContext('2d').drawImage(img,0,0);
            }
        } else {
            canvas.getContext('2d').clearRect(0,0, canvas.width, canvas.height);
        }

        // Set position
        let x = (window.scrollX + elem.offsetLeft) - (this.productCard.offsetWidth/2);
        let y = (window.scrollY + elem.offsetTop) + elem.offsetHeight;

        this.productCard.style.left = `${x}px`;
        this.productCard.style.top = `${y}px`;
    }
}
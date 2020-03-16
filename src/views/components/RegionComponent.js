const { View } = require('../View');

export class RegionComponent extends View {
    constructor(controller, root) {
        super();

        // Set instance variables
        this.controller = controller;
        this.root = root;

        // Create selector
        this.createRegionSelector();

        // Create map container
        this.region = this.createElement("div", ["region"]);

        // Fill container
        this.generateRegion();
    }

    update() {
        this.updateMap();
        this.updateRegionSelector();
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

    createRegionSelector(root) {
        this.regionSelector = this.createElement("ul", ["nav", "nav-tabs", "region-selector"]);
        
        this.controller.warehouse.regions.forEach(r => {
            // Create navigation item
            let navItem = this.createElement("li", ["nav-item"]);

            // Create navigation link
            let navLink = this.createElement("a", ["nav-link"]);
            if (this.controller.selectedRegion.name == r.name) navLink.classList.add("active");
            navLink.onclick = () => this.controller.switchRegion(r.name);
            navLink.innerText = r.name;

            // Add navigation link to navigation item
            navItem.appendChild(navLink);

            // Add navigation item to region selector
            this.regionSelector.appendChild(navItem);
        });

        this.root.appendChild(this.regionSelector);
    }

    generateRegion() {
        // Create and add sections to the map container
        var _self = this;
        this.controller.selectedRegion.sections.forEach((row, y) => {
            let regionRow = _self.createElement("div", ["region-row"])
            
            row.forEach((s, x) => {
                let regionSection = _self.createElement("div", ["region-section", s.type]);

                // Check if section has product, if so.. draw it.
                if (s.product != null) {
                    let regionProduct = _self.createElement("div", ["region-product"]);
                    regionSection.appendChild(regionProduct);
                }

                regionRow.appendChild(regionSection);
            });

            _self.region.appendChild(regionRow);
        });

        // Append map container to the root element
        this.root.appendChild(this.region);
    }
}
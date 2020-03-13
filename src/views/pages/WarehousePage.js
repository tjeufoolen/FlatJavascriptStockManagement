import { Page } from "./Page";
import { MapComponent } from "../components/MapComponent";

export class WarehousePage extends Page {
    constructor(controller) {
        super();

        // Set instance variables
        this.controller = controller;
        
        // Heading
        this.addHeading("Magazijn");

        // Region selector
        this.createRegionSelector();

        // Map
        this.map = new MapComponent(this.controller);
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

    createRegionSelector() {
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

        this.addElementToRoot(this.regionSelector);
    }
}
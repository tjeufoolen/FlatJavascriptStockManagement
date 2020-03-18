const { View } = require('../View');

export class Page extends View {
    constructor() {
        super();

        // The root element
        this.root = document.querySelector("#content");
    }

    addHeading(title) {
        // Create heading container
        this.heading = this.createElement("div", ["heading", "mb-3", "d-flex", "align-items-center"]);
        
        // Create title 
        this.title = this.createElement("h2", ["d-inline-block", "mb-0"]);
        this.title.innerText = title;

        // Add title to heading container
        this.heading.appendChild(this.title);

        // Add heading containter to root
        this.addElementToRoot(this.heading);
    }

    addElementToRoot(element) {
        // Append the page to the root
        this.root.appendChild(element);
    }

    createTableRow(innerText, identifier) {
        let row = this.createElement("tr");
        
        // heading
        let heading = this.createElement("th");
        heading.innerText = innerText;
        row.appendChild(heading);
        
        // Value
        let value = this.createElement("td");
        value.id = identifier;
        row.appendChild(value);

        return row;
    }
}
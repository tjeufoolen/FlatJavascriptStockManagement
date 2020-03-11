const { View } = require('../View');

export class Page extends View {
    constructor() {
        super();

        // The root element
        this.root = document.querySelector("#content");
    }

    addElementToRoot(element) {
        // Append the page to the root
        this.root.appendChild(element);
    }
}
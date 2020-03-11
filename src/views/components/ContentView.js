const { View } = require('../View');

export class ContentView extends View {
    constructor() {
        super();

        // The root element
        this.root = document.body;

        // The content
        this.content = this.createElement("main", ["container"]);
        this.content.id = "content";

        // Append the content to the root
        this.root.appendChild(this.content);
    }

    clear() {
        this.content.innerHTML = "";
    }
}
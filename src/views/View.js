export class View {
    constructor() {
        if (new.target === View) {
            throw new TypeError("Cannot construct View instances directly");
        }
    }

    // Create an element with optional classes
    createElement(tag, classes) {
        const element = document.createElement(tag);
        if (classes) classes.forEach(c => element.classList.add(c));

        return element;
    }

    // Retrieve an element from the DOM
    getElement(selector) {
        const element = document.querySelector(selector)

        return element
    }
}
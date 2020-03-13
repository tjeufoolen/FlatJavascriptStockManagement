import { Section } from './Section';

export class StorageSection extends Section {
    constructor(type, productId) {
        super(type);

        // Set instance variables
        this.productId = productId;
    }
}
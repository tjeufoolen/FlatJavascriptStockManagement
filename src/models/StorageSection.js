import { Section } from './Section';

export class StorageSection extends Section {
    constructor(type, product) {
        super(type);

        // Set instance variables
        this.product = product;
    }
}
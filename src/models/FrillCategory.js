import { Category } from './Category';

export class FrillCategory extends Category {
    constructor(type, weight) {
        super(type);

        // Set instance variables
        this.weight = weight;
    }
}
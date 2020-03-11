import { Category } from './Category';

export class DecorationCategory extends Category {
    constructor(size, color, amount) {
        super();

        // Set instance variables
        this.size = size;
        this.color = color;
        this.amount = amount;
    }
}
import { Category } from './Category';

export class DecorationCategory extends Category {
    constructor(type, size, color, amount) {
        super(type);

        // Set instance variables
        this.size = size;
        this.color = color;
        this.amount = amount;
    }
}
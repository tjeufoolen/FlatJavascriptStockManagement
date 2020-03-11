import { Category } from './Category';

export class ClothingCategory extends Category {
    constructor(color, size) {
        super();

        // Set instance variables
        this.color = color;
        this.size = size;
    }
}
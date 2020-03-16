import { Category } from './Category';

export class ClothingCategory extends Category {
    constructor(type, color, size) {
        super(type);

        // Set instance variables
        this.color = color;
        this.size = size;
    }
}
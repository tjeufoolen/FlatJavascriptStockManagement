import { CreateProductPage } from '../../views/pages/CreateProductPage';

export class CreateProductController {
    constructor(app) {
        this.app = app;
    }


    draw(){
        this.view = new CreateProductPage(this);
    }

    validatePartOne(nameInput, descriptionInput){
        if(nameInput.length>2 && descriptionInput.length>2){
            this.name = nameInput;
            this.description = descriptionInput;

            this.view.createPartTwo();
        }
    }
    
    validatePartTwo(costPrice, sellPrice){
        
        if(costPrice<sellPrice){
            this.costPrice = costPrice;
            this.sellPrice = sellPrice;

            this.view.createPartThree();
        }
    }


}
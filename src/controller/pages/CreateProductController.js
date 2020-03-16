import { CreateProductPage } from '../../views/pages/CreateProductPage';
import { Product } from '../../models/Product';
import { ClothingCategory } from '../../models/ClothingCategory';
import { DecorationCategory } from '../../models/DecorationCategory';
import { FrillCategory } from '../../models/FrillCategory';

export class CreateProductController {
    constructor(app) {
        this.app = app;
        this.categoryTypes = this.app.enums.categoryTypes;
        this.storageController = this.app.storage;
    }

    draw(){
        this.view = new CreateProductPage(this);
    }

    validatePartOne(nameInput, descriptionInput){
        if(nameInput.length>=1 && descriptionInput.length>=1){
            this.name = nameInput;
            this.description = descriptionInput;

            this.view.createPartTwo();
        }
    }
    
    validatePartTwo(costPrice, sellPrice){
        if(costPrice.length>0 && sellPrice.length>0){
            if(parseFloat(costPrice)<parseFloat(sellPrice)){
                this.costPrice = parseFloat(costPrice);
                this.sellPrice = parseFloat(sellPrice);
    
                this.view.createPartThree();
            }
            else {
                this.view.createPartTwo();
            }
        }
    }

    validatePartThree(minimalStock, currentStock){
        if(minimalStock.length>0 && currentStock.length>0){          
            this.minimalStock = parseFloat(minimalStock);
            this.currentStock = parseFloat(currentStock);
    
            this.view.createPartFour();
        }
    }

    validatePartFour(category, data){
        switch(category){
            case this.categoryTypes.FRILLS:
                if(data.weight.length>0){
                    this.category = new FrillCategory(this.categoryTypes.FRILLS, data.weight);
                    this.createProduct();
                }
            break;
            
            case this.categoryTypes.DECORATION:
                if(data.size.length>0 && data.color.length>0 && data.amount.length>0){
                    this.category = new DecorationCategory(this.categoryTypes.DECORATION, data.size, data.color, parseFloat(data.amount));
                    this.createProduct();
                }
            break;

            case this.categoryTypes.CLOTHING:
                if(data.color.length>0 && data.size.length>0){
                    this.category = new ClothingCategory(this.categoryTypes.CLOTHING, data.color, data.size);
                    this.createProduct();
                }
            break;
        }
    }

    createProduct(){
        let id = this.storageController.getNewProductId();
        let product = new Product(id,this.name,this.description,this.costPrice,this.sellPrice,this.minimalStock, this.currentStock, this.category);

        this.storageController.addProduct(product);

        this.app.content.switchContent(this.app.constants.pages.PRODUCTS);    
    }
}
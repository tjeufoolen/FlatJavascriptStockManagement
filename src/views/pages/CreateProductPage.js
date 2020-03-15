import { Form } from './form';

const { Page } = require('./Page');

export class CreateProductPage extends Form {
    constructor(createProductController) {
        super();
        
        this.createProductController = createProductController;
        this.categoryTypes = this.createProductController.app.enums.categoryTypes;

        // Create heading
       this.addHeading("Product aanmaken")    
        this.form = this.createElement("form", ["needs-validation","mt-4"]);
    
        // this.createPartOne();
        
        // this.createPartTwo();

        

        // this.createPartThree();

        this.addElementToRoot(this.form);

        this.createPartThree();

        // this.addElementToRoot(this.form);
    }

    createPartOne(){
        //prepare an empty content area
        let _self = this;
        this.form.innerHTML ="";
        this.form.appendChild(this.createProgressBar(25));

        //change the submit of the current form
        this.form.onsubmit = (event) => {
            event.preventDefault();
            this.name = _self.getElement("#name").value;
            this.description = _self.getElement("#description").value;
            _self.createProductController.validatePartOne(this.name, this.description);            
        }

        //add all the input fields to the form
        this.form.appendChild(this.createTextField("name", "Naam", "Oeteldonksjaal", "Vul een geldige artikel naam in.", true));
        this.form.appendChild(this.createTextArea("description", "Omschrijving", "Met deze sjaal blijft u heerlijk warm", "Vul een geldige beschrijving in", true));
        this.form.appendChild(this.createSubmitButton("Volgende"));
    }

    createPartTwo(){
        //prepare an empty content area
        let _self = this;
        this.form.innerHTML ="";
        this.form.appendChild(this.createProgressBar(50));

        //change the submit of the current form
        this.form.onsubmit = (event) => {
            event.preventDefault();
            this.costPrice = _self.getElement("#costPrice").value;
            this.sellPrice = _self.getElement("#sellPrice").value;
            _self.createProductController.validatePartTwo(this.costPrice, this.sellPrice);            
        }
        
        //add all the input fields to the form
        this.form.appendChild(this.createNumberField("costPrice", "Inkoop prijs", "99,99","Voer een geldige inkoop prijs in.", true, true));
        this.form.appendChild(this.createNumberField("sellPrice", "Verkoop prijs (excl. BTW)", "150,00","Voer een geldige verkoop prijs in.", true, true));
        this.form.appendChild(this.createSubmitButton("Volgende"));
    }

    createPartThree(){
        //prepare an empty content area
        let _self = this;
        this.form.innerHTML ="";
        this.form.appendChild(this.createProgressBar(75));

        //change the submit of the current form
        this.form.onsubmit = (event) => {
            // event.preventDefault();
            // this.costPrice = _self.getElement("#costPrice").value;
            // this.sellPrice = _self.getElement("#sellPrice").value;
            // _self.createProductController.validatePartTwo(this.costPrice, this.sellPrice);            
        }

        this.form.appendChild(this.createSelectBox("category", "Categorie", Object.values(this.categoryTypes), "Selecteer een categorie", true));
        let selectbox = this.getElement("#category");
        selectbox.addEventListener("change", ()=>{
            this.generateCategoryBasedForm(selectbox.options[selectbox.selectedIndex].text);   
        });

        let categoryContent = this.createElement("div",[]);
        categoryContent.id = "categoryContent";
        this.form.appendChild(categoryContent);


    }



    generateCategoryBasedForm(category){
        let contentArea = this.getElement("#categoryContent");
        contentArea.innerHTML = "";

        switch(category){
            case this.categoryTypes.FRILLS:
                contentArea.appendChild(this.createTextField("weight", "Gewicht", "100g", "Voer een products gewicht in.", true));
                break;
            case this.categoryTypes.DECORATION:
                contentArea.appendChild(this.createTextField("color", "Kleur", "Blauw, rood", "Voer een of meerdere kleuren in.", true));    
                contentArea.appendChild(this.createNumberField("size", "Maat", "0", "Voer een maat in.", true));
                contentArea.appendChild(this.createNumberField("amount", "Hoeveelheid in verpakking", "5", "Voer een verpakkingshoeveelheid in", true));       
                break;
            case this.categoryTypes.CLOTHING:
                contentArea.appendChild(this.createTextField("color", "Kleur", "Blauw, rood", "Voer een of meerdere kleuren in.", true));
                contentArea.appendChild(this.createNumberField("size", "Maat", "0", "Voer een maat in.", true));
                break;

        }
    }
}
        // switch();




        // console.log(this.name);
        // console.log(this.description);
        // console.log(this.costPrice);
        // console.log(this.sellPrice);
        
    






























        // this.formRowName = this.createElement("div", ["form-group", "row"]);
            
        //     this.nameCol = this.createElement("div", ["col-sm-10"]);
        //         this.nameFeedBack = this.createElement("div", ["invalid-feedback"]);
        //         this.nameFeedBack.innerText = "Vul een naam in!"

        //         this.nameInput = this.createElement("input", ["form-control"]);
        //         this.nameInput.id = "validationName";
        //         this.nameInput.placeholder = "Artikel naam";
        //         this.nameInput.type = "text";
        //         this.nameInput.required = true;
        //     this.nameCol.appendChild(this.nameFeedBack);
        //     this.nameCol.appendChild(this.nameInput);

        //     this.nameLabel = this.createElement("label",["col-sm-2","col-form-label"]);
        //     this.nameLabel.innerText = "Artikel naam:"
        //     this.nameLabel.htmlFor = "validationName";
        // this.formRowName.appendChild(this.nameLabel);
        // this.formRowName.appendChild(this.nameCol);
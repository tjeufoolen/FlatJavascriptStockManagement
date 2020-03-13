import { Form } from './form';

const { Page } = require('./Page');

export class CreateProductPage extends Form {
    constructor(createProductController) {
        super();
        
        this.createProductController = createProductController;

        // Create heading
       this.addHeading("Product aanmaken")
        
        this.form = this.createElement("form", ["needs-validation","mt-4"]);

        this.createPartOne();

        this.addElementToRoot(this.form);
    }

    createPartOne(){
        let _self = this;
        this.form.innerHTML ="";
        
        this.form.appendChild(this.createProgressBar(25));

        this.form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            this.validatename = _self.getElement("#name").value;
            this.validatedescription = _self.getElement("#description").value;
            
            console.log(this.validatename);
            console.log(this.validatedescription);
            
            _self.createProductController.validatePartOne(this.validatename, this.validatedescription);            
        }, false);


        this.form.appendChild(this.createTextField("name", "Naam", "Oeteldonksjaal", "Vul een geldige artikel naam in.", true));
        this.form.appendChild(this.createTextArea("description", "Omschrijving", "Met deze sjaal blijft u heerlijk warm", "Vul een geldige beschrijving in", true));
        this.form.appendChild(this.createSubmitButton("Volgende", ()=>{

        }))
    }

    createPartTwo(){
        this.form.innerHTML ="";
        this.addElementToRoot(this.createProgressBar(50));
        console.log("Second one!");
        
    }
}






























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
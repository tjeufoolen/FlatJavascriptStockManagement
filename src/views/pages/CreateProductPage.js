import { Form } from './form';

const { Page } = require('./Page');

export class CreateProductPage extends Form {
    constructor(createProductController) {
        super();
        
        this.createProductController = createProductController;
        this.categoryTypes = this.createProductController.categoryTypes;

        // Create heading
        this.addHeading("Product aanmaken");    
        this.form = this.createElement("form", ["needs-validation","mt-4"]);
        this.form.noValidate = true;
    
        //start the first part of the form
        this.createPartOne();

        this.addElementToRoot(this.form);

        this.loadValidation();
    }

    createPartOne(){
        //prepare an empty content area
        let _self = this;
        this.form.innerHTML ="";
        this.form.appendChild(this.createProgressBar(20));

        // change the submit of the current form
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

        this.loadValidation();
    }

    createPartTwo(){
        //prepare an empty content area
        let _self = this;
        this.form.innerHTML ="";
        this.form.appendChild(this.createProgressBar(40));
        
        //add all the input fields to the form
        this.form.appendChild(this.createNumberField("costPrice", "Inkoop prijs", "99,99","Voer een geldige inkoop prijs in. Deze moet lager zijn dan de verkoopprijs", true, true));
        this.form.appendChild(this.createNumberField("sellPrice", "Verkoop prijs (excl. BTW)", "150,00","Voer een geldige verkoop prijs in. Deze moet hoger zijn dan de inkoopprijs", true, true));
        this.form.appendChild(this.createSubmitButton("Volgende"));

        //change the submit of the current form
        this.form.onsubmit = (event) => {
            event.preventDefault();
            this.costPrice = _self.getElement("#costPrice").value;
            this.sellPrice = _self.getElement("#sellPrice").value;
            _self.createProductController.validatePartTwo(this.costPrice, this.sellPrice);            
        }

        this.loadValidation();
    }

    createPartThree(){
        //prepare an empty content area
        let _self = this;
        this.form.innerHTML ="";
        this.form.appendChild(this.createProgressBar(60));
        
        //add all the input fields to the form
        this.form.appendChild(this.createNumberField("minimalStock", "Minimum voorraad", "20","Voer de minimum voorraad hoeveelheid in", true, false));
        this.form.appendChild(this.createNumberField("currentStock", "Huidige voorraad", "100","Voer de huidige voorraad in", true, false));
        this.form.appendChild(this.createSubmitButton("Volgende"));

        //change the submit of the current form
        this.form.onsubmit = (event) => {
            event.preventDefault();
            this.minimalStock = _self.getElement("#minimalStock").value;
            this.currentStock = _self.getElement("#currentStock").value;
            _self.createProductController.validatePartThree(this.minimalStock, this.currentStock);            
        }

        this.loadValidation();
    }

    createPartFour(){
        //prepare an empty content area
        let _self = this;
        this.form.innerHTML ="";
        this.form.appendChild(this.createProgressBar(80));

        //create and add a category switcher to the view
        this.form.appendChild(this.createSelectBox("category", "Categorie", Object.values(this.categoryTypes), "Selecteer een categorie", false));
        this.selectbox = this.getElement("#category");
        this.selectbox.addEventListener("change", ()=>{
            this.generateCategoryBasedForm(this.selectbox.options[this.selectbox.selectedIndex].text);
            this.loadValidation();   
        });

        //create the content area for the category specific fields
        let categoryContent = this.createElement("div",[]);
        categoryContent.id = "categoryContent";
        this.form.appendChild(categoryContent);

        //generate the content area once, to ensure it is not empty
        this.generateCategoryBasedForm(this.selectbox.options[this.selectbox.selectedIndex].text); 

        //add a submit button to the form
        this.form.appendChild(this.createSubmitButton("Volgende"));

        //change the submit of the current form
        this.form.onsubmit = (event) => {
            event.preventDefault();
            
            let category = this.selectbox.options[this.selectbox.selectedIndex].text;
            let data = null;
            switch(category){
                case this.categoryTypes.FRILLS:
                    data = {
                        weight: this.getElement("#weight").value
                    }
                    break;
                case this.categoryTypes.DECORATION:
                    data = {
                        color: this.getElement("#color").value,
                        size: this.getElement("#size").value,
                        amount: this.getElement("#amount").value
                    }
                    break;
                case this.categoryTypes.CLOTHING:
                    data = {
                        color: this.getElement("#color").value,
                        size: this.getElement("#size").value
                    }
                    break;
            }

            _self.createProductController.validatePartFour(category, data);         
        }

        this.loadValidation();
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

    loadValidation(){
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
        });
    }
}
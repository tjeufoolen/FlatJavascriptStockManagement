import { Form } from "../pages/Form";

export class EditProductPage extends Form {
    constructor(controller) {
        super();

        // Set instance variables
        this.controller = controller;

        // Container
        this.container = this.createElement("div", ["row", "justify-content-center"]);
        this.column = this.createElement("div", ["col-lg-8"]);
        this.container.appendChild(this.column);
        this.addElementToRoot(this.container);
        this.root = this.column;

        // Heading
        this.addHeading("Product aanpassen");

        // Form
        this.form = this.createForm();
        this.addElementToRoot(this.form);
        this.loadValidation();

        // Set initial data
        this.setProductData();
    }

    setProductData() {
        const product = this.controller.product;

        this.getElement("input[name='name']").value = product.name;
        this.getElement("textarea[name='description']").value = product.description;
        this.getElement("input[name='costprice']").value = product.costPrice;
        this.getElement("input[name='sellprice']").value = product.sellPrice;
        this.getElement("input[name='minimalstock']").value = product.minimalStock;
        this.getElement("input[name='currentstock']").value = product.currentStock;
    }

    createForm() {
        let form = this.createElement("form", ["needs-validation"]);
        form.noValidate = true;
        form.onsubmit = (e) => {
            e.preventDefault();
            this.controller.updateProduct(
                this.getElement("input[name='name']").value,
                this.getElement("textarea[name='description']").value,
                this.getElement("input[name='costprice']").value,
                this.getElement("input[name='sellprice']").value,
                this.getElement("input[name='minimalstock']").value,
                this.getElement("input[name='currentstock']").value
            );
        };
        
        // Fields
        form.appendChild(this.createTextField("name","Naam", "Oeteldonk sjaal", "Een product naam is verplicht."));
        form.appendChild(this.createTextArea("description","Omschrijving", "Lekker warm voor in de winter!", "Een product omschrijving is verplicht."));
        form.appendChild(this.createNumberField("costprice", "Inkoopprijs (Excl. btw)", "10", "Een product inkoopprijs is verplicht.", true, true));
        form.appendChild(this.createNumberField("sellprice", "Verkooppijs", "50", "Een product verkoopprijs (die hoger is dan de inkoopprijs) is verplicht.", true, true));
        form.appendChild(this.createNumberField("minimalstock", "Minimale voorraad", "100", "De minimale product voorraad is verplicht."));
        form.appendChild(this.createNumberField("currentstock", "Huidige voorraad", "200", "De product voorraad is verplicht."));
        form.appendChild(this.createSubmitButton("Opslaan", ["mr-1"]));

        return form;
    }

    loadValidation() {
        // Validate cost and sell price
        let _self = this;
        this.getElement("#sellprice").addEventListener("input", () => {
            this.costPrice = parseFloat(_self.getElement("#costprice").value);
            this.sellPrice = parseFloat(_self.getElement("#sellprice").value);

            if(this.costPrice<this.sellPrice){
                this.getElement("#sellprice").classList.remove('is-invalid'); 
                this.getElement("#sellprice").classList.add('is-valid');
                this.form.classList.add("was-validated");
            } 
            else{
                this.getElement("#sellprice").classList.remove('is-valid'); 
                this.getElement("#sellprice").classList.add('is-invalid');
                this.form.classList.remove("was-validated");
            } 
        });

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        Array.prototype.filter.call(forms, function(form) {
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
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

        const properties = Object.entries(product.customProperties);
        for (const [key, value] of properties) {
            let elem = this.createCustomField();
            let label = elem.querySelector("label");
            label.innerText = key.replace("-", " ");
            label.innerText = label.innerText.charAt(0).toUpperCase() + label.innerText.substring(1);

            let field = elem.querySelector("input");
            field.value = value;
            field.id = key;

            this.form.querySelector(".form-fields").appendChild(elem);
        }
        
    }
    
    createForm() {
        let form = this.createElement("form", ["needs-validation"]);
        let formFields = this.createElement("div", ["form-fields"]);
        form.noValidate = true;
        form.onsubmit = (e) => {
            e.preventDefault();
            
            let customFields = document.querySelectorAll("input[name='custom-field']");
            let customProperties = {};
            customFields.forEach(field => {
                customProperties[field.id] = field.value;
            });
            
            this.controller.updateProduct(
                this.getElement("input[name='name']").value,
                this.getElement("textarea[name='description']").value,
                this.getElement("input[name='costprice']").value,
                this.getElement("input[name='sellprice']").value,
                this.getElement("input[name='minimalstock']").value,
                this.getElement("input[name='currentstock']").value,
                customProperties
                );
            };
            
            // Fields
            formFields.appendChild(this.createTextField("name","Naam", "Oeteldonk sjaal", "Een product naam is verplicht."));
            formFields.appendChild(this.createTextArea("description","Omschrijving", "Lekker warm voor in de winter!", "Een product omschrijving is verplicht."));
            formFields.appendChild(this.createNumberField("costprice", "Inkoopprijs (Excl. btw)", "10", "Een product inkoopprijs is verplicht.", true, true));
            formFields.appendChild(this.createNumberField("sellprice", "Verkooppijs", "50", "Een product verkoopprijs (die hoger is dan de inkoopprijs) is verplicht.", true, true));
            formFields.appendChild(this.createNumberField("minimalstock", "Minimale voorraad", "100", "De minimale product voorraad is verplicht."));
            formFields.appendChild(this.createNumberField("currentstock", "Huidige voorraad", "200", "De product voorraad is verplicht."));
            form.appendChild(formFields);

            // Button
            let formButtons = this.createElement("div", ["justify-content-end", "d-flex"]);
            
            // Custom fields button
            let createCustomFieldButton = this.createElement("button", ["btn", "btn-secondary"]);
            createCustomFieldButton.innerText = "Extra eigenschap toevoegen";
            createCustomFieldButton.type = "button";
            createCustomFieldButton.onclick = () => this.addCustomField();
            formButtons.appendChild(createCustomFieldButton);
            
            // Submit button
            let submitButton = this.createElement("button", ["btn", "btn-primary", "ml-1"]);
            submitButton.innerText = "opslaan";
            submitButton.type = "submit";
            formButtons.appendChild(submitButton);

            form.appendChild(formButtons);

            return form;
        }
        
        addCustomField() {
            this.form.querySelector(".form-fields").appendChild(this.createCustomField());
        }

        createCustomField() {
            let field = this.createTextField("custom-field","Extra eigenschap", "", "Dit veld moet wel over een waarde beschikken.");
            let label = field.querySelector("label");
            label.contentEditable = true;
            label.htmlFor = "";
            label.onkeypress = (e) => {
                let regex = new RegExp("^[a-zA-Z ]+$");
                let str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
                if (regex.test(str)) {
                    return true;
                }
                
                e.preventDefault();
                return false;
            };
            label.addEventListener("input", (e) =>{
                const name = label.innerText.replace(" ", "-").toLowerCase();
                field.querySelector("input").id = name;

                label.style.border = (label.innerText == 0) ? "1px solid red" : "";
            });
            
            return field;
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
                    
                    // Validate custom fields
                    form.querySelectorAll("input[name='custom-field']").forEach(field => {
                        let label = field.parentElement.parentElement.querySelector("label");
                        if (label.innerText.length == 0) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                    });
                    
                    // Validate
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    
                    form.classList.add('was-validated');
                }, false);
            });
        }
    }
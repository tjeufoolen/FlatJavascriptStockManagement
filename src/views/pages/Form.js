const { Page } = require('./Page');

export class Form extends Page {
    constructor() {
        super();
        
    }

    createTextField(inputId,labelName, placeholderText, invalidFeedback, isRequired){
        let formRowName = this.createElement("div", ["form-group", "row", "mt-4"]);
            
            let nameCol = this.createElement("div", ["col-sm-10"]);
                let feedBack = this.createElement("div", ["invalid-feedback"]);
                feedBack.innerText = invalidFeedback;

                let input = this.createElement("input", ["form-control"]);
                input.id = inputId;
                input.name = inputId;
                input.placeholder = placeholderText;
                input.type = "text";
                if(isRequired) input.required = true;
                
            nameCol.appendChild(feedBack);
            nameCol.appendChild(input);

            let nameLabel = this.createElement("label",["col-sm-2","col-form-label"]);
            nameLabel.innerText = labelName;
            nameLabel.htmlFor = "validationName";
        formRowName.appendChild(nameLabel);
        formRowName.appendChild(nameCol);

        return formRowName;
    }

    
    createTextArea(inputId,labelName, placeholderText, invalidFeedback, isRequired){
        let formRowName = this.createElement("div", ["form-group", "row", "mt-4"]);
            
            let nameCol = this.createElement("div", ["col-sm-10"]);
                let feedBack = this.createElement("div", ["invalid-feedback"]);
                feedBack.innerText = invalidFeedback;

                let input = this.createElement("textarea", ["form-control"]);
                input.id = inputId;
                input.name = inputId;
                input.placeholder = placeholderText;
                if(isRequired) input.required = true;
                
            nameCol.appendChild(feedBack);
            nameCol.appendChild(input);

            let nameLabel = this.createElement("label",["col-sm-2","col-form-label"]);
            nameLabel.innerText = labelName;
            nameLabel.htmlFor = "validationName";
        formRowName.appendChild(nameLabel);
        formRowName.appendChild(nameCol);

        return formRowName;
    }

    createNumberField(inputId,labelName, placeholderText, invalidFeedback, isRequired, isDecimal=false){
        let formRowName = this.createElement("div", ["form-group", "row", "mt-4"]);
            
            let nameCol = this.createElement("div", ["col-sm-10"]);
                let feedBack = this.createElement("div", ["invalid-feedback"]);
                feedBack.innerText = invalidFeedback;

                let input = this.createElement("input", ["form-control"]);
                input.id = inputId;
                input.name = inputId;
                input.placeholder = placeholderText;
                input.type = "Number";
                input.min = 0;
                if(isRequired) input.required = true;
                if(isDecimal) input.step = "0.01";
                
            nameCol.appendChild(feedBack);
            nameCol.appendChild(input);

            let nameLabel = this.createElement("label",["col-sm-2","col-form-label"]);
            nameLabel.innerText = labelName;
            nameLabel.htmlFor = "validationName";
        formRowName.appendChild(nameLabel);
        formRowName.appendChild(nameCol);

        return formRowName;
    }

    createSelectBox(inputId,labelName, itemlist, invalidFeedback, isRequired){
        let formRowName = this.createElement("div", ["form-group", "row", "mt-4"]);
            
            let nameCol = this.createElement("div", ["col-sm-10"]);
                let feedBack = this.createElement("div", ["invalid-feedback"]);
                feedBack.innerText = invalidFeedback;

                let input = this.createElement("select", ["form-control"]);
                input.id = inputId;
                input.name = inputId;

                for(let item in itemlist){
                    let option = this.createElement("option",[]);
                    option.innerText = item; 
                    option.innerText = itemlist[item];
                    input.appendChild(option);
                }
                
                if(isRequired) input.required = true;
                
            nameCol.appendChild(feedBack);
            nameCol.appendChild(input);

            let nameLabel = this.createElement("label",["col-sm-2","col-form-label"]);
            nameLabel.innerText = labelName;
            nameLabel.htmlFor = "validationName";
        formRowName.appendChild(nameLabel);
        formRowName.appendChild(nameCol);

        return formRowName;
    }


    createSubmitButton(buttonText){
         let formRowButton = this.createElement("div", ["form-group", "row", "justify-content-end"]);
             let button = this.createElement("button",["btn", "btn-primary"]);
             button.type="submit";
             button.innerText=buttonText;
        formRowButton.appendChild(button);
        return formRowButton;
    }

    createProgressBar(currentpercentage){
        let progress = this.createElement("div", ["progress", "mb-4"]);
            let progressbar = this.createElement("div", ["progress-bar"]);
            progressbar.role = "progressbar";
            progressbar.setAttribute("aria-valuenow", currentpercentage);
            progressbar.setAttribute('style','width:'+Number(currentpercentage)+'%');
            progressbar.setAttribute("aria-valuemin", 0);
            progressbar.setAttribute("aria-valuemax", 100);
        progress.appendChild(progressbar);
        return progress;
    }

    



    // validateForm(){
    //     'use strict';
    //     window.addEventListener('load', function() {
    //         // Fetch all the forms we want to apply custom Bootstrap validation styles to
    //         var forms = document.getElementsByClassName('needs-validation');
    //         // Loop over them and prevent submission
    //         var validation = Array.prototype.filter.call(forms, function(form) {
    //         form.addEventListener('submit', function(event) {
    //             if (form.checkValidity() === false) {
    //             event.preventDefault();
    //             event.stopPropagation();
    //             }
    //             form.classList.add('was-validated');
    //         }, false);
    //         });
    //     }, false);
    // }
}
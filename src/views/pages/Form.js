const { Page } = require('./Page');

export class Form extends Page {
    constructor() {
        super();
        
    }

    createTextField(inputId,labelName, placeholderText, invalidFeedback, isRequired=true){
        let formRowName = this.createElement("div", ["form-group", "row", "mt-4", "needs-validation"]);
            
            let nameCol = this.createElement("div", ["col-sm-10"]);
                let feedBack = this.createElement("div", ["invalid-feedback"]);
                feedBack.innerText = invalidFeedback;

                let input = this.createElement("input", ["form-control"]);
                input.id = inputId;
                input.name = inputId;
                input.placeholder = placeholderText;
                input.type = "text";
                if(isRequired) input.required = true;
                
            nameCol.appendChild(input);
            nameCol.appendChild(feedBack);
            

            let nameLabel = this.createElement("label",["col-sm-2","col-form-label"]);
            nameLabel.innerText = labelName;
            nameLabel.htmlFor = inputId;
        formRowName.appendChild(nameLabel);
        formRowName.appendChild(nameCol);

        return formRowName;
    }

    
    createTextArea(inputId,labelName, placeholderText, invalidFeedback, isRequired=true){
        let formRowName = this.createElement("div", ["form-group", "row", "mt-4", "needs-validation"]);
            
            let nameCol = this.createElement("div", ["col-sm-10"]);
                let feedBack = this.createElement("div", ["invalid-feedback"]);
                feedBack.innerText = invalidFeedback;

                let input = this.createElement("textarea", ["form-control"]);
                input.id = inputId;
                input.name = inputId;
                input.placeholder = placeholderText;
                if(isRequired) input.required = true;
                
            nameCol.appendChild(input);
            nameCol.appendChild(feedBack);
            

            let nameLabel = this.createElement("label",["col-sm-2","col-form-label"]);
            nameLabel.innerText = labelName;
            nameLabel.htmlFor = inputId;
        formRowName.appendChild(nameLabel);
        formRowName.appendChild(nameCol);

        return formRowName;
    }

    createNumberField(inputId,labelName, placeholderText, invalidFeedback, isRequired=true, isDecimal=false){
        let formRowName = this.createElement("div", ["form-group", "row", "mt-4", "needs-validation"]);
            
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
              
            nameCol.appendChild(input);
            nameCol.appendChild(feedBack);
            

            let nameLabel = this.createElement("label",["col-sm-2","col-form-label"]);
            nameLabel.innerText = labelName;
            nameLabel.htmlFor = inputId;
        formRowName.appendChild(nameLabel);
        formRowName.appendChild(nameCol);

        return formRowName;
    }

    createSelectBox(inputId,labelName, itemlist, invalidFeedback, isRequired=true){
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
              
            nameCol.appendChild(input);
            nameCol.appendChild(feedBack);
            

            let nameLabel = this.createElement("label",["col-sm-2","col-form-label"]);
            nameLabel.innerText = labelName;
            nameLabel.htmlFor = inputId;
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
}
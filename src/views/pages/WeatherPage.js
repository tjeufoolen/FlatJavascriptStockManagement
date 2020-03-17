import { Form } from './Form';

export class WeatherPage extends Form {
    constructor(controller) {
        super();

        // Initialize instance variables
        this.controller = controller;

        // Heading
        this.addHeading("Weer");

        // rootContainer
        this.container = this.createElement("div", ["weather", "row"]);

        // Form
        this.formColumn = this.createElement("div", ["col-md-6","text-left"]);
        this.usageText = this.createElement("small", ["form-text", "text-muted", "pb-2"]);
        this.usageText.innerText = "Selecteer in onderstaande dropdown een van de D'n Oetel locaties om de huidige weers informatie te bekijken.";
        this.formColumn.appendChild(this.usageText);
        this.form = this.createForm();
        this.formColumn.appendChild(this.form);
        this.container.appendChild(this.formColumn);

        // Weather information
        this.weatherColumn = this.createElement("div", ["col-md-6"]);
        this.weatherInfo = this.createWeatherInformation();
        this.weatherColumn.appendChild(this.weatherInfo);
        this.container.appendChild(this.weatherColumn);

        // Append columns to root
        this.addElementToRoot(this.container);
    }

    updateWeather(data) {
        if (data == null) {
            this.errorLabel.innerText = "De opgegeven stad kon niet gevonden worden.";
            this.form.appendChild(this.errorLabel);
        } else {
            this.errorLabel.innerText = "";
            if (this.form.querySelector(".weather-error") != null) this.form.removeChild(this.errorLabel);
        }

        this.getElement("#weather-city").innerText = (data != null) ? data.city : "";
        this.getElement("#weather-condition-description").innerText = (data != null) ? data.condition.description : "";
        this.getElement("#weather-condition-icon").src = (data != null) ? data.condition.icon : "";
        this.getElement("#weather-temperature").innerHTML = (data != null) ? `${data.temperatures.main} &#8451;` : "";
        this.getElement("#weather-temperature-min").innerHTML = (data != null) ? `${data.temperatures.min} &#8451;` : "";
        this.getElement("#weather-temperature-max").innerHTML = (data != null) ? `${data.temperatures.max} &#8451;` : "";
        this.getElement("#weather-temperature-feels-like").innerHTML = (data != null) ? `${data.temperatures.feels_like} &#8451;` : "";
        this.getElement("#weather-pressure").innerText = (data != null) ? `${data.temperatures.pressure} hPa` : "";
        this.getElement("#weather-humidity").innerText = (data != null) ? `${data.temperatures.humidity} %` : "";
        this.getElement("#weather-wind-speed").innerText = (data != null) ? `${data.wind.speed} m/s` : "";
        this.getElement("#weather-wind-degrees").innerText = (data != null) ? data.wind.deg : "";
        this.getElement("#weather-cloudiness").innerText = (data != null) ? `${data.cloudiness} %` : "";
    }

    createForm() {
        let form = this.createElement("form", ["needs-validation"]);
        form.onsubmit = (e) => e.preventDefault();
        
        this.citiesSelect = this.createSelectBox("city", "Stad", this.controller.cities, "Selecteer een stad");
        this.citiesSelect.addEventListener("change", (e) => {
            const city = event.target.value;
            this.controller.getFromCity(city);
        });
        this.errorLabel = this.createElement("div", ["weather-error", "alert", "alert-danger"]);
        
        form.appendChild(this.citiesSelect);

        return form;
    }

    createWeatherInformation() {
        // Container
        let weatherInfo = this.createElement("div", ["weather-info"]);
        
        // City
        let cityName = this.createElement("h3");
        cityName.id = "weather-city";
        weatherInfo.appendChild(cityName);
        
        // Condition
        let condition = this.createElement("div", ["weather-condition"]);
        let conditionDescription = this.createElement("span");
        conditionDescription.id = "weather-condition-description";
        let conditionIcon = this.createElement("img");
        conditionIcon.id = "weather-condition-icon";
        condition.appendChild(conditionDescription);
        condition.appendChild(conditionIcon);
        weatherInfo.appendChild(condition);
        
        // Attributes
        let attributes = this.createElement("table", ["weather-attributes"]);
        weatherInfo.appendChild(attributes);
        attributes.appendChild(this.createTableRow("Gemiddelde temperatuur", "weather-temperature"));
        attributes.appendChild(this.createTableRow("Minimale temperatuur", "weather-temperature-min"));
        attributes.appendChild(this.createTableRow("Maximale temperatuur", "weather-temperature-max"));
        attributes.appendChild(this.createTableRow("Gevoelstemperatuur", "weather-temperature-feels-like"));
        attributes.appendChild(this.createTableRow("Luchtdruk", "weather-pressure"));
        attributes.appendChild(this.createTableRow("Luchtvochtigheid", "weather-humidity"));
        attributes.appendChild(this.createTableRow("Wind snelheid", "weather-wind-speed"));
        attributes.appendChild(this.createTableRow("Wind richting", "weather-wind-degrees"));
        attributes.appendChild(this.createTableRow("Bewolktheid", "weather-cloudiness"));
        
        return weatherInfo;
    }
}
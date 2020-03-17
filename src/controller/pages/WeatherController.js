import { WeatherPage } from "../../views/pages/WeatherPage";

export class WeatherController {
    constructor(app) {
        this.service = app.services.weather; 
        this.cities = app.storage.getData("cities");
    }

    draw() {
        this.view = new WeatherPage(this);

        // Set default selected city
        if (this.cities.length > 0) this.getFromCity(this.cities[0]);
    }

    async getFromCity(city) {
        let data = null;

        if (this.cities.includes(city)) {
            data = await this.service.getLocationDataAsync(city).then(data => data);
        }
        
        this.updateWeatherInformation(data);
    }

    updateWeatherInformation(data) {
        this.view.updateWeather(data);
    }
}
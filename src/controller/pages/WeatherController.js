import { WeatherPage } from "../../views/pages/WeatherPage";

export class WeatherController {
    constructor(app) {
        this.service = app.services.weather; 
    }

    draw() {
        this.view = new WeatherPage(this);
    }

    async getFromZip(zip) {
        const data = await this.service.getLocationDataAsync(zip).then(data => data);
        this.updateWeatherInformation(data);
    }

    updateWeatherInformation(data) {
        this.view.updateWeather(data);
    }
}
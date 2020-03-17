/** @class WeatherService representing a service for weather data. */
export class WeatherService {
    /**
     * Creates an instance of WeatherService.
     *
     * @constructor
     * @author: Tjeu Foolen
     */
    constructor() {
        this.endpoint = "https://api.openweathermap.org/data/2.5/weather";
    }

    /**
     * Fetches current weather data for a given zip from the Netherlands.
     *
     * @param {string} zip The zip code of a city (4 digits WITHOUT the 2 letters).
     * @return {promise} The result promise containing json.
     */
    async getLocationDataAsync(zip) {
        const key = process.env.WEATHERMAP_API_KEY;
        const url = `${this.endpoint}?zip=${zip},nl&lang=nl&units=metric&appid=${key}`;

        let response = await fetch(url);
        if (response.status == 200) {
            let data = await response.json();

            return this.parseData(data);
        } else {
            return null;
        }
    }

    /**
     * Parses api data to useable data.
     * 
     * @param {object} data The unparsed data
     * @return {obect} The parsed data
     */
    parseData(data) {
        let parsed = {
            city: data.name,
            condition: {
                description: data.weather[0].description,
                icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            },
            temperatures: {
                main: data.main.temp,
                min: data.main.temp_min,
                max: data.main.temp_max,
                feels_like: data.main.feels_like,
                pressure: data.main.pressure,
                humidity: data.main.humidity,
            },
            wind: data.wind,
            cloudiness: data.clouds.all,
        };

        return parsed;
    }
}
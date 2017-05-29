import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class Fetchdata {
    public forecasts: WeatherForecast[];

    constructor(http: HttpClient) {
        http.fetch('/api/SampleData/WeatherForecasts')
            .then(result => result.json() as Promise<WeatherForecast[]>)
            .then(data => {
                this.forecasts = data;
            });

        http.fetch('/api/SampleData/Test')
            .then(response => response.text())
            .then(data => {
                document.getElementById("test").innerHTML = data;
            });
    }
}

interface WeatherForecast {
    dateFormatted: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

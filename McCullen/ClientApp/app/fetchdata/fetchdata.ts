import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class Fetchdata {
    public forecasts: WeatherForecast[];

    constructor(public http: HttpClient) {
        this.http = http;
        http.fetch('/api/SampleData/WeatherForecasts')
            .then(result => result.json() as Promise<WeatherForecast[]>)
            .then(data => {
                this.forecasts = data;
            });

    }
    onTest1Click() {
        this.http.fetch('/api/SampleData/Test')
            .then(response => response.text())
            .then(data => {
                document.getElementById("test").innerHTML = data;
            });
    }
    onTest2Click() {
        this.http.fetch('/api/SampleData/Test2')
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

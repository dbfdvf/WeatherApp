import { Component, OnInit } from '@angular/core';
import { WetherServiceService } from '../wether-service.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  myWeather:any;
  temperature: number = 0;
  pressure: number = 0;
  humidity: number = 0;
  weather:string = ''
  city:string='';
  cityError:string='';
  constructor(private weatherService:WetherServiceService){}

  searchCity(): void{
    this.weatherService.getWeather(this.city).subscribe({
      next:(res)=>{
        this.myWeather = res;
        this.temperature = this.myWeather.main.temp -273,15;
        this.temperature = parseFloat(this.temperature.toFixed(2));
        this.pressure = this.myWeather.main.pressure;
        this.humidity = this.myWeather.main.humidity;
        this.weather = this.myWeather.weather[0].main;
        this.cityError='';
      },
    
      error:(error)=>this.cityError = "The city does not exist",
      complete:()=>console.info('Complete')
    })
  }

  ngOnInit(): void {
      
  }
}

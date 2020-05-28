import axios from 'axios';
import cheerio from 'cheerio';
import {Emitter} from "../util/Emitter";
import {Weather} from "../interface/Weather";
import config from '../config.json';
export class Naver {
    public isLoad:Boolean = false;
    constructor(){
        this.init()
    }

    private init(){
        this.getWeather()
    }

    private getWeather(){
        const url = config.naver_url;

        axios.get(url).then(response =>{
            const $ = cheerio.load(response.data);
            const currentTemperature = $(".today_area > .main_info > div > p").text().replace("도씨", "");
            const weather = $(".today_area .cast_txt").text();
            const bodilyTemperature = $(".today_area > .main_info .info_list li:nth-child(2)").text().replace("/ /g", "");
            this.isLoad = true;
            const weatherData:Weather = {
                currentTemperature:currentTemperature,
                weather:weather,
                bodilyTemperature:bodilyTemperature
            };
            Emitter.EVENT_EMITTER.emit("setWeatherData", weatherData);
        })
    }
}
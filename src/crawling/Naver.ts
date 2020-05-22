import axios from 'axios';
import cheerio from 'cheerio';
import {Emitter} from "../util/Emitter";
import {Weather} from "../interface/Weather";
export class Naver {
    public isLoad:Boolean = false;
    constructor(){
        this.init()
    }

    private init(){
        this.getWeather()
    }

    private getWeather(){
        const url = "https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%EB%B6%80%EC%82%B0+%ED%95%B4%EC%9A%B4%EB%8C%80%EA%B5%AC+%EB%82%A0%EC%94%A8&oquery=%EB%B6%80%EC%82%B0%EB%82%A0%EC%94%A8&tqi=UViL5sprvTVssPw9phGssssssNo-279479";

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
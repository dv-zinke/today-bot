"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Naver = void 0;
var axios_1 = __importDefault(require("axios"));
var cheerio_1 = __importDefault(require("cheerio"));
var Emitter_1 = require("../util/Emitter");
var Naver = /** @class */ (function () {
    function Naver() {
        this.isLoad = false;
        this.init();
    }
    Naver.prototype.init = function () {
        this.getWeather();
    };
    Naver.prototype.getWeather = function () {
        var _this = this;
        var url = "https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%EB%B6%80%EC%82%B0+%ED%95%B4%EC%9A%B4%EB%8C%80%EA%B5%AC+%EB%82%A0%EC%94%A8&oquery=%EB%B6%80%EC%82%B0%EB%82%A0%EC%94%A8&tqi=UViL5sprvTVssPw9phGssssssNo-279479";
        axios_1.default.get(url).then(function (response) {
            var $ = cheerio_1.default.load(response.data);
            var currentTemperature = $(".today_area > .main_info > div > p").text().replace("도씨", "");
            var weather = $(".today_area .cast_txt").text();
            var bodilyTemperature = $(".today_area > .main_info .info_list li:nth-child(2)").text().replace("/ /g", "");
            _this.isLoad = true;
            var weatherData = {
                currentTemperature: currentTemperature,
                weather: weather,
                bodilyTemperature: bodilyTemperature
            };
            Emitter_1.Emitter.EVENT_EMITTER.emit("setWeatherData", weatherData);
        });
    };
    return Naver;
}());
exports.Naver = Naver;

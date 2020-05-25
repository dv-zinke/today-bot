"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slack = void 0;
var Slack = /** @class */ (function () {
    function Slack() {
        this.init();
    }
    Slack.prototype.init = function () {
    };
    Slack.prototype.getMessageData = function (data) {
        var today = new Date().toLocaleDateString().replace(/\. /g, '-').replace('.', '');
        this.message = {
            attachments: []
        };
        if (!data.Blog || !data.Weather || !data.News)
            return this.message;
        var markdown = "";
        data.Blog.forEach(function (item) {
            markdown += item.markdown + "\n";
        });
        this.message.attachments.push({
            pretext: "\uD83D\uDCE8 " + today + " \uD3B8\uC9C0\uAC00 \uC654\uC5B4\uC694!",
            color: '#928BFF',
            fields: [
                this.getCurrentTemperature(data.Weather),
                this.getWeather(data.Weather.weather),
            ],
            footer: "",
        });
        this.message.attachments.push({
            color: '#FFFFFF',
            fields: [this.getNews(data.News)],
            footer: "",
            pretext: ""
        });
        this.message.attachments.push({
            fields: [{
                    type: 'mrkdwn',
                    title: '',
                    value: markdown,
                },],
            footer: "",
            pretext: ""
        });
        return this.message;
    };
    Slack.prototype.getNews = function (news) {
        var newsSlackField = {
            type: 'mrkdwn',
            title: '📰 뉴스 / 구글',
            value: news,
        };
        return newsSlackField;
    };
    Slack.prototype.getCurrentTemperature = function (data) {
        var weatherSlackField = {
            title: '🌡 현재 온도',
            value: data.currentTemperature + "\n \uCD5C\uC800 / \uCD5C\uACE0\n" + data.bodilyTemperature + " ",
            short: true,
        };
        return weatherSlackField;
    };
    Slack.prototype.getWeather = function (data) {
        var weatherSlackField = {
            title: '🏞️ 현재 날씨',
            value: data,
            short: true,
        };
        return weatherSlackField;
    };
    return Slack;
}());
exports.Slack = Slack;

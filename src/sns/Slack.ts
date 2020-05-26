import {Message} from "../interface/Message";
import {Content} from "../interface/Content";
import {Field} from "../interface/Attachments";
import {PostData} from "../interface/PostData";
import {Weather} from "../interface/Weather";

export class Slack {

    private message: Message | undefined;

    constructor() {
        this.init();
    }

    private init() {

    }

    public getMessageData(data: PostData):Message {
        const today = new Date().toLocaleDateString().replace(/\. /g, '-').replace('.', '');
        this.message = {
            attachments: []
        };
        if(!data.Blog || !data.Weather || !data.News) return this.message;

        let markdown: string = "";

        data.Blog.forEach(function (item) {
            markdown += item.markdown + "\n"
        });
        this.message.attachments.push({
            pretext: `📨 ${today} 편지가 왔어요!`,
            color:'#928BFF',
            fields: [
                this.getCurrentTemperature(data.Weather),
                this.getWeather(data.Weather.weather),
            ],
            footer: "",
        });

        this.message.attachments.push({
            color:'#FFFFFF',
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
    }

    private getNews(news:String):Field{
        const newsSlackField:Field = {
                type: 'mrkdwn',
                title: '📰 뉴스 / 구글',
                value: news,
            };
        return newsSlackField
    }

    private getCurrentTemperature(data:Weather):Field {
        const weatherSlackField:Field = {
            title: '🌡 현재 온도',
            value: `${data.currentTemperature}\n 최저 / 최고\n${data.bodilyTemperature} `,
            short: true,
        };
        return weatherSlackField
    }

    private getWeather(data:String):Field {
        const weatherSlackField:Field = {
            title: '🏞️ 현재 날씨',
            value: data,
            short: true,
        };
        return weatherSlackField
    }
}
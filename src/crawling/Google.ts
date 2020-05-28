import axios from 'axios';
import cheerio from 'cheerio';
import {Emitter} from "../util/Emitter";
import config from '../config.json';
export class Google {
    public isLoad:Boolean = false;

    constructor(){
        this.init();
    }

    private init(){
        this.getNews();
    }

    private getNews(){
        const url = config.google_url;

        axios.get(url).then(response =>{
            const $ = cheerio.load(response.data, { xmlMode: true });
            const titles: string[] = $('item > title').map((i, element) => $(element).text()).get();
            const links: string[] = $('item > link').map((i, element) => $(element).text()).get();
            let slackContent = '';

            for (let i = 0; i < 5; i++){

                slackContent += `<${links[i]}|${titles[i]}>\n`;

            }
            this.isLoad = true;
            Emitter.EVENT_EMITTER.emit("setNewsData", slackContent);

        })
    }
}
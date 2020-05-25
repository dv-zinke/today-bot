import axios from 'axios';
import cheerio from 'cheerio';
import {Emitter} from "../util/Emitter";

export class Google {
    public isLoad:Boolean = false;

    constructor(){
        this.init();
    }

    private init(){
        this.getNews();
    }

    private getNews(){
        const url = "https://news.google.com/rss?hl=ko&gl=KR&ceid=KR:ko";

        axios.get(url).then(response =>{
            const $ = cheerio.load(response.data);
            const titles: string[] = $('item > title').map((i, element) => $(element).text()).get();
            const links: string[] = $('item > link').map((i, element) => $(element).text()).get();
            let slackContent = '';

            for (let i = 0; i < 3; i++){
                slackContent +=  "*" + " " + `<${links[i]}|${titles[i]}>`;
            }
            this.isLoad = true;
            Emitter.EVENT_EMITTER.emit("setNewsData", slackContent);

        })
    }
}
import config from '../config.json';
import axios from 'axios';
import {Content} from "../interface/Content";
import moment from "moment";
import {Emitter} from "../util/Emitter";
export class Blog {
    private blogContents: Array<Object> = [];
    constructor() {
        this.init()
    }

    private init(): void {
        this.setBlogData();
    }

    private setBlogData() {
        const baseURL = `${config.base_url}?sort=${config.sort}&page=${config.page}&size=${config.size}&tags=${encodeURI(config.tags.join(","))}`;
        const yesterday = moment().subtract(1, 'day');
        axios.get(baseURL)
            .then(response => {
                return response.data.data
            })
            .then(dataArray=>{
                dataArray.forEach((item: Content)=>{
                    const item_date = moment(item.date);
                    if (yesterday.isSame(item_date, 'day')) {
                        item.markdown = "*" + " " + `<${item.link}|${item.title}>` + " by " + item.author;
                        this.blogContents.push(item)
                    }
                });
                Emitter.EVENT_EMITTER.emit("setBlogData", this.blogContents);
            })
            .catch(error=>{
                console.log(error);
            })
    }
}
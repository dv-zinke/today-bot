import {Blog} from "./crawling/Blog";
import {Emitter} from "./util/Emitter";
import {Content} from "./interface/Content";
import {Slack} from "./sns/Slack";
import axios from 'axios';
import {Naver} from "./crawling/Naver";
import {Google} from "./crawling/Google";
import {PostData} from "./interface/PostData";
import {Weather} from "./interface/Weather";
import {Env} from "./util/Env";

class Main {
    private blog: Blog | undefined;
    private slack:Slack | undefined;
    private naver:Naver | undefined;
    private google:Google | undefined;
    private slackPostData: PostData = {};

    constructor(){
        this.init();
    }

    private init(){
        this.blogInit();
        this.naverInit();
        this.slackInit();
        this.googleInit();
        this.loadedData();
    }
    private slackInit(){
        this.slack = new Slack();
    }
    private naverInit(){
        this.naver = new Naver();
        Emitter.EVENT_EMITTER.on("setWeatherData", (data:Weather)=>{
            this.slackPostData.Weather = data;
            this.loadedData();
        })
    }
    private googleInit(){
        this.google = new Google();
        Emitter.EVENT_EMITTER.on("setNewsData", (data:String)=>{
            this.slackPostData.News = data;
            this.loadedData();
        })
    }

    private blogInit(){
        this.blog = new Blog();
        Emitter.EVENT_EMITTER.on("setBlogData", (data:[Content])=>{
            this.slackPostData.Blog = data;
            this.loadedData();
        })
    }
    private loadedData(){
        if(!this.google || !this.naver || !this.blog) return;
        if(this.google.isLoad && this.naver.isLoad && this.blog.isLoad) this.slackPost(this.slackPostData);
        else return;
    }

    private slackPost(postData:PostData){

        if(!Env.WEBHOOKS) throw new Error("웹훅 리스트가 없습니다.");
        else {
            if(!this.slack) return;
            const messageData = this.slack.getMessageData(postData);
            const webHookList = Env.WEBHOOKS.split(',');

            webHookList.map(url=>{
                axios.post(url, messageData)
            })

        }


    }
}



const main = new Main();
import {Blog} from "./blog/Blog";
import {Emitter} from "./util/Emitter";
import {Content} from "./interface/Content";
import {Slack} from "./sns/Slack";
import axios from 'axios';

class Main {
    private blog: Blog | undefined;
    private slack:Slack | undefined;

    constructor(){
        this.init();
    }

    private init(){
        this.blogInit();
        this.slackInit();
    }
    private slackInit(){
        this.slack = new Slack();
    }

    private blogInit(){
        this.blog = new Blog();
        Emitter.EVENT_EMITTER.on("setBlogData", (data)=>{
            this.slackPost(data)
        })
    }

    private slackPost(blogData:[Content]){
        if(!this.slack) return;
        const messageData = this.slack.getMessageData(blogData);
        axios.post("", messageData)

    }
}



const main= new Main();
import {Blog} from "./blog/Blog";
import {Emitter} from "./util/Emitter";
import {Content} from "./interface/Content";


class Main {
    private blog: Blog | undefined;

    constructor(){
        this.init();
    }

    private init(){
        this.blogInit();
    }

    private blogInit(){
        this.blog = new Blog();
        Emitter.EVENT_EMITTER.on("setBlogData", (data)=>{
            this.slackPost(data)
        })
    }

    private slackPost(blogData:[Content]){

    }
}



const main= new Main();
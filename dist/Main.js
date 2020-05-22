"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Blog_1 = require("./crawling/Blog");
var Emitter_1 = require("./util/Emitter");
var Slack_1 = require("./sns/Slack");
var axios_1 = __importDefault(require("axios"));
var Naver_1 = require("./crawling/Naver");
var Main = /** @class */ (function () {
    function Main() {
        this.init();
    }
    Main.prototype.init = function () {
        this.blogInit();
        this.naverInit();
        this.slackInit();
    };
    Main.prototype.slackInit = function () {
        this.slack = new Slack_1.Slack();
    };
    Main.prototype.naverInit = function () {
        this.naver = new Naver_1.Naver();
    };
    Main.prototype.blogInit = function () {
        this.blog = new Blog_1.Blog();
        Emitter_1.Emitter.EVENT_EMITTER.on("setBlogData", function (data) {
            //this.slackPost(data)
        });
    };
    Main.prototype.slackPost = function (blogData) {
        if (!this.slack)
            return;
        var messageData = this.slack.getMessageData(blogData);
        axios_1.default.post("https://hooks.slack.com/services/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", messageData);
    };
    return Main;
}());
var main = new Main();

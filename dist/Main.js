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
var Google_1 = require("./crawling/Google");
var Env_1 = require("./util/Env");
var Main = /** @class */ (function () {
    function Main() {
        this.slackPostData = {};
        this.init();
    }
    Main.prototype.init = function () {
        this.blogInit();
        this.naverInit();
        this.slackInit();
        this.googleInit();
        this.loadedData();
    };
    Main.prototype.slackInit = function () {
        this.slack = new Slack_1.Slack();
    };
    Main.prototype.naverInit = function () {
        var _this = this;
        this.naver = new Naver_1.Naver();
        Emitter_1.Emitter.EVENT_EMITTER.on("setWeatherData", function (data) {
            _this.slackPostData.Weather = data;
            _this.loadedData();
        });
    };
    Main.prototype.googleInit = function () {
        var _this = this;
        this.google = new Google_1.Google();
        Emitter_1.Emitter.EVENT_EMITTER.on("setNewsData", function (data) {
            _this.slackPostData.News = data;
            _this.loadedData();
        });
    };
    Main.prototype.blogInit = function () {
        var _this = this;
        this.blog = new Blog_1.Blog();
        Emitter_1.Emitter.EVENT_EMITTER.on("setBlogData", function (data) {
            _this.slackPostData.Blog = data;
            _this.loadedData();
        });
    };
    Main.prototype.loadedData = function () {
        if (!this.google || !this.naver || !this.blog)
            return;
        if (this.google.isLoad && this.naver.isLoad && this.blog.isLoad)
            this.slackPost(this.slackPostData);
        else
            return;
    };
    Main.prototype.slackPost = function (postData) {
        if (!Env_1.Env.WEBHOOKS)
            throw new Error("웹훅 리스트가 없습니다.");
        else {
            if (!this.slack)
                return;
            var messageData_1 = this.slack.getMessageData(postData);
            var webHookList = Env_1.Env.WEBHOOKS.split(',');
            webHookList.map(function (url) {
                axios_1.default.post(url, messageData_1);
            });
        }
    };
    return Main;
}());
var main = new Main();

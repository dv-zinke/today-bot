"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
var config_json_1 = __importDefault(require("../config.json"));
var axios_1 = __importDefault(require("axios"));
var moment_1 = __importDefault(require("moment"));
var Emitter_1 = require("../util/Emitter");
var Blog = /** @class */ (function () {
    function Blog() {
        this.blogContents = [];
        this.init();
    }
    Blog.prototype.init = function () {
        this.setBlogData();
    };
    Blog.prototype.setBlogData = function () {
        var _this = this;
        var baseURL = config_json_1.default.base_url + "?sort=" + config_json_1.default.sort + "&page=" + config_json_1.default.page + "&size=" + config_json_1.default.size + "&tags=" + encodeURI(config_json_1.default.tags.join(","));
        var yesterday = moment_1.default().subtract(1, 'day');
        axios_1.default.get(baseURL)
            .then(function (response) {
            return response.data.data;
        })
            .then(function (dataArray) {
            dataArray.forEach(function (item) {
                var item_date = moment_1.default(item.date);
                if (yesterday.isSame(item_date, 'day')) {
                    item.markdown = "*" + " " + ("<" + item.link + "|" + item.title + ">") + " by " + item.author;
                    _this.blogContents.push(item);
                }
            });
            Emitter_1.Emitter.EVENT_EMITTER.emit("setBlogData", _this.blogContents);
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    return Blog;
}());
exports.Blog = Blog;

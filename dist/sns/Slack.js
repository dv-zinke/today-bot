"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slack = void 0;
var Slack = /** @class */ (function () {
    function Slack() {
        this.init();
    }
    Slack.prototype.init = function () {
    };
    Slack.prototype.getMessageData = function (data) {
        var markdown = "";
        data.forEach(function (item) {
            markdown += item.markdown + "\n";
        });
        this.message = {
            attachments: []
        };
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
    };
    return Slack;
}());
exports.Slack = Slack;

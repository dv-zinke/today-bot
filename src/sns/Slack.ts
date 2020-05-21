import {Message} from "../interface/Message";
import {Content} from "../interface/Content";

export class Slack {

    private message: Message | undefined;

    constructor() {
        this.init();
    }

    private init() {

    }

    public getMessageData(data: [Content]):Message {
        let markdown: string = "";
        data.forEach(function (item) {
            markdown += item.markdown + "\n"
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
    }
}
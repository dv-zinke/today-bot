"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emitter = void 0;
var events_1 = require("events");
var Emitter = /** @class */ (function () {
    function Emitter() {
    }
    Emitter.EVENT_EMITTER = new events_1.EventEmitter();
    return Emitter;
}());
exports.Emitter = Emitter;

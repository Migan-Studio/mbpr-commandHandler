"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
const discord_js_1 = require("discord.js");
class Command {
    constructor() {
        this.name = '';
        this.description = '';
        this.type = discord_js_1.ApplicationCommandType.ChatInput;
    }
    execute(interaction) { }
}
exports.Command = Command;

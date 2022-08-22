"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const _1 = require(".");
class CommandHandler {
    constructor(client, options) {
        this.modules = new discord_js_1.Collection();
        this.client = client;
        this.options = options;
    }
    /**
     *
     * @private
     */
    register(modules) {
        console.info(`[discommand-lite] Command ${modules.name} is Loaded.`);
        this.modules.set(modules.name, modules);
        this.client.once('ready', () => {
            var _a;
            (_a = this.client.application) === null || _a === void 0 ? void 0 : _a.commands.create({
                name: modules.name,
                nameLocalizations: modules.nameLocalizations,
                description: modules.description,
                descriptionLocalizations: modules.descriptionLocalizations,
                defaultPermission: modules.defaultPermission,
                // @ts-ignore
                type: modules.type,
                // @ts-ignore
                options: modules.options,
            });
        });
    }
    loadAll() {
        const dir = (0, fs_1.readdirSync)(this.options.directory);
        if (this.options.loadType === _1.LoadType.File) {
            for (const file of dir) {
                const tempModules = require(`${this.options.directory}/${file}`);
                let modules;
                if (!tempModules.default) {
                    modules = new tempModules();
                }
                else {
                    modules = new tempModules.default();
                }
                this.register(modules);
            }
        }
        else if (this.options.loadType === _1.LoadType.Folder) {
            for (const folder of dir) {
                const folderDir = (0, fs_1.readdirSync)(`${this.options.directory}/${folder}`);
                for (const file of folderDir) {
                    const tempModules = require(`${this.options.directory}/${folder}/${file}`);
                    let modules;
                    if (!tempModules.default) {
                        modules = new tempModules();
                    }
                    else {
                        modules = new tempModules.default();
                    }
                    this.register(modules);
                }
            }
        }
        this.client.on('interactionCreate', async (interaction) => {
            if (interaction.type === discord_js_1.InteractionType.ApplicationCommand) {
                if (interaction.isChatInputCommand()) {
                    const command = this.modules.get(interaction.commandName);
                    if (!command)
                        return;
                    try {
                        await command.execute(interaction);
                    }
                    catch (error) {
                        console.error(error);
                    }
                }
            }
        });
    }
}
exports.CommandHandler = CommandHandler;

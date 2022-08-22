import { type Client, Collection } from 'discord.js';
import { Command, type Options } from '.';
export declare class CommandHandler {
    client: Client;
    options: Options;
    constructor(client: Client, options: Options);
    modules: Collection<string, Command>;
    /**
     *
     * @private
     */
    private register;
    loadAll(): void;
}

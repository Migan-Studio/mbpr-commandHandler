import { ApplicationCommandOptionData, ApplicationCommandType, ChatInputCommandInteraction, PermissionResolvable } from 'discord.js';
export declare class Command {
    name: string;
    nameLocalizations?: {};
    description: string;
    descriptionLocalizations?: {};
    type?: ApplicationCommandType;
    options?: ApplicationCommandOptionData[];
    defaultPermission?: PermissionResolvable;
    execute(interaction: ChatInputCommandInteraction): void;
}

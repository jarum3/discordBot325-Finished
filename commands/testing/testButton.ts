/**
 * Simple ping command that lists time to server, for checking that bot is running
 * @packageDocumentation
 */
import { SlashCommandBuilder, ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } from 'discord.js';
// Pings, returns time pinged. A template for other commands.
module.exports = {
  data: new SlashCommandBuilder().setName('testbutton').setDescription('Replies with Pong!'),
  async execute(interaction: ChatInputCommandInteraction) {
    const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('buttonConfirm')
                .setLabel('Click me!')
                .setStyle(ButtonStyle.Danger),
        );
    await interaction.reply({content: 'I think you should,', components: [row]});
  },
};
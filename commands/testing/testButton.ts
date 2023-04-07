/**
 * Shows an example of a confirmation button
 * @packageDocumentation
 */
import { SlashCommandBuilder, ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
// Pings, returns time pinged. A template for other commands.
module.exports = {
  data: new SlashCommandBuilder().setName('testbutton').setDescription('Example confirmation button.'),
  async execute(interaction: ChatInputCommandInteraction) {
    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('buttonConfirm')
          .setLabel('I AM SURE')
          .setStyle(ButtonStyle.Danger),
      );
    await interaction.reply({ content: 'ARE YOU SURE YOU WANT TO RUN THIS COMMAND?\n(THIS COMMAND IS DESTRUCTIVE AND THE CHANGES CANNOT BE UNDONE)', components: [row] });
  },
};
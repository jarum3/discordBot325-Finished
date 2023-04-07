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
          .setLabel('Click me!')
          .setStyle(ButtonStyle.Danger),
      );
    await interaction.reply({ content: 'I think you should,', components: [row] });
  },
};
import { Events, BaseInteraction } from 'discord.js';

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction: BaseInteraction) {
    if (!interaction.isButton()) return;
    if (!(interaction.customId === 'cancel')) return;
    interaction.deleteReply();
  },
};
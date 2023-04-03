import { Events, BaseInteraction } from 'discord.js';

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction: BaseInteraction) {
    if (!interaction.isButton()) return;
    if (!(interaction.customId === 'buttonConfirm')) return;
    interaction.reply({ content: 'you clicked me!', components: [] });
  },
};
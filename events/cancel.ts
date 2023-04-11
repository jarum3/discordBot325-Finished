/**
 * Button handler for action cancellation
 * @packageDocumentation
 */
import { Events, BaseInteraction } from 'discord.js';

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction: BaseInteraction) {
    if (!interaction.isButton()) return;
    if (!(interaction.customId === 'cancel')) return;
    interaction.update({ content: 'Action cancelled!', components: [], embeds: [] });
  },
};
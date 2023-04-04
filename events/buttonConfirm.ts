import { Events, BaseInteraction } from 'discord.js';

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction: BaseInteraction) {
    if (!interaction.isButton()) return;
    if (!(interaction.customId === 'buttonConfirm')) return;
    //I need to somehow get the previous message with the button in it to this event handler, which I cannot figure out how to do
    interaction.reply({ content: 'click', ephemeral: true, components: []});
  },
};
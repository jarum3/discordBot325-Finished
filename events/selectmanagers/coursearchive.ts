/**
 * Handles a stringSelectMenu with CustomId 'archive-course',
 * moving the course to the bottom of the current list, changing role permissions, and changing student roles over.
 * # Command
 * * This menu is generated by the {@link commands/testing/archivecourse | Archive course command}
 * @packageDocumentation
 */
import { Events, BaseInteraction } from 'discord.js';
import { archiveCourse } from '../../helpers/functions';

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction: BaseInteraction) {
    // Move course into bottom physically, remove from course list, move students into veteran roles, save that data into file
    if (!interaction.isStringSelectMenu()) return;
    if (!(interaction.customId === 'archive-course')) return;
    if (!(interaction.guild)) return;
    await interaction.deferUpdate();
    await archiveCourse(interaction.values, interaction.guild);
    interaction.editReply('Course archived!');
  },
};
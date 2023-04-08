/**
 * Command that takes in a course and archives it, along with moving student roles, its physical position, and its permissions
 * @packageDocumentation
 */
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { CourseSelectMenu, getListFromFile } from '../../helpers/functions';
// Pings, returns time pinged. A template for other commands.
module.exports = {
  data: new SlashCommandBuilder().setName('archivecourse').setDescription('Archives a course and all its students.'),
  async execute(interaction: ChatInputCommandInteraction) {
    const row = await CourseSelectMenu('archive-course', false);
    if (row && getListFromFile('../../data/prevsemester.json')) await interaction.reply({ content: 'Please select which course you\'d like to archive:', components: [row], ephemeral: true });
    else await interaction.reply({ content: 'There are no courses defined currently.', ephemeral: true });
  },
};
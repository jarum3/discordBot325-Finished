/**
 * TODO
 * @packageDocumentation
 */
import { SlashCommandBuilder, ChatInputCommandInteraction, ButtonStyle } from 'discord.js';
import { getListFromFile } from '../helpers/functions';
import { CourseRole } from '../helpers/role';
import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from '@discordjs/builders';
module.exports = {
  data: new SlashCommandBuilder()
    .setName('startsemester')
    .setDescription('Archive old courses, initialize new ones, transfer over student roles.')
    .setDefaultMemberPermissions(0)
    .setDMPermission(false),
  async execute(interaction: ChatInputCommandInteraction) {
    // Loop over each course in prevsemester.json, archive it, save that data to one file, then loop over each new course in courses.json
    // Then move each course over to prevsemester.json
    // TODO Add confirmation button with embed displaying previous semesters to archive, and current semesters to instantiate
    const prevCourses = getListFromFile('data/prevsemester.json') as CourseRole[];
    const newCourses = getListFromFile('data/courses.json') as CourseRole[];
    const prevCoursesNames: string[] = [];
    const newCoursesNames: string[] = [];
    prevCourses.forEach(elem => prevCoursesNames.push(elem.name));
    newCourses.forEach(elem => newCoursesNames.push(elem.name));
    const embed = new EmbedBuilder()
      .setTitle('Semester Confirmation')
      .setColor(0xDD7711)
      .setDescription('Are you sure you\'d like to enact the following changes?')
      .setAuthor({ name: '325-Bot - Semester Confirmation' })
      .addFields(
        { name: 'Previous courses to be archived', value: '\n' + prevCoursesNames.join('\n') },
        { name: 'New courses to be created', value: '\n' + newCoursesNames.join('\n') },
      )
      .setFooter({ text: 'Only click confirm if you\'re certain these courses can be archived. This action is destructive.' });
    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('semester-start')
          .setLabel('Confirm')
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId('semester-cancel')
          .setLabel('Cancel')
          .setStyle(ButtonStyle.Secondary),
      );
    await interaction.reply({ embeds: [embed], components: [row] });
  },
};
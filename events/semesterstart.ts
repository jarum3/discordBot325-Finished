import { Events, BaseInteraction } from 'discord.js';
import { archiveCourse, createAndPopulateCategory, getListFromFile, saveListToFile } from '../helpers/functions';
import { CourseRole } from '../helpers/role';
import * as fs from 'node:fs';

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction: BaseInteraction) {
    if (!interaction.isButton()) return;
    if (!(interaction.customId === 'semester-start')) return;
    await interaction.deferUpdate();
    // Loop through previous semester, archive each course, discarding it from the list.
    // Then, loop through each current course, creating a category for it and moving it to the previous semester file.
    // Then, reset the semester value, and ensure that the course list is empty.
    const prevCourses = getListFromFile('data/prevsemester.json') as CourseRole[];
    const newCourses = getListFromFile('data/courses.json') as CourseRole[];
    const prevCoursesNames: string[] = [];
    const newCoursesNames: string[] = [];
    prevCourses.forEach(elem => prevCoursesNames.push(elem.name));
    newCourses.forEach(elem => newCoursesNames.push(elem.name));
    if (interaction.guild) {
      for (const course of prevCourses) {
        if (interaction.guild) archiveCourse(course.name, interaction.guild);
      }
      for (const course of newCourses) {
        createAndPopulateCategory(course, interaction.guild.channels);
      }
      fs.writeFileSync('data/currentsemester.txt', '');
      saveListToFile([], 'data/courses.json');
    }
    await interaction.editReply({ content: 'Semester started!', components: [], embeds: [] });
  },
};
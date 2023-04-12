/**
 * Loops through every course and previous course, archiving and creating categories. Then, resets semester file and new courses list.
 * # Command
 * * This menu is generated by the {@link commands/startsemester | Start Semester Command}
 * @packageDocumentation
 */
import { Events, BaseInteraction, ChannelType } from 'discord.js';
import { archiveCourse, checkCategory, createAndPopulateCategory, getListFromFile, getOtherJoint, refreshCourse, saveListToFile, writeCategory } from '../helpers/functions';
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
    const topCategory = interaction.guild?.channels.cache.find(elem => elem.type === ChannelType.GuildCategory && elem.position === 0);
    prevCourses.forEach(elem => prevCoursesNames.push(elem.name));
    newCourses.forEach(elem => newCoursesNames.push(elem.name));
    if (interaction.guild) {
      for (const course of prevCourses) {
        if (interaction.guild) await archiveCourse(course.name, interaction.guild);
      }
      saveListToFile([], 'data/prevsemester.json');
      const scannedCourses: CourseRole[] = [];
      for (const course of newCourses) {
        if (scannedCourses.find(elem => elem.name === course.name)) continue;
        const newCourse = refreshCourse(course);
        if (newCourse) {
          let category = await checkCategory(newCourse);
          if (!category) category = await createAndPopulateCategory(newCourse, interaction.guild.channels);
          if (category) {
            course.category = category;
            scannedCourses.push(course);
            const joint = await getOtherJoint(newCourse);
            writeCategory(newCourse, category);
            if (joint) {
              writeCategory(joint, category);
              scannedCourses.push(joint);
            }
            const serverCategory = await interaction.guild.channels.fetch(category.id);
            if (serverCategory) await interaction.guild.channels.setPosition(serverCategory, 0);
          }
        }
      }
      fs.writeFileSync('data/currentsemester.txt', '');
      saveListToFile(scannedCourses, 'data/prevsemester.json');
      fs.writeFileSync('data/courses.json', '[]');
      if (topCategory) await interaction.guild.channels.setPosition(topCategory, 0);
      await interaction.editReply({ content: 'Semester started!', components: [], embeds: [] });
      return;
    }
  },
};
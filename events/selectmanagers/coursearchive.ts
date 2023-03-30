// TODO docs
/**
 * Handles a stringSelectMenu with CustomId 'course-remove',
 * removing an entered course from the list of roles,
 * deleting its associated active server role,
 * and deleting its associated veteran role if no members exist with it.
 * # Command
 * * This menu is generated by the {@link commands/removeoptrole | Remove opt role command}
 * @packageDocumentation
 */
import { Events, BaseInteraction, GuildBasedChannel, CategoryChannel, GuildMember } from 'discord.js';
import { getListFromFile, getSemester, saveListToFile } from '../../helpers/functions';
import { CourseRole } from '../../helpers/role';

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction: BaseInteraction) {
    // Move course into bottom physically, remove from course list, move students into veteran roles, save that data into file
    if (!interaction.isStringSelectMenu()) return;
    if (!(interaction.customId === 'archive-course')) return;
    if (!(interaction.guild)) return;
    await interaction.deferUpdate();
    const rolesList = getListFromFile('data/courses.json') as CourseRole[];
    const rolesSelected = interaction.values;
    const archivedRoles: string[] = [];
    // Assign roles in a loop, in case we want to make this a multi-select later.
    for (const selectedElement of rolesSelected) {
      for (const course of rolesList) {
        if (course.name != selectedElement) continue;
        const courseRole = course.role;
        const veteranRole = course.veteranRole;
        const serverRole = await interaction.guild.roles.fetch(courseRole.id);
        const serverVeteranRole = await interaction.guild.roles.fetch(veteranRole.id);
        // TODO Dropdown for confirmation
        // TODO
        // [X] Move course to bottom: find first course of name matching current semester, then find first course after that not matching, put this course above that.
        // [X] Change role permissions from student to veteran
        // [X] Transfer student roles over, loop over each student with student role for this course, remove it, add the veteran role
        // [ ] Transfer from current courses file to previous courses file (Remove category from current course copy)
        if (course.category) {
          const category = await interaction.guild.channels.fetch(course.category.id) as CategoryChannel;
          if (category) {
            const channels: CategoryChannel[] = [];
            for (const channelArray of interaction.guild.channels.cache.entries()) {
              for (const possibleChannel of channelArray) {
                if ((<GuildBasedChannel>possibleChannel).name !== undefined) {
                  const channel = possibleChannel as GuildBasedChannel;
                  if ((<CategoryChannel>channel).children !== undefined) {
                    channels.push(channel as CategoryChannel);
                  }
                }
              }
            }
            channels.sort((a, b) => a.position - b.position);
            // channels now represents all the categories in the server, sorted by their position
            let foundCurrent = false;
            let position = -1;
            for (const channel of channels) {
              if (channel.name.includes(getSemester())) foundCurrent = true;
              if (foundCurrent === true && !channel.name.includes(getSemester())) {
                position = channel.position - 1;
                break;
              }
            }
            if (position >= 0) category.setPosition(position);
            else category.setPosition(300000);
            if (serverRole) {
              const permissions = category.permissionsFor(serverRole).serialize();
              category.permissionOverwrites.delete(serverRole);
              if (serverVeteranRole) category.permissionOverwrites.create(serverVeteranRole, permissions);
            }
            // Category = current category
            // ServerRole = Course Role
            // ServerVeteranRole = Veteran Role
            // Find students with current student role
            const students: GuildMember[] = [];
            for (const studentsArray of interaction.guild.members.cache.entries()) {
              for (const possibleStudent of studentsArray) {
                const student = possibleStudent as GuildMember;
                if ((<GuildMember>student).roles !== undefined) students.push(student as GuildMember);
              }
            }
            for (const student of students) {
              if (serverRole && serverVeteranRole) {
                student.roles.remove(serverRole);
                student.roles.add(serverVeteranRole);
              }
            }
            // TODO Continue from here and move course from current file to prev semester file
          }
        }
        else {
          await interaction.reply('This course doesn\'t currently have a category');
        }
      }
    }
    await interaction.editReply({ content: 'Course archived: ' + archivedRoles.join(', '), components: [] });
  },
};
/**
 * Simple help command that lists every available command
 * @packageDocumentation
 */
import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
// Prints out every available command, has to be manually updated
module.exports = {

  data: new SlashCommandBuilder().setName('help').setDescription('Provides info on commands.'),
  async execute(interaction: ChatInputCommandInteraction) {
    const embed = new EmbedBuilder()
      .setTitle('Help')
      .setColor(0x0099FF)
      .setDescription('These are a list of commands and a brief description of their purpose.')
      .setAuthor({ name: '325-Bot - List of Commands' })
      .addFields(
        { name: 'Overview', value: 'Start by adding courses with the /addcourse command, and entering any available details. Joint courses should be created with one normal course, and then a second course with jointCourse=true selected.\nNext, set a semester value, like Winter 2021, with /setsemester. Finally, start a semester with /startsemester, and use /selectcoursesbuilder to create a dropdown for students.' },
        { name: 'Add Course (/addcourse)', value: 'Adds a course to the list of courses for this server. Creates the course role with a random color, and the veteran role with a desaturated version.\nTakes parameters video, for whether the course needs a read-only channel describing how to make videos, and joint, for if the course shares a classroom with another course.' },
        { name: 'Add Optional Role (/addoptrole)', value: 'Adds an optional role for students to join. Creates the optional role with a random color.' },
        { name: 'Remove Course (/removecourse)', value: 'Removes a course from the list of courses for this server. Deletes the course role, and deletes the veteran role if no users have it.' },
        { name: 'Remove Optional Role (/removeoptrole)', value: 'Removes an optional role from the list of roles for this server. Deletes the server role.' },
        { name: 'Select Courses Builder (/selectcoursesbuilder)', value: 'Creates a dropdown for students to select roles for courses. Use this in a channel students should access to receive roles.' },
        { name: 'Optional Roles Builder (/optrolesbuilder)', value: 'Creates a dropdown for students to select optional roles. Use this in a channel students should access to receive roles.' },
        { name: 'Set Semester (/setsemester)', value: 'Sets the upcoming semester value, appended to each category' },
        { name: 'Start Semester (/startsemester)', value: 'Uses the currently-defined courses and optional roles to start a new semester.\nAutomatically creates channels. permissions, transfers over student roles, and archives old channels.\n⚠️This command is destructive.⚠️' },
      )
      .setFooter({ text: 'As always, if you need help feel free to reach out!' });

    await interaction.reply({ embeds: [embed] });
  },
};
/**
 * Command to simply accept a string and write it as the current semester value.
 * @packageDocumentation
 */
import { SlashCommandBuilder, ChatInputCommandInteraction, SlashCommandStringOption } from 'discord.js';
import * as fs from 'node:fs';
module.exports = {
  data: new SlashCommandBuilder()
    .setName('setsemester')
    .setDescription('Write semester value to append to categories')
    .addStringOption((option: SlashCommandStringOption) =>
      option.setName('name')
        .setDescription('The name of the new semester')
        .setRequired(true))
    .setDefaultMemberPermissions(0)
    .setDMPermission(false),
  async execute(interaction: ChatInputCommandInteraction) {
    const semester = interaction.options.getString('name');
    if (semester !== null) {
      fs.writeFileSync('data/currentsemester.txt', semester);
      interaction.reply('New semester: ' + semester);
    }
    else interaction.reply('Sorry, that input was invalid.');
  },
};
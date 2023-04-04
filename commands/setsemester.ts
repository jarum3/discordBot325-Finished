/**
 * TODO
 * @packageDocumentation
 */
import { SlashCommandBuilder, ChatInputCommandInteraction, SlashCommandStringOption } from 'discord.js';
// TODO
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
    // TODO
    // Write string to currentsemester.txt
    const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
    interaction.editReply(`Pong!\nTook ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
  },
};
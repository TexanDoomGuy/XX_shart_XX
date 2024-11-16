const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
var rules = "null";
// console.log(`[DEBUG] rules = ${rules}`);
fs.readFile("Rules.txt", (err, data) => {
    if (err) throw err;
    rules = data.toString();
    // console.log(`[DEBUG] rules = ${rules}`);
});
console.log("[INFO] Rules.txt read and saved");
// console.log(`[DEBUG] rules = ${rules}`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rules")
        .setDescription(
            "Provides the rules so you dont have to change channels."
        ),
    async execute(interaction) {
        // interaction.user is the object representing the User who ran the command
        // interaction.member is the GuildMember object, which represents the user in the specific guild
        return await interaction.reply({
            content: `${rules}`,
            ephemeral: true,
        });
    },
};

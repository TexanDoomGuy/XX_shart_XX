const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    Client,
    Collection,
    Events,
    GatewayIntentBits,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Warns a user")
        .addStringOption((option) =>
            option
                .setName("reason")
                .setDescription("Why the user is getting warned")
                .setRequired(true)
        )
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("Who's getting warned? (pings the user)")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute(interaction) {
        const the_reason = interaction.options.getString("reason");
        const who_asked = interaction.options.getUser("user");
        await interaction.guild.channels.cache.get("1208642338667102288").send({
            content: `${who_asked} has been warned by ${interaction.user}`,
        });
        await interaction.guild.channels.cache.get("1208642338667102288").send({
            content: `Reason: ${the_reason}`,
        });
        return await interaction.reply({
            content: `Sent the following warning \n ${who_asked} has been warned by ${interaction.user} \n Reason: ${the_reason}`,
            ephemeral: true,
        });
    },
};

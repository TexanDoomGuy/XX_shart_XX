const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("purge")
        .setDescription("Deletes an amount of messages!")
        .addNumberOption((option) =>
            option
                .setName("amount")
                .setDescription("The amount of messages to purge")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute(interaction) {
        const amount = interaction.options.getNumber("amount");
        console.log(amount);
        await interaction.channel.bulkDelete(amount);
        var messagess = "messages";
        if (amount == 1) {
            messagess = "message";
        }
        return await interaction.reply({
            content: `Deleted ${amount} messages.`,
            ephemeral: true,
        });
    },
};

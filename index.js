const fs = require("node:fs");
const path = require("node:path");
var pissmode = false;
const {
    Client,
    Collection,
    Events,
    GatewayIntentBits,
    AuditLogEvent,
    ActivityType,
    messageLink,
} = require("discord.js");
const token = "no";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ("data" in command && "execute" in command) {
            client.commands.set(command.data.name, command);
            console.log(
                `[INFO] The command at ${path.join(
                    commandsPath,
                    file
                )} is exist.`
            );
        } else {
            console.log(
                `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
            );
        }
    }
}

client.once(Events.ClientReady, async (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    client.user.setActivity("TESTING", {
        type: ActivityType.Watching,
    });
});
client.on("messageCreate", (message) => {
    console.log(
        "[MESSAGE]: " +
            message.author.displayName +
            " (" +
            message.author.username +
            ")" +
            ":"
    );
    console.log("[MESSAGE]: " + message.content);
    console.log("");

    if (
        message.author.id == 617872594032394242 &&
        message.content.includes(":nova")
    ) {
        if (pissmode == true) {
            pissmode = false;
            message.reply(`squatch`);
            setTimeout(function () {
                message.channel.bulkDelete(2);
            }, 250);
        } else if (pissmode == false) {
            pissmode = true;
            message.reply(`ruffles`);
            setTimeout(function () {
                message.channel.bulkDelete(2);
            }, 250);
        }
    }
    if (
        message.author.id == 655520425706651658 &&
        pissmode == true &&
        (message.content.includes(".gif") ||
            message.content.includes("https://tenor."))
    ) {
        message.reply(`Not funny.`);
    }
    if (message.content.includes("C448E96B-277E-45FF-B600-B60B9B1A4226.gif")) {
        message.reply(`Not funny.`);
    }
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(
            `No command matching ${interaction.commandName} was found.`
        );
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content:
                    "Uh Oh spgyattios, error! Tell Bill that he needs to wake up and fix the error",
                ephemeral: true,
            });
        } else {
            await interaction.reply({
                content:
                    "Uh Oh spgyattios, error! Tell Bill that he needs to wake up and fix the error",
                ephemeral: true,
            });
        }
    }
});

client.login(token);

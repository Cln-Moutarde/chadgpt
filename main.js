const { GatewayIntentBits, Client } = require("discord.js");
require("dotenv/config");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log("Bot is ready!");
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content === "chad") {
    message.reply("tu es chaddesque");
  }

  if (message.content.includes("chad")) {
    const firstmentionuser = message.mentions.members.first();
    if (firstmentionuser) {
      console.log(firstmentionuser.user.username);
      message.reply(
        `C'est vrai que ${firstmentionuser.user.username} est chaddesque`
      );
    } else {
      message.reply("C'est vrai qu'il est chaddesque");
    }
  }
});

client.login(process.env.TOKEN);

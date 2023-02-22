import fs from 'node:fs';
import path from 'node:path';
import {
	GatewayIntentBits,
	Client,
	Collection,
	SlashCommandBuilder,
	Events,
} from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import * as chad from './commands/chad.js';
import * as chadimg from './commands/chadimg.js';
import * as citation from './commands/citation.js';
import * as spam from './commands/spam.js';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.MessageContent,
	],
});

client.commands = new Collection();

const commandsPath = path.join(path.resolve('./'), 'commands');
const commandsFiles = fs
	.readdirSync(commandsPath)
	.filter((file) => file.endsWith('.js'));

const commands = [
	chad.COMMAND_DEFINITION,
	chadimg.COMMAND_DEFINITION,
	citation.COMMAND_DEFINITION,
	spam.COMMAND_DEFINITION,
].map((command) => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
rest.put(
	Routes.applicationGuildCommands(
		process.env.CLIENT_ID,
		process.env.GUILD_ID
	),
	{
		body: commands,
	}
)
	.then(() => console.log("Successfully registered application's commands"))
	.catch(console.error);

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;
	const command = client.commands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction);
	} catch (error) {
		console.log(error);
		await interaction.reply({
			content: 'ERROR with the command !',
			ephemeral: true,
		});
	}
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

	switch (interaction.commandName) {
		case 'chad':
			chad.run(interaction);
			break;
		case 'chadimg':
			chadimg.run(interaction);
			break;
		case 'citation':
			citation.run(interaction);
			break;
		case 'spam':
			spam.run(interaction);
			break;
		default:
			break;
	}
});

client.on('messageCreate', (message) => {
	if (message.author.bot) return;

	if (message.content.includes('chad')) {
		const firstmentionuser = message.mentions.members.first();
		if (firstmentionuser) {
			console.log(firstmentionuser.user.username);
			message.reply(
				`C'est vrai que ${firstmentionuser.user.username} est chaddesque`
			);
		} else {
			const chad = [
				'tu es chaddesque',
				'ta machoir est carrée',
				'quel BG',
				'tu as beaucoup trop de charisme',
			];
			message.reply(chad[Math.floor(Math.random() * chad.length)]);
		}
	}
});

process.on('uncaughtException', console.error);


client.on('ready', () => {
	console.log('Bot is ready!');
});

client.login(process.env.TOKEN);

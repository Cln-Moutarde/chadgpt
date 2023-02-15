import { SlashCommandBuilder } from '@discordjs/builders';

const COMMAND_DEFINITION = new SlashCommandBuilder()
	.setName('citation')
	.setDescription("Le bot t'inspire");

async function citation(interaction) {
	const api_url = 'https://zenquotes.io/api/quotes/';
	let response = await fetch(api_url);
	let data = await response.json();
	let quote = data[0].q;
	console.log(quote);
	let autor = data[0].a;
	console.log(autor);

	await interaction.reply(`${quote} 
**${autor}**`);
}

async function run(interaction) {
	await citation(interaction);
}

export { run, COMMAND_DEFINITION };

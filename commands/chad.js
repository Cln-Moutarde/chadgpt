import { SlashCommandBuilder } from '@discordjs/builders';
//, CommandInteraction
const COMMAND_DEFINITION = new SlashCommandBuilder()
	.setName('chad')
	.setDescription('Le bot te rappelles qui tu es !')
	.addStringOption((option) =>
		option
			.setName('mention')
			.setDescription('mention someone')
			.setRequired(false)
	);

async function chad(interaction) {
	let user = interaction.options.getString('mention');

	if (user === null) {
		await interaction.reply('tu es un vrai chad');
	} else {
		console.log(user);
		await interaction.reply(`C'est vrai que ${user} est chaddesque`);
	}
}

async function run(interaction) {
	await chad(interaction);
}

export { run, COMMAND_DEFINITION };

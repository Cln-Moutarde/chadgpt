import { SlashCommandBuilder } from '@discordjs/builders';
//, CommandInteraction
const COMMAND_DEFINITION = new SlashCommandBuilder()
	.setName('vote')
	.setDescription('vote pour kick')
	.addUserOption((option) =>
		option
			.setName('mention')
			.setDescription('mention someone')
			.setRequired(true)
	);

async function vote(interaction) {
	let user = interaction.options.getUser('mention');
    let number = 4

    console.log(user)
}

async function run(interaction) {
	await vote(interaction);
}

export { run, COMMAND_DEFINITION };
import { SlashCommandBuilder } from '@discordjs/builders';
//, CommandInteraction
const COMMAND_DEFINITION = new SlashCommandBuilder()
	.setName('spam')
	.setDescription("Le bot fait ce qu'un vrai chad fait")
	.addStringOption((optionmsg) =>
		optionmsg
			.setName('message')
			.setDescription('Entre ton message')
			.setRequired(true)
	)
	.addUserOption((optionprs) =>
		optionprs
			.setName('personne')
			.setDescription(
				'Si une mention est mise, la personne visée se fera spam dans ses MPs'
			)
			.setRequired(false)
	)
	.addNumberOption((optionnb) =>
		optionnb
			.setName('nombre')
			.setDescription('Envoit ton message autant de fois que tu veux :)')
			.setRequired(false)
	);

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function spam(interaction) {
	let msg = interaction.options.getString('message');
	let user = interaction.options.getUser('personne');
	let nb = interaction.options.getNumber('nombre') ?? 10;


	for (let i = 0; i < nb; i++) {
		if (user) {
			await user.send(msg)
		} else {
			await interaction.channel.send(msg)
			
		}
		await sleep(1000)
	}
}

async function run(interaction) {
	await interaction.deferReply();
	try {
		await spam(interaction);
		interaction.followUp("Done")
	} catch (err)  {
		interaction.followUp(`ERREUR: l'utilisateur a sans doute bloqué le bot (*${err}*)`)	
	}


}

export { run, COMMAND_DEFINITION };

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
	let member = interaction.options.getMember('mention');
	let memberChannel = member.voice.channel
    let senderChannel = interaction.member.voice.channel

	if (memberChannel === senderChannel) {
		console.log("oui")
	} else {
		console.log("non")
	}

}

async function run(interaction) {
	await vote(interaction);
}

export { run, COMMAND_DEFINITION };
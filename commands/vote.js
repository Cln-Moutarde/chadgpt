import { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder} from '@discordjs/builders';
import { ButtonStyle} from 'discord.js';


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
	await interaction.deferReply();
	let member = await interaction.guild.members.fetch(interaction.options.getMember('mention'))
	let memberChannel = member.voice.channel.id
    let senderChannel = interaction.member.voice.channel.id
	let ceilNumber = Math.ceil(interaction.member.voice.channel.members.size / 2)
console.log(ceilNumber)

	if (memberChannel === senderChannel) {
		console.log("oui")
		let embed = new EmbedBuilder()
		.setTitle(`Someone wants ${member.user.username} be mute for a minute`)
		.setDescription(`If the majority of the voice channel wants ${member.user} be mute, then this user will be for a minute`)

		let row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
			.setCustomId('confirm')
			.setLabel('Confirm Kick')
			.setStyle(ButtonStyle.Danger)
		)
		interaction.editReply({embeds: [embed], components: [row]})
		


	} else {
		console.log("non")
		interaction.reply("Sorry, but you must be in the same channel than the targeted user")
	}

}

async function run(interaction) {
	await vote(interaction);
}

export { run, COMMAND_DEFINITION };
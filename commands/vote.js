import {
	SlashCommandBuilder,
	EmbedBuilder,
	ButtonBuilder,
	ActionRowBuilder,
} from '@discordjs/builders';
import { ButtonStyle, Collector, ComponentType } from 'discord.js';

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
	let member = await interaction.guild.members.fetch(
		interaction.options.getMember('mention')
	);
	let memberChannel = member.voice?.channel?.id;
	let senderChannel = interaction.member.voice.channel?.id;
	let ceilNumber = Math.ceil(
		interaction.member.voice.channel?.members?.size / 2
	);
	console.log(ceilNumber);
	let voteEndTime = Math.round(Date.now() / 1000) + 60;

	if (
		memberChannel !== senderChannel ||
		memberChannel === undefined ||
		senderChannel === undefined
	) {
		console.log('non');
		interaction.reply(
			'Sorry, but you must be in the same voice channel than the targeted user'
		);
		return;
	}
	console.log('oui');
	let embed = new EmbedBuilder()
		.setTitle(`Someone wants ${member.user.username} be mute for a minute`)
		.setDescription(
			`If the majority of the voice channel wants ${member.user} be mute, then this user will be for a minute`
		)
		.addFields(
			{
				name: 'Count',
				value: `0 out of ${ceilNumber} users have voted`,
				inline: true,
			},
			{ name: 'Timer', value: `<t:${voteEndTime}:R>`, inline: true }
		);

	let row = new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setCustomId('confirm')
			.setLabel('Confirm Mute')
			.setStyle(ButtonStyle.Danger)
	);
	let reply = await interaction.editReply({
		embeds: [embed],
		components: [row],
	});

	const filter = (buttonInteraction) =>
		buttonInteraction.customId === 'confirm';
	const collector = reply.createMessageComponentCollector({
		filter,
		componentType: ComponentType.Button,
		time: 60000,
	});

	let voters = new Set();
	if (member.voice.serverMute) {
		interaction.editReply({
			embeds: [],
			components: [],
			content: 'This user is already mute',
		});
		return;
	}
	collector.on('collect', async (buttonInteraction) => {
		voters.add(buttonInteraction.user.id);

		let embed = new EmbedBuilder()
			.setTitle(
				`Someone wants ${member.user.username} be mute for a minute`
			)
			.setDescription(
				`If the majority of the voice channel wants ${member.user} be mute, then this user will be for a minute`
			)
			.addFields(
				{
					name: 'Count',
					value: `${voters.size} out of ${ceilNumber} users have voted`,
					inline: true,
				},
				{ name: 'Timer', value: `<t:${voteEndTime}:R>`, inline: true }
			);

		interaction.editReply({ embeds: [embed], components: [row] });

		if (voters.size >= ceilNumber) {
			member.voice.setMute(
				true,
				`The majority of this voice channel decided to mute ${member.user.username} for a minute after a vote iniciated by ${interaction.member.user.username}`
			);
			interaction.editReply({
				embeds: [],
				components: [],
				content: `The majority of this voice channel decided to mute ${member.user} for a minute after a vote iniciated by ${interaction.member.user}`,
			});
			setTimeout(() => {
				member.voice.setMute(false, 'You are unmute');
			}, 60000);
		}
	});

	collector.on('end', (collected, reason) => {
		if (voters.size < ceilNumber) {
			let embed = new EmbedBuilder()
				.setTitle(`The vote has expired`)
				.setDescription(
					`Only ${voters.size} out of ${ceilNumber} have voted for a mute`
				);

			interaction.editReply({ embeds: [embed], components: [] });
		}
	});
}

async function run(interaction) {
	await vote(interaction);
}

export { run, COMMAND_DEFINITION };

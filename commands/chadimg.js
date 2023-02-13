import Canvas from '@napi-rs/canvas'
import { SlashCommandBuilder} from '@discordjs/builders';
import { AttachmentBuilder } from 'discord.js';


const COMMAND_DEFINITION = new SlashCommandBuilder()
	.setName('chadimg')
	.setDescription('Le bot te montre une photo du vrai !')

async function chadimg(interaction) {
	const file = new AttachmentBuilder('./commands/files/chad.jpg');
	const exampleEmbed = {
		title: 'Voici le chad',
		image: {
			url: 'attachment://chad.jpg',
		},
	};
	
	interaction.reply({ embeds: [exampleEmbed], files: [file] });
	


}

async function run(interaction) {
	await chadimg(interaction);
}


export {run, COMMAND_DEFINITION };



import { SlashCommandBuilder} from '@discordjs/builders';
import { AttachmentBuilder } from 'discord.js';


const COMMAND_DEFINITION = new SlashCommandBuilder()
	.setName('citation')
	.setDescription("Le bot t'inspire")
    .addStringOption((option) =>
		option
			.setName('auteur')
			.setDescription("citation d'un auteur en particulier")
			.setRequired(false)
	);

async function citation(interaction) {
    const api_url = "https://zenquotes.io/api/quotes/"
    let auteur = interaction.options.getString('auteur');

    if (auteur === null) {
        let response = await fetch(api_url)
        let data = await response.json()
        console.log(data)
        let quote = data[0].q
        console.log(quote)
        let autor = data[0].a
        console.log(autor)

        await interaction.reply(`*${quote}*; ${autor}`)
        
    }
	};
		



async function run(interaction) {
	await citation(interaction);
}


export {run, COMMAND_DEFINITION };
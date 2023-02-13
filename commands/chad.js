import { SlashCommandBuilder} from '@discordjs/builders';
//, CommandInteraction 
const COMMAND_DEFINITION = new SlashCommandBuilder()
	.setName('chad')
	.setDescription('Le bot te rappelles qui tu es !')
	.addStringOption((option) =>
		option
			.setName('mention')
			.setDescription("mention someone")
			.setRequired(false)
	);

async function chad(interaction) {
    const user = interaction.options.getUser();
    console.log(user)
    await interaction.reply(`C'est vrai que est chaddesque`)
}

async function run(interaction) {
	await chad(interaction);
}


export {run, COMMAND_DEFINITION };


for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        targetUser.send(`${msg}`);
    }, 1000);
    }
    interaction.reply("Done")
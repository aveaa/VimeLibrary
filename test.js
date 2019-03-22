// В кач-ве примера, сделаем Discord бота
const config = { token: "Discord токен бота", prefix: "!" };
const VimeLibrary = require('vimelibrary'); // или './vindex.js', если устанавливаете обычным файлом
const api = new VimeLibrary("Тут ваш API токен");
const { Client, RichEmbed } = require('discord.js');
const client = new Client({
    disableEveryone: true
});

client.on("ready", () => console.info(`Бот подключён к ${client.guilds.size} серверам, в присутствии ${client.users.size} пользователей`));

client.on("message", (message) => {
    if(message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
    // Будет показан только один пример, так как админу лень писать дальше
    if(command === "getUser") {
        let pname = args.join(" ");
        if(!pname) return message.reply(":x: Вы не указали имя игрока!");
        
        if(pname) {
            api.getUser(name, pname).then(res => {
                if(!res[0].id) return message.reply(":x: Такого игрока не существует!")
                var session;
                api.getSession(res[0].id).then(r2 => {
                    session = r2.online.message
                    var guild;
                    if(res[0].guild === null) guild = "Не состоит";
                        else guild = `<${res[0].guild.tag}> ${res[0].guild.name}**`;
                    let embed = new RichEmbed()
                        .setColor(`#${api.returnReadable(res[0].rank).color}`)
                        .setTitle(`Статистика игрока ${api.returnReadable(res[0].rank).prefix + res[0].username}`)
                        .addField(`ID аккаунта`, res[0].id)
                        .addField(`Уровень`, res[0].level)
                        .addField(`Проведённое время на сервере`, Math.floor(res[0].playedSeconds / 60) + 'м. ' + res[0].playedSeconds % 60 + 'с.')
                        .addField(`Статус`, session)
                        .addField(`Последний заход`, api.returnLastSeen(res[0].lastSeen))
                        .addField(`Гильдия`, guild)
                    
                    return message.channel.send(embed)
                })
            })
        }
    }
});

client.login(config.token);

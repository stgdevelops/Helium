//CONFIG
const prefix = 'he!';
const token = process.env.DISCORD_BOT_SECRET;
const database = require('@replit/database');
const db = new database();
const keep_alive = require('./keep_alive.js');
const support_server_link = 'https://discord.gg/HBctQJU';
const error_channel_id = '709797350331383845';

//PACKAGES
const fetch = require('node-fetch');
const { Client, MessageEmbed, Collection } = require('discord.js');
const Eval = require('open-eval');
const ev = new Eval();
const helium = new Client();
const { inspect } = require('util');
const querystring = require('querystring');
const approvedUsers = require('./info.json');
const random = require('simple-random-number-generator');
const eightball = require('8ball')();
const figlet = require('figlet');
const evaluate = require('matheval').evaluate;

//CODE
helium.on('ready', () => {
  helium.user.setActivity(`for he!help.`, { type: 'WATCHING' });
  console.log(`I am logged in as ${helium.user.username}`);

  let info = helium.guilds.cache.map((e) => e.ownerID)
  let message = new MessageEmbed()
   .setTitle("Annoucement:")
   .setColor("#FF0000")
   .addField(`New Features:`, `We are trying our best to push new features for our bot as well as make our user experience better!`, true)
   .addField(`I am now Open Sourced!`, `You can find my source code over on GitHub => `, true)
   .addField(`Join our Support Server`, "https://discord.gg/pUZQEsSjM6", true)
   .setFooter(`Message sent by the STGdevelopers team`);

   /*const user = await client.users.fetch(i).catch(() => null);
   if (!user) return console.log("User not found");
   await user.send(message).catch(() => {
    console.log("User has DMs closed :(");
  });*/
  helium.guilds.cache
    .get('702261250603745358')
    .channels.cache.get('709797350331383845')
    .send(message);
  info.forEach((i) => {
   
  });

  /*helium.guilds.cache
    .get('702261250603745358')
    .channels.cache.get('708553420847448124')
    .send('***Bot has been rebooted.***');*/
});

//Main Commands Structure
helium.on('message', message => {
  if (message.channel.type == 'dm') return;
  if (message.author.bot) return;
  try {
    if (message.content.toLowerCase() === `${prefix}help`) {
      let params = {
        min: 0,
        max: 16777215,
        integer: true
      };
      let randomcolor = random(params);

      message.channel.send({
        embed: {
          color: randomcolor,
          author: {},
          title: '**Commands List**',
          description:
            "Here is a list of all the commands associated with this bot.  The bot's prefix is " +
            '`' +
            prefix +
            '`.',
          fields: [
            {
              name: 'Information Commands',
              value:
                '`alive` - Check to see if the bot is online and active.  The bot may be online, but the script might not be running.  You can check by typing in that command\n`invite` - Displays invite link to invite this bot to your server\n`ping` - Shows response time of bot\n`server` - Shows bot support server'
            },
            {
              name: 'Fun Commands',
              value:
                '`8ball` - Find the answer to your deepest and darkest questions from the far beyond\n`ascii` - Transforms your input text into ASCII art\n`say` - Have the bot say your message)'
            },
            {
              name: 'Custom Commands',
              value: '`big brain` - See how big your brain is'
            },
            {
              name: 'Server/User Information',
              value:
                '`avatar` - Shows the avatar of the person you mention or yourself\n`myinfo` - Shows detailed information about your Discord User information\n`serverinfo` - Shows detailed infromation about the server this command is run in\n`dev/devs/developers` - Displays the developers that helped with the bot.'
            },
            {
              name: 'Math',
              value:
                '`calculate` - Enter advanced math equations and get them solved by the bot'
            },
            {
              name: 'Moderation',
              value:
                '`ban` - Bans a member from the server\n`kick` - Kicks a member from the server\n`mute` - Mutes a member\n`unmute` - Unmutes a member'
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url:
              'https://images-ext-1.discordapp.net/external/lDqJXP6mNPKBLBarcyYTtCK6zpLnjfymfnIFKPBd9VA/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/563186108712878090/fac5390d5f299d71d2f694695605fc9c.png?width=990&height=990',
            text: `Code by Aerex Bots`
          }
        }
      });
    }
    if (message.content.toLowerCase() === `${prefix}alive`) {
      message.reply(`I am alive!`);
    }

    if (message.content.toLowerCase() === `${prefix}server count`) {
      message.reply(`i am in ${helium.guilds.cache.size} servers`);
    }

    if (message.content.toLowerCase() === `${prefix}user count`) {
      message.reply(`i have ${helium.guilds.cache.map((g) => g.memberCount).reduce((a, b) => a + b).toLocaleString()} members`);
    }

    if (message.content.toLowerCase() === `${prefix}invite`) {
      message.reply(
        `You can invite me using the following link: ` +
        `https://discordapp.com/oauth2/authorize?client_id=` +
        helium.user.id +
        `&permissions=0&scope=bot`
      );
    }

    if (message.content.toLowerCase() === `${prefix}developers`) {
      message.reply(`My devs/developers are: Koneko#2470, selectthegang#0148`);
    }

    if (message.content.toLowerCase() === `${prefix}devs`) {
      message.reply(`My devs/developers are: Koneko#2470, selectthegang#0148`);
    }

    if (message.content.toLowerCase() === `${prefix}dev`) {
      message.reply(`My devs/developers are: Koneko#2470, selectthegang#0148`);
    }

    if (message.content.toLowerCase() === `${prefix}big brain`) {
      let params = {
        min: 0,
        max: 100,
        integer: true
      };
      let randomcolor = random(params);
      message.channel.send(`${randomcolor}% brain`);
    }

    if (message.content.toLowerCase() === `${prefix}ping`) {
      let embed = new MessageEmbed()
        .setTitle(`Pong 🏓`)
        .setColor('RANDOM')
        .addField(
          `Latency:`,
          `${Date.now() - message.createdTimestamp}ms`,
          true
        )
        .addField(`API Latency:`, `${Math.round(helium.ws.ping)}ms`, true);
      message.channel.send(embed);
    }
    if (message.content.toLowerCase() === `${prefix}server`) {
      message.reply(`Please join my support server: ${support_server_link}`);
    }
    if (message.content.toLowerCase().startsWith(`${prefix}8ball`)) {
      const eightball = require('8ball')();
      try {
        let question = message.content
          .split(' ')
          .slice(1)
          .join(' ');
        if (!question)
          return message.channel.send(
            'Please provide a question for the 8ball.'
          );
        message.channel.send(`**:8ball: | ${eightball}**`);
      } catch (error) {
        console.error(error);
        message.channel.send(
          `There was an issue reaching to the beyond.  Please try again later.`
        );
      }
    }
    if (message.content.toLowerCase().startsWith(`${prefix}ascii`)) {
      try {
        let text = message.content
          .split(' ')
          .slice(1)
          .join(' ');
        if (!text) {
          message.channel.send('Please provide text to transform.');
        }
        if (!text) return;
        figlet(text.toString(), function (err, data) {
          message.channel.send('```' + data + '```');
        });
      } catch (error) {
        message.channel.send(
          'Something went wrong.  The error is most likely the output being over 2000 characters.  Please shorten your input and try again.'
        );
      }
    }

    if (message.content.toLowerCase().startsWith(`${prefix}say`)) {
      let text = message.content
        .split(' ')
        .slice(1)
        .join(' ');
      if (message.author.bot) return;
      if (message.content.includes('<@&') || message.content.includes('<@'))
        return message.reply('You cant ping roles or users.');
      if (!text)
        return message.channel.send({
          embed: {
            color: randomcolor,
            author: {
              name: helium.user.username,
              icon_url: helium.user.avatarURL()
            },
            title: 'ERROR',
            description:
              'This embed was posted because an error was triggered with the bot.',
            fields: [
              {
                name: 'Say',
                value:
                  'The bot cannot send an empty message!  Please type ' +
                  '`' +
                  prefix +
                  'say [what you want the bot to say]` in the future so this error does not occur again.'
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url:
                'https://images-ext-1.discordapp.net/external/lDqJXP6mNPKBLBarcyYTtCK6zpLnjfymfnIFKPBd9VA/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/563186108712878090/fac5390d5f299d71d2f694695605fc9c.png?width=990&height=990',
              text: `code by Aerex Bots`
            }
          }
        });
      message.channel.send(text);
    }
    if (message.content.toLowerCase().startsWith(`${prefix}avatar`)) {
      if (message.author.bot) return;
      if (message.channel.type == 'dm') return;
      const user = message.mentions.users.first() || message.author;
      let color = (((1 << 24) * Math.random()) | 0).toString(16);
      const avatarEmbed = new MessageEmbed()
        .setColor(`${color}`)
        .setTitle(`${user.username}`)
        .setImage(user.avatarURL())
        .setFooter(
          'code by Aerex Bots',
          'https://images-ext-1.discordapp.net/external/lDqJXP6mNPKBLBarcyYTtCK6zpLnjfymfnIFKPBd9VA/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/563186108712878090/fac5390d5f299d71d2f694695605fc9c.png?width=990&height=990'
        )
        .setTimestamp();
      message.channel.send(avatarEmbed);
    }
    if (message.content.toLowerCase() === `${prefix}myinfo`) {
      if (message.author.bot) return;
      if (message.channel.type == 'dm') return;
      message.channel.send(
        `**Username:** ${message.author.username}\n\n**User ID:** ${
        message.author.id
        }\n\n**Avatar and Avatar URL:** ${message.author.avatarURL()}`
      );
    }
    if (message.content.toLowerCase() === `${prefix}serverinfo`) {
      if (message.channel.type == 'dm') return;
      message.channel.send({
        embed: {
          color: 3447003,
          author: {},
          title: 'SERVER INFORMATION',
          description: "Your server's information",
          fields: [
            {
              name: 'Server Name',
              value: `${message.guild.name}`
            },
            {
              name: 'Server ID',
              value: `${message.guild.id}`
            },
            {
              name: 'Total User Count',
              value: `${message.guild.memberCount}`
            },
            {
              name: 'Server Region',
              value: `${message.guild.region}`
            },
            {
              name: 'Server Creation Date',
              value: `${message.guild.createdAt}`
            },
            {
              name: 'Name of Channel Command was Used In',
              value: `${message.channel.name}`
            },
            {
              name: 'Command Channel ID',
              value: `${message.channel.id}`
            }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: `https://images-ext-1.discordapp.net/external/lDqJXP6mNPKBLBarcyYTtCK6zpLnjfymfnIFKPBd9VA/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/563186108712878090/fac5390d5f299d71d2f694695605fc9c.png?width=990&height=990`,
            text: `code by Aerex Bots`
          }
        }
      });
    }
    if (message.content.toLowerCase().startsWith(`${prefix}calculate`)) {
      if (message.author.bot) return;
      try {
        let math = message.content
          .split(' ')
          .slice(1)
          .join(' ');
        if (!math)
          return message.channel.send(
            'Please input some arguments to evaluate!'
          );
        let mathdone = evaluate(`${math}`);
        message.channel.send(mathdone);
      } catch (error) {
        message.channel.send(
          'There was an error with your input: ' +
          '`' +
          math +
          '`. ' +
          'Please make sure that your variables were typed in correctly.\n\nNote: variables such as `!` may not work.'
        );
      }
    }

    if (message.content.toLowerCase().startsWith(`${prefix}ban`)) {
      try {
        if (message.channel.type == 'dm') return;
        if (!message.member.hasPermission('BAN_MEMBERS')) {
          message.channel.send(
            "Looks like you are missing the ban members permission.  You can't ban."
          );
        }
        if (!message.member.hasPermission('BAN_MEMBERS')) return;
        var reason = message.content
          .split(' ')
          .slice(2)
          .join(' ');
        if (!reason)
          return message.channel.send(`Please provide a ban reason!`);
        if (message.member.hasPermission('BAN_MEMBERS')) {
          var member = message.mentions.members.first();
          if (message.member.roles.highest == member.roles.highest) {
            message.channel.send(`No banning people with your roles!`);
          }
          if (
            message.member.roles.highest.position <
            member.roles.highest.position
          ) {
            message.channel.send(
              `No banning people with higher roles than you!`
            );
          }
          if (message.member.roles.highest == member.roles.highest) return;
          if (
            message.member.roles.highest.position <
            member.roles.highest.position
          )
            return;

          member
            .ban(`Ban for the following reason: ${reason}`)
            .then(member => {
              message.channel.send(`You have successfully banned ${member}!`);
            })
            .catch(() => {
              message.channel.send('I need Ban Permissions');
            });
        }
      } catch (error) {
        console.error(error.stack);
        message.channel.send('Error detected!');
      }
    }
    if (message.content.toLowerCase().startsWith(`${prefix}kick`)) {
      try {
        if (message.channel.type == 'dm') return;
        if (!message.member.hasPermission('KICK_MEMBERS')) {
          message.channel.send('You need kick permissions to kick people!');
        }
        if (!message.member.hasPermission('KICK_MEMBERS')) return;
        var reason = message.content
          .split(' ')
          .slice(2)
          .join(' ');
        if (!reason)
          return message.channel.send(`Please provide a kick reason!`);
        if (message.member.hasPermission('KICK_MEMBERS')) {
          var member = message.mentions.members.first();
          if (message.member.roles.cache.highest == member.roles.highest) {
            message.channel.send(
              `No kicking people with the same roles as you!`
            );
          }
          if (
            message.member.roles.highest.position <
            member.roles.highest.position
          ) {
            message.channel.send(
              `No kicking people with higher roles than you!`
            );
          }
          if (message.member.roles.highest == member.roles.highest) return;
          if (
            message.member.roles.highest.position <
            member.roles.highest.position
          )
            return;
          member
            .kick(`Kicked for the following reason: ${reason}.`)
            .then(member => {
              message.channel.send(`Kick for the following reason: ${reason}`);
            })
            .catch(() => {
              message.channel.send('I need Kick Permissions');
            });
        }
      } catch (error) {
        console.error(error);
        message.channel.send('Error detected!!');
      }
    }
  } catch (error) {
    var input = message.content
      .split(' ')
      .slice(0)
      .join(' ');
    const errorembed = new MessageEmbed()
      .setTitle(`**An Error Has Occured**`)
      .addField(`**Input:**`, '```' + input + '```')
      .addField(`**Error:**`, '```JS\n' + error + '```')
      .setColor('RANDOM')
      .setTimestamp()
      .setFooter(
        'code by Aerex Bots',
        'https://images-ext-1.discordapp.net/external/lDqJXP6mNPKBLBarcyYTtCK6zpLnjfymfnIFKPBd9VA/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/563186108712878090/fac5390d5f299d71d2f694695605fc9c.png?width=990&height=990'
      );
    if (error_channel_id) {
      helium.channels.cache.get(error_channel_id).send(errorembed);
    }
    if (!error_channel_id) {
      message.channel.send(errorembed);
    }
  }
});

helium.on('message', async message => {
  if (message.content.toLowerCase().startsWith(`${prefix}mute`)) {
    try {
      if (message.channel.type == 'dm') return;
      message.guild.roles.cache.find(r => r.name === 'Muted');
      let member = message.mentions.members.first();
      if (!message.mentions.members.first()) return;

      if (!message.member.hasPermission('MANAGE_ROLES')) {
        message.channel.send('You lack permission to mute users.');
      }
      if (!message.member.hasPermission('MANAGE_ROLES')) return;
      var reason = message.content
        .split(' ')
        .slice(2)
        .join(' ');
      if (!reason)
        return message.channel.send(
          `Please provide a person to mute and/or a mute reason!`
        );
      if (message.member.hasPermission('MANAGE_ROLES')) {
        let role = message.guild.roles.cache.find(r => r.name === 'Muted');
        member.roles
          .add(
            role,
            `Mute performed by ${message.author.tag}, ${
            message.author.id
            } for the following reason: ${reason}`
          )

          .then(memberAdded => {
            // Optional
            let color = (((1 << 24) * Math.random()) | 0).toString(16);
            message.channel.send(`${member} was successfuly muted.`);
          })
          .catch(error => {
            console.error(error);
            message.channel.send(
              "There has been an error because of one or more of the following issues:\n\n1. A role named `Muted` must exist.  If not, then create a role named `Muted` with your desired permissions and place it underneath the bot's default role.\n2. The Muted role must be placed **underneath** the bot's default or highest role.\n3. Please make sure the bot has the permission to manage roles."
            );
          });
      }
    } catch (error) {
      console.error(error);
    }
  }
});

//real server unmute
helium.on('message', async message => {
  if (message.content.toLowerCase().startsWith(`${prefix}unmute`)) {
    try {
      if (message.channel.type == 'dm') return;
      let role = message.guild.roles.cache.find(r => r.name === 'Muted');
      let member = message.mentions.members.first();
      if (!message.mentions.members.first()) return;

      if (!message.member.hasPermission('MANAGE_ROLES')) {
        message.channel.send('You lack permission to unmute users.');
      }
      if (!message.member.hasPermission('MANAGE_ROLES')) return;
      var reason = message.content
        .split(' ')
        .slice(2)
        .join(' ');
      if (!reason)
        return message.channel.send(
          `Please provide a person to unmute and/or an unmute reason!`
        );
      if (message.member.hasPermission('MANAGE_ROLES')) {
        member.roles
          .remove(
            role,
            `Unmute performed by ${message.author.tag} (${
            message.author.id
            }) for the following reason: ${reason}`
          )

          .then(memberAdded => {
            message.channel.send(`${member} successfuly unmuted.`);
          })
          .catch(error => {
            console.error(error);
            message.channel.send(
              'Unfortunately, there has been an error at this time.  Please try again later and contact the bot developers by joining the support server.'
            );
          });
      }
    } catch (error) {
      console.error(error);
    }
  }
});

helium.on('message', async message => {
  if (message.content.toLowerCase().startsWith(`${prefix}eval`)) {
    let lang = message.content.split(' ').slice(1)[0];
    let code = message.content
      .split(' ')
      .slice(2)
      .join(' ');

    if (!lang) {
      return message.channel.send(`please input the language to eval!`);
    }
    if (!code) {
      return message.channel.send(`Please input some code to eval!`);
    } else {
      ev.eval(lang, code).then(data => {
        let language =
          data.language.substring(0, 1).toUpperCase() + data.language.slice(1);
        let response = new MessageEmbed()
          .setTitle(`Eval Results:`)
          .setColor('RANDOM')
          .addField(`Language:`, language, true)
          .addField(`Returned:`, data.output, true);
        message.channel.send(response);
      });
    }
  }
});

helium.on('message', message => {
  if (message.content.toLowerCase() === `${prefix}restart`) {
    if (message.author.id !== '550170362248429568') {
      return message.channel.send('Not allowed!');
    }
    message.channel
      .send('Restarting...')
      .then(msg => helium.destroy())
      .then(() => helium.login(token));
  }
});

helium.on('message', message => {
  if (message.content.toLowerCase() === `${prefix}shutdown`) {
    if (message.author.id !== '550170362248429568') {
      return message.channel.send('Not allowed!');
    }
    message.channel.send('Shuting down...').then(msg => helium.destroy());
  }
});

helium.login(token);

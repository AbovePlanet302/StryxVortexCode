import { Command, Flag } from 'discord-akairo';
import { MessageEmbed, Message } from 'discord.js';
import StryxClient from '../../../src/client';

class InterviewBaseCommand extends Command {
  constructor() {
    super('interviewBase', {
      category: 'bot',
      cooldown: 5000,
      aliases: ['interview', 'interviews', 'createinterview'],
    });
  }

  * args(): unknown {
    const method = yield {
      type: [
        // ['module-id', 'subcommand']
        ['create-interview', 'create'],
        ['conclude-interview', 'conclude'],
        ['slock-interview', 'slock', 'lock'],
      ],
      otherwise: (msg: Message) => {
        const { guild } = this.client as StryxClient;

        const embed = new MessageEmbed();

        embed.setTimestamp();
        embed.setTitle('Invalid Subcommand');
        embed.setDescription(`Check \`${guild?.settings.prefix}help sessions\` for more information.`);
        embed.setColor(guild?.settings.constants.colors.error as string);
        embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);

        msg.channel.send(embed);
      },
    };

    return Flag.continue(method);
  }

  async exec(msg: Message) {
    msg.reply('yup');
  }
}

module.exports = InterviewBaseCommand;

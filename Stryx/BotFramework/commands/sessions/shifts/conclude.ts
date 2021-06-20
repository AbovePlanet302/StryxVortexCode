import { Command } from 'discord-akairo';
import {
  Message,
  MessageEmbed,
} from 'discord.js';
import StryxClient from '../../../src/client';

class ConcludeShiftCommand extends Command {
  constructor() {
    super('conclude-shift', {
      category: 'bot',
      cooldown: 5000,
    });
  }

  async exec(msg: Message) {
    // eslint-disable-next-line prefer-const
    let { guild, sessions } = this.client as StryxClient;

    if (sessions.some((session) => session.type === 'shift')) {
      const activeSession = sessions.find((session) => session.type === 'shift');

      const concludedEmbed = new MessageEmbed();

      concludedEmbed.setTitle('Shift Concluded!');
      concludedEmbed.setColor(guild?.settings.constants.colors.success as string);
      concludedEmbed.setTimestamp();

      activeSession?.message.edit(concludedEmbed);

      sessions = sessions.filter((session) => session.type !== 'shift');

      const embed = new MessageEmbed();

      embed.setTitle('Concluded Shift!');
      embed.setColor(guild?.settings.constants.colors.success as string);
      embed.setAuthor(msg.author.username, msg.author.avatarURL() as string);
      embed.setTimestamp();

      msg.channel.send(embed);
    }
  }
}

module.exports = ConcludeShiftCommand;

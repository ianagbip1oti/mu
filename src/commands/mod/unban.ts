import { Message } from 'discord.js';
import * as minimist from 'minimist';

import { Command } from '../../command';
import { userIDFromString } from '../../utils/user';

const usage = `
Usage: unban [options] { user_id | user_mention }

Unban users from the server.

Options:
  -r, --reason string  Message to add to audit log.

Example:
  unban --reason "stopped saying 'hewwo'" 123456789987654321
`;

/** Main entry point for unban command. */
async function run(message: Message, ...args: string[]): Promise<void> {
  const argv = minimist(args, {
    alias: { r: 'reason' },
    default: { reason: 'last fucken chance bro' },
    string: ['reason', 'r', '_'],
  });

  const reason =
    typeof argv.r === 'string' ? argv.r : (argv.r as string[]).pop();
  const users = argv._;

  if (!reason) {
    const reply = 'error: `reason` option missing required argument';
    await message.channel.send(reply);
    return;
  } else if (!users.length) {
    await message.channel.send('error: no user specified');
    return;
  }
  for (const user of users) {
    await message.guild.unban(userIDFromString(user), reason);
  }
}

/** Unbans a user from the server. */
const unban: Command = { name: 'unban', allowedRole: 'Moderator', usage, run };

export default unban;

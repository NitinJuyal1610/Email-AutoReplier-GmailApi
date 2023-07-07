import { getGmailService } from '../utils/getGmail.js';
import { setLabel } from './labelService.js';
// reply threads
export const replyThreads = async (threads) => {
  try {
    if (threads.length == 0) {
      console.log('No Threads to Reply');
      return;
    }
    threads.forEach(async (thread) => {
      await sendMail(thread);
      await setLabel(thread);
    });
    console.log('All threads replied');
  } catch (error) {
    throw new Error('replyThreads: ' + error);
  }
};

/**
 * Sends an email to the user over a thread.
 * @param {Object} thread - The thread object.
 * @throws {Error} If something goes wrong while sending the email.
 */
const sendMail = async (thread) => {
  try {
    const gmail = await getGmailService();

    // Get thread data
    const threadResponse = await gmail.users.threads.get({
      userId: 'me',
      id: thread.id,
    });

    // Extract "To" email from thread
    const toEmail = threadResponse.data.messages[0].payload.headers.find(
      (h) => h.name === 'To',
    ).value;

    // Compose email message
    const message = 'Hi I am on Vacations';
    const rawBody = Buffer.from(
      `To: ${toEmail}\n` +
        `Subject: Re: Response\n` +
        `In-Reply-To: ${thread.id}\n` +
        `\n` +
        `${message}`,
    )
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    // Send email
    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: rawBody,
        threadId: thread.id,
      },
    });
  } catch (error) {
    throw new Error('Sending Email Failed');
  }
};

// Get the threads from Gmail
export const getThreads = async () => {
  try {
    const gmail = await getGmailService();
    const threads = await gmail.users.threads.list({
      userId: 'me',
      q: '-has:userlabels -from:me',
    });

    if (!threads.data.threads) return [];
    return threads.data.threads;
  } catch (error) {
    throw new Error('Getting the Threads Failed');
  }
};

import { getGmailService } from '../utils/getGmail.js';

// Create a new label
const createNewLabel = async () => {
  try {
    const gmail = await getGmailService();
    await gmail.users.labels.create({
      userId: 'me',
      requestBody: {
        name: 'Vacations',
      },
    });

    const response = await gmail.users.labels.list({
      userId: 'me',
    });
    const labels = response.data.labels;
    return labels.filter((label) => label.type === 'user');
  } catch (error) {
    console.log(error);
    throw new Error('Creating the Label Failed');
  }
};

// Set a label if it exists, otherwise create a new one
export const setLabel = async (thread) => {
  try {
    const gmail = await getGmailService();

    const response = await gmail.users.labels.list({
      userId: 'me',
    });

    const labels = response.data.labels;

    let userLabels = labels.filter((label) => label.type === 'user');

    // If no user labels exist, create a new one
    if (userLabels.length == 0) {
      console.log('creating a label');
      userLabels = await createNewLabel();
    }

    console.log(userLabels, '-0-');

    await gmail.users.threads.modify({
      id: thread.id,
      userId: 'me',
      requestBody: {
        addLabelIds: userLabels[0].id,
      },
    });

    console.log('Setting the Label Successfull');
  } catch (error) {
    throw new Error('Setting the Label Failed');
  }
};

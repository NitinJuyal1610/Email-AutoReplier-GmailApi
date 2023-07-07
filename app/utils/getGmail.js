import { google } from 'googleapis';
import authorize from './authenticate.js';

// get Gmail Service
export const getGmailService = async () => {
  try {
    const auth = await authorize();
    const gmail = google.gmail({ version: 'v1', auth });
    return gmail;
  } catch (err) {
    console.log(err);
  }
};

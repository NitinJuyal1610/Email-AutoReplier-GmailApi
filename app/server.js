import express from 'express';
import { getThreads, replyThreads } from './services/mailService.js';

const app = express();

// Function to run periodically
const automatedMailingService = async () => {
  try {
    console.log(
      '---------------------fetching and replying -------------------------',
    );
    const threads = await getThreads();
    await replyThreads(threads);
  } catch (error) {
    console.error('Error while getting/replying threads:', error);
  }
};

// Function to start periodic execution
const startPeriodicExecution = () => {
  // Run function immediately
  automatedMailingService();
  // Set the interval to run the function every 45-120 seconds
  setInterval(
    automatedMailingService,
    Math.random() * (120000 - 45000) + 45000,
  );
};

// Start the periodic execution
startPeriodicExecution();

app.listen(3000, () => {
  console.log('Server Running!');
});

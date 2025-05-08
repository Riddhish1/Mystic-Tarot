/**
 * This script installs the necessary packages for the Luna chatbot
 * and creates the necessary files in the src/chatbot directory.
 */

const fs = require('fs');
const { exec } = require('child_process');

// Check if we're running on Windows or not
const isWindows = process.platform === 'win32';
const installCmd = isWindows 
  ? 'npm install react-chatbot-kit --save'
  : 'npm install react-chatbot-kit --save';

console.log('Setting up Luna chatbot...');
console.log('Installing react-chatbot-kit package...');

// Execute the install command
exec(installCmd, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error installing packages: ${error.message}`);
    console.log('\nAttempting to use the SimpleChatbot fallback instead...');
    
    // Ensure the src/chatbot directory exists
    if (!fs.existsSync('./src/chatbot')) {
      fs.mkdirSync('./src/chatbot', { recursive: true });
      console.log('Created src/chatbot directory');
    }
    
    console.log('Setup complete. The app will use the SimpleChatbot fallback.');
    return;
  }
  
  console.log(stdout);
  console.log('Packages installed successfully!');
  console.log('Setup complete. The app will use the react-chatbot-kit implementation.');
}); 
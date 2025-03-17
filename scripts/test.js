/**
 * Test script for Discord Trigger node
 * 
 * This script simulates a Discord message event to test the trigger functionality
 * without needing to connect to Discord.
 * 
 * Usage:
 * node scripts/test.js
 */

const { Client, Events, GatewayIntentBits } = require('discord.js');
const { EventEmitter } = require('events');

// Mock Discord client
class MockDiscordClient extends EventEmitter {
  constructor() {
    super();
    console.log('Mock Discord client initialized');
  }

  login() {
    console.log('Mock login successful');
    return Promise.resolve('mock-token');
  }

  destroy() {
    console.log('Mock client destroyed');
  }
}

// Create a mock message
const createMockMessage = (content, isBot = true, channelId = '123456789', botId = '987654321') => {
  return {
    id: `msg-${Date.now()}`,
    content,
    author: {
      id: botId,
      username: 'TestBot',
      bot: isBot,
    },
    channelId,
    guildId: '111222333',
    createdTimestamp: Date.now(),
    attachments: {
      values: () => [],
    },
  };
};

// Test the trigger
const testTrigger = async () => {
  console.log('Testing Discord Trigger node...');
  
  // Create mock client
  const client = new MockDiscordClient();
  
  // Set up event handler
  client.on(Events.MessageCreate, (message) => {
    console.log(`Message received: ${message.content}`);
    console.log('Message details:', JSON.stringify(message, null, 2));
  });
  
  // Simulate login
  await client.login();
  
  // Simulate a message after 1 second
  setTimeout(() => {
    console.log('Simulating a message...');
    const mockMessage = createMockMessage('Hello from test script!');
    client.emit(Events.MessageCreate, mockMessage);
  }, 1000);
  
  // Cleanup after 3 seconds
  setTimeout(() => {
    client.destroy();
    console.log('Test completed');
  }, 3000);
};

// Run the test
testTrigger().catch(error => {
  console.error('Test failed:', error);
}); 
# Discord Trigger Node Usage Guide

This guide explains how to configure and use the Discord Trigger node for n8n.

## Prerequisites

1. A Discord account
2. A Discord server where you have administrator permissions
3. A running n8n instance

## Setting up a Discord Application

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give your application a name
3. In the "Bot" section, click "Add Bot"
4. Under "Privileged Gateway Intents", enable the following options:
   - SERVER MEMBERS INTENT
   - MESSAGE CONTENT INTENT
5. In the "OAuth2" section, add a redirect URL that points to your n8n instance:
   - `https://your-n8n-instance.com/rest/oauth2-credential/callback`
6. Note the following information:
   - Client ID (in the "OAuth2" section)
   - Client Secret (in the "OAuth2" section)
   - Token (in the "Bot" section)

## Inviting the Bot to Your Server

1. In the "OAuth2" > "URL Generator" section, select the following scopes:
   - `bot`
   - `applications.commands`
2. In the bot permissions, select at minimum:
   - Read Messages/View Channels
   - Send Messages
   - Read Message History
3. Copy the generated URL and open it in your browser
4. Select the server where you want to add the bot and confirm

## Configuration in n8n

1. Install the Discord Trigger node in your n8n instance
2. Create a new workflow
3. Add a "Discord Trigger" node
4. Create new OAuth2 credentials:
   - Name: Discord OAuth2
   - Client ID: [Your Discord Client ID]
   - Client Secret: [Your Discord Client Secret]
   - Scope: `bot identify`
   - Auth URI Query Parameters: `response_type=code`
   - Authentication: Body
5. Click "Connect" and follow the authentication process
6. Configure the Discord Trigger node:
   - Event: Message Created
   - Channel ID: [Discord channel ID to monitor]
   - Only Messages from Bot: Enable this option if you want to only listen to messages from bots
   - Bot ID: [ID of the bot to listen to] (optional)

## Getting a Discord Channel ID

1. In Discord, enable developer mode (Settings > Advanced > Developer Mode)
2. Right-click on the channel and select "Copy ID"

## Getting a Discord Bot ID

1. Enable developer mode as explained above
2. Right-click on the bot's name in the member list and select "Copy ID"

## Testing the Node

1. Activate the workflow by clicking the "Active" button in the top right
2. Send a message in the configured Discord channel
3. The workflow should trigger and you'll be able to see the message data in n8n

## Troubleshooting

- **Workflow doesn't trigger**: Check that the bot has the necessary permissions in the Discord channel
- **Authentication error**: Make sure the OAuth2 credentials are correct
- **Bot doesn't respond**: Check that the necessary intents are enabled in the Discord Developer Portal 
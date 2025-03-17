# @binodev/n8n-nodes-discord-trigger

This is an n8n community node that provides a trigger for Discord messages using OAuth2 authentication. It allows you to securely listen for new messages from Discord bots in specific channels and trigger n8n workflows based on these messages.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Features

- OAuth2 authentication with Discord
- Listen for new messages in specific Discord channels
- Filter messages by bot (optional)
- Extract message content, author information, and attachments
- Trigger n8n workflows based on Discord messages

## Installation

### npm
```bash
npm install @binodev/n8n-nodes-discord-trigger
```

### n8n
In your n8n installation:
1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `@binodev/n8n-nodes-discord-trigger` in **Enter npm package name**
4. Agree to the risks of using community nodes
5. Select **Install**

## Setup

### Discord Application Setup

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Set up a bot for your application
4. Enable the necessary intents (SERVER MEMBERS INTENT, MESSAGE CONTENT INTENT)
5. Configure OAuth2 with the appropriate redirect URL
6. Invite the bot to your server

For detailed instructions, see the [usage guide](docs/usage.md).

## Node Configuration

### Discord Trigger

This node triggers a workflow when a new message is received in a specified Discord channel from a bot.

#### Configuration Options:

- **Event**: The event to listen for (currently only "Message Created" is supported)
- **Channel ID**: The ID of the Discord channel to monitor
- **Only Messages from Bot**: Whether to only trigger on messages from bots
- **Bot ID**: (Optional) The specific bot ID to listen for

## Credentials

### Discord OAuth2 API

To use this node, you need to set up Discord OAuth2 credentials:

- **Client ID**: Your Discord application's client ID
- **Client Secret**: Your Discord application's client secret
- **Scope**: `bot identify`
- **Auth URI Query Parameters**: `response_type=code`
- **Authentication**: Body

## Development

### Build

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

### Test

```bash
# Run the test script
node scripts/test.js
```

### Lint

```bash
# Lint the code
npm run lint
```

### Format

```bash
# Format the code
npm run format
```

## Examples

Check the [examples](examples/) directory for sample workflows.

## Compatibility

This node has been developed and tested with n8n version 0.148.0

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Discord Developer Documentation](https://discord.com/developers/docs)

## License

[MIT](LICENSE) 
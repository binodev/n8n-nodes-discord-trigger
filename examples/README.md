# Discord Trigger Node Examples

This directory contains example workflows for the Discord Trigger node.

## Workflow Example

The `workflow.json` file contains a simple example workflow that:

1. Listens for new messages in a specified Discord channel
2. Extracts the message content, author, and timestamp
3. Can be imported directly into n8n

## How to Import

1. In your n8n instance, go to **Workflows**
2. Click on the **Import from File** button
3. Select the `workflow.json` file
4. Update the Discord Trigger node with your channel ID and bot ID
5. Set up the Discord OAuth2 credentials
6. Activate the workflow

## Additional Configuration

Make sure to:

1. Replace `YOUR_CHANNEL_ID` with your actual Discord channel ID
2. Replace `YOUR_BOT_ID` with your Discord bot ID (if you want to listen to a specific bot)
3. Configure the OAuth2 credentials with your Discord application details

## Testing

After importing and configuring the workflow:

1. Activate it by clicking the toggle in the top-right corner
2. Send a message in the configured Discord channel
3. The workflow should trigger and process the message data 
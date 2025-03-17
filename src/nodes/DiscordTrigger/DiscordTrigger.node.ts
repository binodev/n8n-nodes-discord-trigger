import { Client, Events, GatewayIntentBits, Message } from 'discord.js';
import {
	INodeType,
	INodeTypeDescription,
	ITriggerFunctions,
	ITriggerResponse,
	IWebhookFunctions,
	IWebhookResponseData,
	ICredentialDataDecryptedObject,
} from 'n8n-workflow';

export class DiscordTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Discord Trigger',
		name: 'discordTrigger',
		icon: 'file:discord.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Starts the workflow when Discord events occur',
		defaults: {
			name: 'Discord Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'discordOAuth2Api',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'setup',
				httpMethod: 'GET',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				options: [
					{
						name: 'Message Created',
						value: 'messageCreated',
						description: 'Triggered when a message is created',
					},
				],
				default: 'messageCreated',
				required: true,
			},
			{
				displayName: 'Channel ID',
				name: 'channelId',
				type: 'string',
				default: '',
				required: true,
				displayOptions: {
					show: {
						event: ['messageCreated'],
					},
				},
				description: 'The ID of the channel to listen to',
			},
			{
				displayName: 'Only Messages from Bot',
				name: 'onlyBot',
				type: 'boolean',
				default: true,
				displayOptions: {
					show: {
						event: ['messageCreated'],
					},
				},
				description: 'Whether to trigger only on messages from bots',
			},
			{
				displayName: 'Bot ID',
				name: 'botId',
				type: 'string',
				default: '',
				displayOptions: {
					show: {
						event: ['messageCreated'],
						onlyBot: [true],
					},
				},
				description: 'The ID of the bot to listen to (leave empty to listen to any bot)',
			},
		],
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const webhookName = this.getWebhookName();

		if (webhookName === 'setup') {
			// This webhook is just for setup and doesn't actually do anything
			return {
				webhookResponse: 'Discord Trigger setup successful!',
			};
		}

		return {
			webhookResponse: 'Unknown webhook',
		};
	}

	async trigger(this: ITriggerFunctions): Promise<ITriggerResponse> {
		const credentials = await this.getCredentials('discordOAuth2Api');
		const event = this.getNodeParameter('event') as string;
		const channelId = this.getNodeParameter('channelId') as string;
		const onlyBot = this.getNodeParameter('onlyBot') as boolean;
		const botId = this.getNodeParameter('botId', '') as string;

		// Initialize Discord client
		const client = new Client({
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.MessageContent,
			],
		});

		// Function to handle message events
		const messageHandler = async (message: Message) => {
			// Check if message is from the specified channel
			if (message.channelId !== channelId) {
				return;
			}

			// Check if we should only process bot messages
			if (onlyBot && !message.author.bot) {
				return;
			}

			// Check if we should only process messages from a specific bot
			if (onlyBot && botId && message.author.id !== botId) {
				return;
			}

			// Prepare the data to return
			const returnData = {
				messageId: message.id,
				content: message.content,
				author: {
					id: message.author.id,
					username: message.author.username,
					bot: message.author.bot,
				},
				channelId: message.channelId,
				guildId: message.guildId,
				createdTimestamp: message.createdTimestamp,
				attachments: [...message.attachments.values()].map((attachment) => ({
					id: attachment.id,
					url: attachment.url,
					name: attachment.name,
					contentType: attachment.contentType,
					size: attachment.size,
				})),
			};

			// Emit the data to trigger the workflow
			this.emit([this.helpers.returnJsonArray([returnData])]);
		};

		// Set up event listeners based on the selected event
		if (event === 'messageCreated') {
			client.on(Events.MessageCreate, messageHandler);
		}

		// Login to Discord with the token
		await client.login(credentials.access_token as string);

		// The "manualTriggerFunction" is a placeholder that will be called when
		// the workflow with this trigger should be deactivated
		const manualTriggerFunction = async () => {
			// Destroy the Discord client when the workflow is deactivated
			client.destroy();
		};

		return {
			manualTriggerFunction,
		};
	}
} 
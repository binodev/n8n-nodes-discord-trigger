import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { DiscordTrigger } from './nodes/DiscordTrigger/DiscordTrigger.node';
import { DiscordOAuth2Api } from './credentials/DiscordOAuth2Api.credentials';

export class DiscordTriggerNode implements INodeType {
	description: INodeTypeDescription = {
		...new DiscordTrigger().description,
	};
}

export const nodeTypes = [
	{
		[DiscordTriggerNode.prototype.description.name]: DiscordTriggerNode,
	},
];

export const credentialTypes = [
	{
		[DiscordOAuth2Api.prototype.name]: DiscordOAuth2Api,
	},
]; 
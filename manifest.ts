import { Manifest } from 'deno-slack-sdk/mod.ts';
import { Workflow } from './src/workflow.ts';

export default Manifest({
  name: 'gpt',
  description: 'GPT Chat Bot',
  icon: 'assets/icon.png',
  workflows: [ Workflow ],
  outgoingDomains: [
    'api.openai.com'
  ],
  botScopes: [
    'app_mentions:read',
    'chat:write',
    'chat:write.public'
  ],
});

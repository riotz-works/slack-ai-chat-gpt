import { Trigger } from 'deno-slack-api/types.ts';
import { CHANNEL_ID } from '../../env.ts';
import { Workflow } from '../workflow.ts';

const trigger: Trigger<typeof Workflow.definition> = {
  type: 'event',
  event: {
    event_type: 'slack#/events/app_mentioned',
    channel_ids: [ CHANNEL_ID ]
  },
  name: 'Mention trigger',
  workflow: '#/workflows/gpt',
  'inputs': {
    'channelId': { value: '{{data.channel_id}}' },
    'text': { value: '{{data.text}}' }
  }
};

export default trigger;

import { DefineWorkflow, Schema } from 'deno-slack-sdk/mod.ts';
import { GptFunction } from './functions/gpt.ts';

export const Workflow = DefineWorkflow({
  callback_id: 'gpt',
  title: 'GPT Chat Workflow',
  input_parameters: {
    properties: {
      channelId: { type: Schema.slack.types.channel_id },
      text: { type: Schema.types.string }
    },
    required: [ 'channelId', 'text' ]
  },
});

const gpt = Workflow.addStep(GptFunction, {
  text: Workflow.inputs.text
});

Workflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: Workflow.inputs.channelId,
  message: gpt.outputs.reply
});

export default Workflow;

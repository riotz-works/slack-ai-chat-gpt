import { DefineFunction, Schema, SlackFunction } from 'deno-slack-sdk/mod.ts';
import { GPT_API_KEY } from '../../env.ts';

export const GptFunction = DefineFunction({
  callback_id: 'gpt-function',
  title: 'GPT Chat',
  source_file: 'src/functions/gpt.ts',
  input_parameters: {
    properties: {
      text: { type: Schema.types.string }
    },
    required: [ 'text' ]
  },
  output_parameters: {
    properties: {
      reply: { type: Schema.types.string }
    },
    required: [ 'reply' ]
  },
});

export default SlackFunction(GptFunction, async ({ inputs }) => {
  const text = inputs.text.replace(/<@.+?>/, '').trim();
  const response = await fetchCompletions(text);
  const reply = response.choices[0].text ?? JSON.stringify(response, null, 2);
  return {
    outputs: {
      reply
    }
  };
});


const fetchCompletions = async (text: string) => {
  const url = 'https://api.openai.com/v1/completions';
  const config = {
    // https://beta.openai.com/docs/api-reference/completions/create
    model: 'text-davinci-003',
    prompt: text,
    max_tokens: 2048,
    temperature: 1,       // Defaults to 1, number between 0 and 1
    top_p: 1,             // Defaults to 1, number between 0 and 1
    presence_penalty: 0,  // Defaults to 0, number between -2.0 and 2.0
    frequency_penalty: 0, // Defaults to 0, number between -2.0 and 2.0
  };

  const option: RequestInit = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GPT_API_KEY}`,
    },
    body: JSON.stringify(config)
  };
  return await (await fetch(url, option)).json();
};

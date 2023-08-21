import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.NX_HUGGING_FACE_API_TOKEN);

export async function makeArt(input: string) {
  try {
    const result = await hf.textToImage({
      model: 'CompVis/stable-diffusion-v1-4',
      inputs: input,
    });
    return result;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

export async function converse(input: string) {
  try {
    const result = await hf.conversational({
      model: 'facebook/blenderbot-400M-distill',
      inputs: {
        generated_responses: [],
        past_user_inputs: [],
        text: input,
      },
    });
    return result;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

export default { makeArt, converse };

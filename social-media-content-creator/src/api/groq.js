import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: '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', dangerouslyAllowBrowser: true });

export async function getGroqChatCompletion({
  customPrompt,
  emojis,
  hashtags,
  mentions,
  numberOfWords,
  postType,
  rolesOfMentions,
  socialMediaName,
  tone
}) {
  const fullPrompt = `
This is currently 2024. Keep in mind you are an awesome content creator, and you will help draft a post or whatever i specify below, requirements, so need your help there.Just purely generate only the post. Nothing else like "Certainly here's your post-" or anything.Dont speak anything, just the post generate. Just plain content.: ${customPrompt}. 
My requirements:
- Emojis: ${emojis}
- Hashtags: ${hashtags}
- Mentions: ${mentions}
- Number of Words: ${numberOfWords}
- Post Type: ${postType}
- Roles of Mentions: ${rolesOfMentions}
- Social Media Name: ${socialMediaName}
- Tone: ${tone}
`;

  return groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: fullPrompt,
      },
    ],
    model: 'llama3-8b-8192',
    temperature: 0.7,
    max_tokens: 1024,
    top_p: 1,
    stream: false,
    stop: null,
  });
}

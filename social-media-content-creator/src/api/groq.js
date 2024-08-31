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
This is currently 2024. Keep in mind you are an awesome content creator, and you will help draft a post or whatever i specify below, requirements, so need your help there.Just purely generate only the post. Nothing else like "Certainly here's your post-" or anything. Just plain content.: ${customPrompt}. 
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

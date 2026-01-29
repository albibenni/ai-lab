import { streamText } from "ai";
import { Factuality, Levenshtein } from "autoevals";
import { evalite } from "evalite";
// import { traceAISDKModel } from "evalite/ai-sdk";

evalite("Test Capitals", {
  data: () => [
    {
      input: `What's the capital of France?`,
      expected: `Paris`,
    },
    {
      input: `What's the capital of Germany?`,
      expected: `Berlin`,
    },
  ],
  task: async (input) => {
    const result = streamText({
      model: "gpt-4o-mini",
      system: `
        Answer the question concisely. Answer in as few words as possible.
        Remove full stops from the end of the output.
        If the country has no capital, return '<country> has no capital'.
        If the country does not exist, return 'Unknown'.
      `,
      prompt: input,
    });

    return await result.text;
  },
  scorers: [Factuality, Levenshtein],
});

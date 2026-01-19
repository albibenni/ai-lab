import { cosineSimilarity, embedMany } from "ai";

async function main() {
  const { embeddings, usage } = await embedMany({
    model: "openai/text-embedding-3-small",
    values: ["sunny day at the beach", "rainy afternoon in the city"],
  });

  console.log(
    `cosine similarity: ${cosineSimilarity(embeddings[0]!, embeddings[1]!)}`,
    `token used: ${usage.tokens}`,
  );
}

void main();

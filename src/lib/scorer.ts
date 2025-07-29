import { Component } from "@/types";

export interface ScoredResult {
  item: Component;
  score: number;
  matchedTerms: string[];
}

export const scoreResults = (
  query: string,
  components: Component[]
): ScoredResult[] => {
  const queryWords = query
    .toLowerCase()
    .split(" ")
    .filter((word) => word.length > 2);
  const queryPhrase = query.toLowerCase();
  const results: ScoredResult[] = [];

  components.forEach((component) => {
    let score = 0;
    const matches: string[] = [];

    // Exact match on name
    if (component.name.toLowerCase() === queryPhrase) {
      score += 20;
      matches.push("exact match");
    }

    // Match tags (+5)
    component.tags.forEach((tag) => {
      if (queryWords.some((word) => tag.toLowerCase().includes(word))) {
        score += 5;
        matches.push(tag);
      }
    });

    // Match synonyms (+3)
    component.synonyms.forEach((syn) => {
      if (queryWords.some((word) => syn.toLowerCase().includes(word))) {
        score += 3;
        matches.push(syn);
      }
    });

    if (score > 0) {
      results.push({
        item: component,
        score,
        matchedTerms: [...new Set(matches)],
      });
    }
  });

  return results.sort((a, b) => b.score - a.score).slice(0, 9);
};

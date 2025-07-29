import { Component, Pattern } from "@/types";

export interface ScoredResult {
  item: Component | Pattern;
  score: number;
  matchedTerms: string[];
  type: "component" | "pattern";
}

export const scoreResults = (
  query: string,
  components: Component[],
  patterns: Pattern[]
): ScoredResult[] => {
  const queryWords = query.toLowerCase().split(" ");
  const results: ScoredResult[] = [];

  // Score patterns (they get bonus points)
  patterns.forEach((pattern) => {
    const { score, matches } = calculateScore(queryWords, pattern);
    if (score >= 8) {
      // Pattern threshold
      results.push({
        item: pattern,
        score: score + 4, // Pattern bonus
        matchedTerms: matches,
        type: "pattern",
      });
    }
  });

  // Score components
  components.forEach((component) => {
    const { score, matches } = calculateScore(queryWords, component);
    if (score >= 2) {
      // Component threshold
      results.push({
        item: component,
        score,
        matchedTerms: matches,
        type: "component",
      });
    }
  });

  // Sort by score (highest first)
  return results.sort((a, b) => b.score - a.score).slice(0, 10);
};

// Helper function to calculate score
const calculateScore = (queryWords: string[], item: Component | Pattern) => {
  let score = 0;
  const matches: string[] = [];

  queryWords.forEach((word) => {
    // Check tags (+3 points)
    item.tags.forEach((tag) => {
      if (tag.toLowerCase().includes(word)) {
        score += 3;
        matches.push(tag);
      }
    });

    // Check synonyms (+2 points)
    item.synonyms.forEach((synonym) => {
      if (synonym.toLowerCase().includes(word)) {
        score += 2;
        matches.push(synonym);
      }
    });

    // Check name (+1 point)
    if (item.name.toLowerCase().includes(word)) {
      score += 1;
      matches.push(item.name);
    }
  });

  return { score, matches: [...new Set(matches)] }; // Remove duplicates
};

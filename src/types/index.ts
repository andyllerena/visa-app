// src/types/index.ts
export interface Component {
  id: string;
  name: string;
  tags: string[];
  synonyms: string[];
  a11yNotes: string[];
  snippetTemplate: string;
}

export interface Pattern {
  id: string;
  name: string;
  tags: string[];
  synonyms: string[];
  components: string[];
  a11yNotes: string[];
  snippetTemplate: string;
}

export interface SearchResult {
  item: Component | Pattern;
  score: number;
  matchedTerms: string[];
  type: "component" | "pattern";
}

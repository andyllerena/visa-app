export interface Component {
  id: string;
  name: string;
  description?: string;
  tags: string[];
  synonyms: string[];
  a11yNotes: string[];
  codeExample: string;
}

export interface Pattern {
  id: string;
  name: string;
  description?: string;
  tags: string[];
  synonyms: string[];
  components: string[];
  a11yNotes: string[];
  snippetTemplate: string;
}

export interface SearchResult {
  component: Component;
  score: number;
  reasons: string[];
}

export interface PatternTemplate {
  title: string;
  description: string;
  components: string[];
  code: string;
}

export interface SuggestedSearch {
  query: string;
  description?: string;
  estimatedComponents?: number;
}

export interface FavoriteComponent extends Component {
  dateAdded: string;
}

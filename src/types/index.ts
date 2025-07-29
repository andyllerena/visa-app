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

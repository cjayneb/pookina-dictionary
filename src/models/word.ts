export default interface Word {
  id: number;
  word: string;
  pronounciation: string;
  type: string;
  definition: string;
  examples: string[];
  synonyms: string[];
  etymology: string;
}
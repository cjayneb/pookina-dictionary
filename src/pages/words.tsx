import React from 'react'
import wordsData from '../words.json' with { type: "json" }

interface Word {
  id: number;
  word: string;
  pronounciation: string;
  type: string;
  definition: string;
  examples: string[];
  synonyms: string[];
  etymology: string;
}

export default function Words() {
  const words: Word[] = wordsData

  return (
    <div>
      <h2>Words</h2>
      <ul>
        {words.map((word) => (
          <li key={word.id}>
            {word.word}
          </li>
        ))}
      </ul>
    </div>
  );
}

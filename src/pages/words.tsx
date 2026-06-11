import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import wordsData from '../words.json' with { type: "json" }
import Word from '../models/word.js'

export default function Words() {
  const words: Word[] = wordsData

  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1))

      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [location])

  return (
    <div>
      <h2>Words</h2>
      <ul>
        {words.map((word) => (
          <li key={word.id} id={word.id}>
            <h3>{word.word}</h3>
            <h4>{word.pronounciation}</h4>
            <h4>{word.definition}</h4>
            <h4>{word.examples}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
}

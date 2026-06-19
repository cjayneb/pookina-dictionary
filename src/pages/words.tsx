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
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }, [location])

  return (
    <div id="words">
      <h2>Words</h2>
      <ul className="listOfWords">
        {words.sort((a, b) => a.word.localeCompare(b.word)).map((word) => (
          <li key={word.id} id={word.id} className="word">
            <h3>{word.word} (<i>{word.pronounciation}</i>)</h3>
            <h4><i>{word.type}</i></h4>
            <h4>Definition</h4>
            <p>{word.definition}</p>
            <h4>Etymology</h4>
            <p>{word.etymology}</p>
            <h4>Examples</h4>
            <ul>
              {word.examples.map((example, i) =>(
                <li key={word.id + i}>
                  <i>"{example}"</i>
                </li>
              ))}
            </ul>
            <h4>Synonyms</h4>
            <ul>
              {word.synonyms.map((synomnym, i) =>(
                <li key={word.id + i}>
                  <i>"{synomnym}"</i>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

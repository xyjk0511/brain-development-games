# word-scramble Design Note

## Identity

- `gameId`: `word-scramble`
- Chinese name: 文字重组
- Domain: 言语
- Task family: Anagram / Word Recognition
- Remake depth: evidence-refactor

## Product Positioning

用户把打乱的字母/汉字组合还原为目标词，训练词汇检索、拼写/语义联想和语言加工。

## Mature Task Basis

- Primary paradigm: anagram solving。
- Related paradigms: lexical decision/word recognition.
- References: jsPsych text response/button response patterns, local `04-perception-language-arithmetic.md`.
- License boundary: word pools must be original or licensed; no copying proprietary language-test materials.

## Gameplay Contract

- Start state: scrambled word and optional category cue.
- User action: type or drag letters to form answer.
- Feedback: solved, hint used, or incorrect.
- End condition: fixed word count or timer.
- Result state: solved words, hints, response times.

## Trial Generation

- Stimulus pool: controlled word lists by length/frequency/category.
- Randomization: shuffle characters while avoiding unchanged scramble.
- Conditions: word length, category cue, distractor letters.
- Practice/formal separation: short easy examples.
- Difficulty parameters: `wordLength`, `frequencyBand`, `hintCount`, `timeLimitMs`.

## Scoring

- Accuracy: exact answer or accepted normalized answer.
- Error types: `wrong_word`, `partial`, `hint_used`, `timeout`.
- Composite score: solved count minus hint/time penalties.
- Adaptive rule: increase word length or remove hints after high solve rate.

## Required Data

- Session summary: solved, attempts, hintsUsed, medianRtMs.
- Trial fields: word, scrambled, responseText, correct, rtMs, hintUsed.
- Event fields: typed/dragged letter interactions.
- Adaptive fields: next word length/hint count.

## Visual / UX Direction

Use large draggable tiles or clean input, category art, and no text overflow on mobile.

## Clinical / IP Boundary

Allowed: “词汇/语言加工训练”。 Forbidden: language disorder diagnosis/treatment claims.

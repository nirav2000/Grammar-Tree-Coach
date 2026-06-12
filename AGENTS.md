# Grammar Tree Coach Agent Instructions

## Project goal
This app teaches grammar to children aged 9–12 using a hierarchy:
letters → words → phrases → clauses → sentences → paragraphs → texts.

## Non-negotiable rule
Never create generic placeholder learning-card content.

Banned phrases:
- "is a grammar idea that helps words do a clear job"
- "This topic fits into the grammar tree"
- "Look at nearby words"
- "Do not memorise the label without checking its job"

## Learning-card schema
Every learning card must include:
- id
- title
- category
- simpleMeaning
- formalMeaning
- whyItMatters
- examples
- nonExamples
- howToSpot
- commonMistakes
- miniQuiz
- teacherPrompt
- ageLevel
- status

## Agent roles

### Grammar Content Writer
Creates specific, child-friendly, accurate cards.

### Grammar Accuracy Reviewer
Checks every card for:
- accuracy
- age suitability
- specific examples
- useful non-examples
- clear spotting rules
- absence of banned generic phrases

### App Integrator
Updates app files only after cards pass review.

## Versioning
Every meaningful change must update:
- app version
- VERSION_HISTORY.md
- README.md if behaviour changes

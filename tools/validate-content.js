const fs = require('fs');
const vm = require('vm');

const source = `${fs.readFileSync('grammar-data.js', 'utf8')}\nObject.assign(globalThis, { APP_VERSION, LEARNING_CARDS, CONTENT_QUALITY_REPORT, GLOSSARY });`;
const context = {};
vm.createContext(context);
vm.runInContext(source, context);

const failures = [];
if (!context.APP_VERSION) failures.push('APP_VERSION is missing.');
if (context.CONTENT_QUALITY_REPORT.missingCards.length) failures.push(`Missing cards: ${context.CONTENT_QUALITY_REPORT.missingCards.map(card => card.id).join(', ')}`);
if (context.CONTENT_QUALITY_REPORT.cardsNeedingReview.length) failures.push(`Cards needing review: ${context.CONTENT_QUALITY_REPORT.cardsNeedingReview.map(card => card.id).join(', ')}`);
if (context.CONTENT_QUALITY_REPORT.bannedPlaceholderCards.length) failures.push(`Banned placeholder cards: ${context.CONTENT_QUALITY_REPORT.bannedPlaceholderCards.map(card => card.id).join(', ')}`);
if (context.CONTENT_QUALITY_REPORT.lowQualityCards.length) failures.push(`Low-quality template cards: ${context.CONTENT_QUALITY_REPORT.lowQualityCards.map(card => card.id).join(', ')}`);
if (context.CONTENT_QUALITY_REPORT.duplicateIds.length) failures.push(`Duplicate ids: ${context.CONTENT_QUALITY_REPORT.duplicateIds.join(', ')}`);
if (context.CONTENT_QUALITY_REPORT.orphanCards.length) failures.push(`Cards not mapped to topics: ${context.CONTENT_QUALITY_REPORT.orphanCards.map(card => card.id).join(', ')}`);

for (const card of context.LEARNING_CARDS) {
  if (card.status !== 'complete') failures.push(`${card.id} is not complete.`);
  if (card.contentSource !== 'reviewed-profile') failures.push(`${card.id} does not use reviewed-profile content.`);
  if (card.reviewedBy !== 'Grammar Accuracy Reviewer') failures.push(`${card.id} is missing review metadata.`);
}

for (const entry of context.GLOSSARY) {
  for (const field of ['term', 'childMeaning', 'formalMeaning', 'example', 'commonMistake']) {
    if (!entry[field]) failures.push(`Glossary entry ${entry.term || '(unknown)'} missing ${field}.`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Content validation passed for ${context.LEARNING_CARDS.length} cards in ${context.APP_VERSION}.`);

/* Grammar Tree Coach data store
   Keep learning content separate from app behaviour so teachers can extend it easily. */
const APP_VERSION = "v1.0.0";

const VERSION_REGISTRY = [
  { version: "v0.0.0", label: "Previous: repository starter", status: "archived", path: "archive/v0.0.0/" },
  { version: "v1.0.0", label: "Current: complete static app", status: "current", path: "./" },
  { version: "v1.1.0", label: "Future: classroom packs", status: "future", path: "#future" }
];

const TEACHING_PRINCIPLE = [
  "Words have classes.",
  "Phrases are groups of words.",
  "Clauses contain a verb.",
  "Sentences are complete ideas.",
  "Grammar labels explain jobs inside writing."
];

function topic(title, children = []) { return { title, children }; }

const GRAMMAR_TREE = topic("GRAMMAR", [
  topic("WORDS (Parts of Speech)", [
    topic("Nouns", [topic("Common Nouns", [topic("Concrete Nouns"), topic("Abstract Nouns")]), topic("Proper Nouns"), topic("Collective Nouns"), topic("Compound Nouns"), topic("Countable / Uncountable Nouns")]),
    topic("Pronouns", [topic("Personal Pronouns"), topic("Possessive Pronouns"), topic("Reflexive Pronouns"), topic("Relative Pronouns"), topic("Demonstrative Pronouns"), topic("Interrogative Pronouns"), topic("Indefinite Pronouns")]),
    topic("Verbs", [topic("Main Verbs"), topic("Auxiliary Verbs"), topic("Modal Verbs"), topic("Transitive Verbs"), topic("Intransitive Verbs"), topic("Linking Verbs"), topic("Phrasal Verbs")]),
    topic("Adjectives", [topic("Descriptive Adjectives"), topic("Comparative Adjectives"), topic("Superlative Adjectives"), topic("Proper Adjectives"), topic("Participial Adjectives")]),
    topic("Adverbs", [topic("Manner"), topic("Time"), topic("Place"), topic("Frequency"), topic("Degree"), topic("Certainty")]),
    topic("Determiners", [topic("Articles", [topic("Definite (the)"), topic("Indefinite (a, an)")]), topic("Demonstratives"), topic("Possessives"), topic("Quantifiers"), topic("Numbers"), topic("Distributives")]),
    topic("Prepositions", [topic("Time"), topic("Place"), topic("Direction")]),
    topic("Conjunctions", [topic("Coordinating"), topic("Subordinating"), topic("Correlative")]),
    topic("Interjections", [topic("Emotion"), topic("Surprise"), topic("Greeting")])
  ]),
  topic("WORD FEATURES", [topic("Singular / Plural"), topic("Tense"), topic("Person"), topic("Gender"), topic("Number"), topic("Comparison"), topic("Voice")]),
  topic("PHRASES", [topic("Noun Phrases", [topic("Head Noun"), topic("Determiners"), topic("Adjectives"), topic("Modifiers")]), topic("Verb Phrases", [topic("Main Verb"), topic("Helping Verbs")]), topic("Adjective Phrases"), topic("Adverb Phrases"), topic("Prepositional Phrases"), topic("Participial Phrases")]),
  topic("CLAUSES", [topic("Main (Independent) Clauses"), topic("Subordinate (Dependent) Clauses", [topic("Relative Clauses"), topic("Adverbial Clauses"), topic("Noun Clauses"), topic("Conditional Clauses")])]),
  topic("SENTENCE ELEMENTS", [topic("Subject"), topic("Predicate"), topic("Object", [topic("Direct Object"), topic("Indirect Object")]), topic("Complement"), topic("Modifier")]),
  topic("SENTENCE TYPES", [topic("Simple"), topic("Compound"), topic("Complex"), topic("Compound-Complex")]),
  topic("SENTENCE PURPOSES", [topic("Statement (Declarative)"), topic("Question (Interrogative)"), topic("Command (Imperative)"), topic("Exclamation (Exclamatory)")]),
  topic("PUNCTUATION", [topic("Full Stop"), topic("Comma"), topic("Apostrophe"), topic("Question Mark"), topic("Exclamation Mark"), topic("Colon"), topic("Semicolon"), topic("Dash"), topic("Hyphen"), topic("Brackets"), topic("Quotation Marks")]),
  topic("ADVANCED GRAMMAR", [topic("Active Voice"), topic("Passive Voice"), topic("Direct Speech"), topic("Indirect Speech"), topic("Conditionals"), topic("Relative Pronouns"), topic("Cohesion"), topic("Formality"), topic("Register")])
]);

const TOPIC_DETAILS = {
  "Nouns": ["A noun names a person, place, thing, animal, or idea.", "Nouns can be concrete like castle, or abstract like courage. They often act as the subject or object.", "The dragon guarded the treasure.", "Ask: can I put a, an, or the before it? Does it name something?", "Do not give a capital letter to every common noun.", "Which word is the noun in: The kitten slept?", "kitten"],
  "Verbs": ["A verb shows an action, being, or having.", "A verb is the engine of a clause. A clause must contain a verb to work.", "Maya jumped over the puddle.", "Look for the word that tells what happens or what something is.", "Remember to match subject and verb: she runs, not she run.", "Which word is the verb in: Birds fly?", "fly"],
  "Adjectives": ["An adjective describes a noun.", "Adjectives add detail to noun phrases by telling size, colour, feeling, number, or quality.", "The bright moon shone.", "Ask: which noun does this word describe?", "Use comparative forms carefully: taller, not more taller.", "Which word is the adjective in: a noisy class?", "noisy"],
  "Adverbs": ["An adverb gives more information about a verb, adjective, or another adverb.", "Many adverbs explain how, when, where, how often, or how strongly something happens.", "The runner moved quickly.", "Ask: does it tell how, when, where, or how much?", "Not every adverb ends in -ly, and not every -ly word is an adverb.", "Which word is the adverb in: We waited patiently?", "patiently"],
  "Determiners": ["A determiner introduces a noun.", "Determiners sit at the front of noun phrases and help show which one, whose one, or how many.", "Those three ducks crossed the path.", "Ask: can it come before a noun to introduce it?", "Do not use two clashing determiners: the my dog should be my dog or the dog.", "Which word is the determiner in: The apple fell?", "The"],
  "Phrases": ["A phrase is a group of words without its own complete verb idea.", "Phrases build bigger meanings inside clauses and sentences, like noun phrases and prepositional phrases.", "the small dog; in the garden", "Check whether the group works together but does not make a full sentence alone.", "A phrase is not automatically a full sentence.", "Is 'under the table' a phrase or full sentence?", "phrase"],
  "CLAUSES": ["A clause is a group of words with a verb.", "Main clauses can stand alone. Subordinate clauses need another clause to complete the meaning.", "Although it rained, we played.", "Find the verb, then ask if the group is a complete idea.", "Do not punctuate every subordinate clause as a sentence on its own.", "Does a clause need a verb?", "yes"],
  "Subject": ["The subject is who or what the clause is about.", "The subject usually controls the verb and often appears before it in statements.", "The brave mouse escaped.", "Ask: who or what is doing or being?", "Do not confuse the object with the subject.", "Who is the subject in: The cat chased the string?", "cat"],
  "PUNCTUATION": ["Punctuation marks help readers hear and understand writing.", "Marks such as full stops, commas, apostrophes, and question marks organise meaning.", "Where are you going?", "Notice pauses, sentence endings, questions, lists, and ownership.", "Do not use apostrophes just because a word is plural.", "What mark ends a question?", "question mark"]
};

function getTopicDetail(title) {
  const key = TOPIC_DETAILS[title] ? title : Object.keys(TOPIC_DETAILS).find(k => title.toLowerCase().includes(k.toLowerCase().replace("clauses", "clause")));
  const base = key ? TOPIC_DETAILS[key] : [
    `${title} needs a dedicated archived learning card.`,
    `This archived card predates the v2.0.0 strict content schema.`,
    `Example: The small dog barked loudly in the garden.`,
    `Use the current app for the reviewed card for this topic.`,
    `Archived placeholder text was removed during the v2.0.0 content-quality cleanup.`,
    `What should grammar labels explain?`,
    `jobs`
  ];
  return { meaning: base[0], deeper: base[1], example: base[2], spot: base[3], mistake: base[4], quiz: base[5], answer: base[6] };
}

const LEARNING_LEVELS = [
  ["Words", "Words are the smallest meaning bricks in grammar.", ["dog", "run", "bright", "under", "wow"], [["Which word names a thing: jump / pencil?", "pencil"], ["Which word shows action: sleep / blue?", "sleep"], ["Is 'the' a word?", "yes"], ["Which word describes: tiny / table?", "tiny"], ["Which word joins ideas: and / apple?", "and"]]],
  ["Word Classes", "Words have classes, also called parts of speech, because they do different jobs.", ["noun: river", "verb: swims", "adjective: shiny", "determiner: this", "adverb: slowly"], [["What class names people or things?", "noun"], ["What class shows action?", "verb"], ["What class describes nouns?", "adjective"], ["What class can introduce a noun?", "determiner"], ["What class can describe a verb?", "adverb"]]],
  ["Phrases", "Phrases are groups of words that work as one unit.", ["the red kite", "very carefully", "in the box", "has been singing", "full of stars"], [["Is 'the red kite' a phrase?", "yes"], ["What is the head noun in 'the red kite'?", "kite"], ["Does a phrase need to be a complete sentence?", "no"], ["What phrase begins with a preposition?", "prepositional"], ["Finish: Phrases are groups of ___.", "words"]]],
  ["Clauses", "Clauses contain a verb. Some stand alone; some need help.", ["the dog barked", "because it was late", "we ran", "although I tried", "birds sang"], [["Does a clause contain a verb?", "yes"], ["Can a main clause stand alone?", "yes"], ["What type cannot stand alone?", "subordinate"], ["Find the verb: we laughed", "laughed"], ["Is 'because it rained' complete alone?", "no"]]],
  ["Sentences", "Sentences are complete ideas with punctuation.", ["The dog barked.", "Where is my bag?", "Close the door.", "What a goal!", "We ate, and we talked."], [["What mark ends a statement?", "full stop"], ["Is 'The dog barked.' complete?", "yes"], ["What kind asks something?", "question"], ["What joins two main clauses in a compound sentence?", "conjunction"], ["Finish: Sentences are complete ___.", "ideas"]]],
  ["Sentence Functions", "Sentences can state, ask, command, or exclaim.", ["I like pears.", "Do you like pears?", "Eat a pear.", "What a juicy pear!", "Please pass the pear."], [["Which purpose asks?", "question"], ["Which purpose gives an order?", "command"], ["Which purpose tells?", "statement"], ["Which purpose shows strong feeling?", "exclamation"], ["What mark usually ends a question?", "question mark"]]],
  ["Punctuation", "Punctuation guides meaning, pauses, questions, lists, and speech.", ["Hello, Sam.", "It's Mina's book.", "Stop!", "I need pens, glue, and card.", "First: listen."], [["Which mark shows a question?", "question mark"], ["Which mark can show possession?", "apostrophe"], ["Which mark separates list items?", "comma"], ["Which mark ends a command strongly?", "exclamation mark"], ["Which mark can introduce a list?", "colon"]]],
  ["Mixed Mastery", "Use the whole grammar tree: words, phrases, clauses, sentences, and texts.", ["The curious fox watched silently.", "Although we were tired, we finished.", "My sister's bike is blue.", "The bird in the tree sang.", "Run!"], [["In 'curious fox', what class is curious?", "adjective"], ["Does 'Although we were tired' need another clause?", "yes"], ["What does sister's show?", "possession"], ["What phrase is 'in the tree'?", "prepositional"], ["Run! is what purpose?", "command"]]]
].map((level, index) => ({ id: index + 1, title: `Level ${index + 1}: ${level[0]}`, explanation: level[1], examples: level[2], quiz: level[3].map((q, i) => ({ id: i, question: q[0], answer: q[1] })) }));

const ANALYSER_SENTENCES = [
  { text: "The small dog barked.", words: [["The", "determiner", "comes before the noun dog."], ["small", "adjective", "describes the noun dog."], ["dog", "noun", "names an animal."], ["barked", "verb", "shows an action."]], phrases: ["Noun phrase: The small dog", "Verb phrase: barked"] },
  { text: "My friend quickly opened the door.", words: [["My", "determiner", "shows whose friend."], ["friend", "noun", "names a person."], ["quickly", "adverb", "tells how the opening happened."], ["opened", "verb", "shows an action."], ["the", "determiner", "introduces door."], ["door", "noun", "names a thing."]], phrases: ["Noun phrase: My friend", "Verb phrase: quickly opened", "Noun phrase: the door"] },
  { text: "The girl with the red bag smiled.", words: [["The", "determiner", "introduces girl."], ["girl", "noun", "names a person."], ["with", "preposition", "begins a prepositional phrase."], ["the", "determiner", "introduces bag."], ["red", "adjective", "describes bag."], ["bag", "noun", "names a thing."], ["smiled", "verb", "shows an action."]], phrases: ["Noun phrase: The girl", "Prepositional phrase: with the red bag", "Verb phrase: smiled"] },
  { text: "Although it was raining, we went outside.", words: [["Although", "conjunction", "starts a subordinate clause."], ["it", "pronoun", "stands for the weather situation."], ["was", "verb", "helps form the verb phrase."], ["raining", "verb", "shows the action/weather."], ["we", "pronoun", "stands for the people speaking."], ["went", "verb", "shows an action."], ["outside", "adverb", "tells where we went."]], phrases: ["Subordinate clause: Although it was raining", "Main clause: we went outside"] },
  { text: "The boy kicked the ball and the crowd cheered.", words: [["The", "determiner", "introduces boy."], ["boy", "noun", "names a person."], ["kicked", "verb", "shows an action."], ["the", "determiner", "introduces ball."], ["ball", "noun", "names a thing."], ["and", "conjunction", "joins two clauses."], ["the", "determiner", "introduces crowd."], ["crowd", "noun", "names a group."], ["cheered", "verb", "shows an action."]], phrases: ["Main clause: The boy kicked the ball", "Conjunction: and", "Main clause: the crowd cheered"] }
];

const PRACTICE = {
  tap: [
    { sentence: "The green frog jumped.", target: "adjective", answer: "green" },
    { sentence: "A robot danced slowly.", target: "adverb", answer: "slowly" },
    { sentence: "Those birds sang.", target: "determiner", answer: "Those" }
  ],
  nounPhrase: { determiners: ["the", "a", "my", "three"], adjectives: ["red", "shiny", "sleepy", "brave"], nouns: ["ball", "dragon", "cloud", "pencil"] },
  expand: ["Dog barked.", "The dog barked.", "The small dog barked.", "The small dog barked loudly.", "The small dog barked loudly in the garden."],
  fixes: [
    ["The my dog barked.", "My dog barked.", "Use one determiner before the noun."],
    ["She run to school.", "She runs to school.", "Match the verb to she/he/it in the present tense."],
    ["I seen a bird.", "I saw a bird.", "Use saw for the simple past."],
    ["A apple fell.", "An apple fell.", "Use an before a vowel sound."],
    ["He is more taller than me.", "He is taller than me.", "Do not use more with an -er comparative."]
  ],
  zoom: ["Word: dog", "Phrase: the small dog", "Clause: the small dog barked", "Sentence: The small dog barked because it was scared."]
};

const GLOSSARY = [
  ["noun", "A naming word.", "A word that names a person, place, thing, or idea.", "river", "Do not capitalise common nouns unless they start a sentence."],
  ["pronoun", "A word that stands in for a noun.", "A word replacing or referring to a noun phrase.", "she, it, they", "Make sure readers know who the pronoun means."],
  ["verb", "An action, being, or having word.", "A word forming the predicate and expressing action, state, or occurrence.", "jumped", "Keep tense and subject agreement consistent."],
  ["adjective", "A describing word for a noun.", "A word modifying a noun or pronoun.", "bright", "Do not use adjectives when an adverb is needed."],
  ["adverb", "A word that tells how, when, where, or how much.", "A modifier of a verb, adjective, clause, or adverb.", "quietly", "Not all adverbs end in -ly."],
  ["determiner", "A word that introduces a noun.", "A word specifying reference in a noun phrase.", "the, my, three", "Avoid double determiners like the my."],
  ["article", "A, an, or the.", "A determiner marking definite or indefinite reference.", "an owl", "Use an before vowel sounds, not just vowel letters."],
  ["demonstrative", "A word that points to which one.", "This, that, these, or those used as determiners or pronouns.", "that book", "Match singular and plural: this book, these books."],
  ["possessive", "A word or form showing belonging.", "A determiner, pronoun, or noun form expressing possession.", "Mina's hat", "Do not confuse its and it's."],
  ["quantifier", "A word that tells how much or how many.", "A determiner expressing quantity.", "many apples", "Use much with uncountable nouns and many with countable nouns."],
  ["number", "A word showing amount or order.", "A numeral determiner or grammatical singular/plural feature.", "three cats", "Keep number agreement clear."],
  ["preposition", "A word that shows a relationship such as place or time.", "A word heading a prepositional phrase.", "under the bed", "A preposition usually needs an object."],
  ["conjunction", "A joining word.", "A word connecting words, phrases, clauses, or sentences.", "and, because", "Do not overuse and to join every idea."],
  ["interjection", "A sudden feeling word.", "An exclamatory word or phrase outside normal sentence grammar.", "Wow!", "Use sparingly in formal writing."],
  ["phrase", "A group of words working together.", "A grammatical unit without a full subject-verb complete idea.", "the blue car", "A phrase is not always a sentence."],
  ["noun phrase", "A group built around a noun.", "A phrase with a noun or pronoun as its head.", "the tiny mouse", "Do not forget the head noun."],
  ["verb phrase", "A group built around a verb.", "A main verb with auxiliaries and modifiers.", "has been waiting", "Keep helper verbs in the correct order."],
  ["adjective phrase", "A phrase that acts like an adjective.", "A phrase modifying a noun or pronoun.", "full of beans", "Check which noun it describes."],
  ["adverb phrase", "A phrase that acts like an adverb.", "A phrase modifying a verb, adjective, or adverb.", "very quickly", "Check what it modifies."],
  ["prepositional phrase", "A phrase beginning with a preposition.", "A preposition plus its object and modifiers.", "in the garden", "Do not leave it dangling unclearly."],
  ["clause", "A group of words with a verb.", "A grammatical unit containing a subject and predicate, sometimes implied.", "we smiled", "A subordinate clause may not stand alone."],
  ["main clause", "A clause that can stand alone.", "An independent clause expressing a complete idea.", "The sun rose", "Do not join two main clauses with only a comma."],
  ["subordinate clause", "A clause that needs a main clause.", "A dependent clause functioning within a larger sentence.", "because it rained", "Do not punctuate it as a full sentence alone."],
  ["relative clause", "A clause that adds information about a noun.", "A subordinate clause introduced by a relative pronoun or adverb.", "who won the race", "Place it close to the noun it describes."],
  ["subject", "Who or what the clause is about.", "The element about which something is predicated.", "The cat slept.", "Do not confuse subject with object."],
  ["predicate", "What is said about the subject.", "The verb phrase and its complements/modifiers in a clause.", "slept on the mat", "The predicate must include a verb."],
  ["object", "Who or what receives the action.", "A complement of a verb affected by the action.", "kicked the ball", "Not every sentence has an object."],
  ["direct object", "The thing directly acted on.", "The object directly affected by a transitive verb.", "read a book", "Ask what or whom after the verb."],
  ["indirect object", "Who or what receives the direct object.", "A recipient complement usually before the direct object.", "gave Sam a gift", "Do not mistake it for a prepositional phrase."],
  ["complement", "A word or group that completes meaning.", "An element required to complete a verb, subject, or object meaning.", "is happy", "Some verbs need complements, not objects."],
  ["modifier", "A word or group that adds detail.", "An optional element modifying another unit.", "with stripes", "Place modifiers near what they modify."],
  ["simple sentence", "One main clause.", "A sentence containing a single independent clause.", "Birds sing.", "Simple does not mean short."],
  ["compound sentence", "Two or more main clauses joined together.", "A sentence with coordinated independent clauses.", "I ran, and she walked.", "Use correct punctuation before joining conjunctions."],
  ["complex sentence", "A main clause plus a subordinate clause.", "A sentence containing independent and dependent clauses.", "When it rained, we left.", "The subordinate clause cannot stand alone."],
  ["punctuation", "Marks that help writing make sense.", "Conventional marks that organise written language.", ". , ? !", "Use marks to support meaning, not decoration."],
  ["apostrophe", "A mark for missing letters or belonging.", "A punctuation mark used in contractions and possessives.", "Mina's bag", "Do not use apostrophes for ordinary plurals."],
  ["comma", "A small pause or separator.", "A punctuation mark separating items or clauses.", "Yes, please.", "Avoid comma splices between main clauses."],
  ["full stop", "A mark that ends a statement.", "A period ending a declarative or imperative sentence.", "We arrived.", "Remember it at the end of a complete sentence."],
  ["colon", "A mark that introduces something.", "A punctuation mark introducing explanation, list, or quotation.", "Bring this: glue.", "Do not use after every verb."],
  ["semicolon", "A mark linking close main clauses.", "A punctuation mark stronger than a comma but weaker than a full stop.", "It rained; we stayed.", "Both sides should be main clauses."]
].map(([term, child, formal, example, mistake]) => ({ term, child, formal, example, mistake }));

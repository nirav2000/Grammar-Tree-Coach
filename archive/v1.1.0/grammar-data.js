/* Grammar Tree Coach data store
   Keep learning content separate from app behaviour so teachers can extend it easily. */
const APP_VERSION = "v1.1.0";

const VERSION_REGISTRY = [
  { version: "v0.0.0", label: "Archive: repository starter", status: "archived", path: "archive/v0.0.0/" },
  { version: "v1.0.0", label: "Archive: first complete app", status: "archived", path: "archive/v1.0.0/" },
  { version: "v1.1.0", label: "Current: richer examples + printable tree", status: "current", path: "./" },
  { version: "v1.2.0", label: "Future: classroom packs", status: "future", path: "#future" }
];

const TEACHING_PRINCIPLE = [
  "Words have classes.",
  "Phrases are groups of words.",
  "Clauses contain a verb.",
  "Sentences are complete ideas.",
  "Grammar labels explain jobs inside writing."
];

function topic(title, children = []) { return { title, children }; }
function detail(meaning, deeper, example, highlights, spot, mistake, quiz, answer) {
  return { meaning, deeper, example, highlights, spot, mistake, quiz, answer };
}
function lessonExample(sentence, highlights, note) { return { sentence, highlights, note }; }

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
  "Nouns": detail("A noun names a person, place, thing, animal, or idea.", "Nouns can be concrete like castle, or abstract like courage. They often act as the subject or object.", "The dragon guarded the treasure.", ["dragon", "treasure"], "Put a, an, or the before the word and ask whether it names something you can point to or think about.", "Do not give a capital letter to every common noun.", "Which word is the noun in: The kitten slept?", "kitten"),
  "Pronouns": detail("A pronoun stands in for a noun or noun phrase.", "Pronouns help writers avoid repeating the same noun, but the reader must know who or what the pronoun means.", "Amira found the shell, and she kept it.", ["she", "it"], "Find the earlier noun that the pronoun points back to: she = Amira, it = the shell.", "Do not use a pronoun when readers cannot tell who it means.", "In 'Ravi smiled because he won', what does he stand for?", "Ravi"),
  "Demonstrative Pronouns": detail("A demonstrative pronoun points to a whole person or thing: this, that, these, or those.", "It replaces a noun phrase instead of sitting before a noun. In 'This is heavy', this means 'this thing'.", "These are delicious, but that is too spicy.", ["These", "that"], "If this/that/these/those stands alone and you can replace it with a noun phrase, it is a demonstrative pronoun.", "Do not call it a determiner when there is no noun after it.", "Which demonstrative pronoun points to more than one nearby thing: this / these?", "these"),
  "Demonstratives": detail("A demonstrative points out which noun you mean: this, that, these, or those.", "As determiners, demonstratives sit directly before a noun: this book, that cloud, these apples, those shoes.", "These apples are ripe, but those pears are hard.", ["These", "those"], "Look for this/that/these/those immediately before a noun. This/these usually feel near; that/those usually feel farther away.", "Match number: this apple, these apples, that pear, those pears.", "In 'those shoes', which word is the demonstrative?", "those"),
  "Verbs": detail("A verb shows an action, being, or having.", "A verb is the engine of a clause. A clause must contain a verb to work.", "Maya jumped over the puddle.", ["jumped"], "Look for the word that tells what happens or what something is.", "Remember to match subject and verb: she runs, not she run.", "Which word is the verb in: Birds fly?", "fly"),
  "Adjectives": detail("An adjective describes a noun.", "Adjectives add detail to noun phrases by telling size, colour, feeling, number, or quality.", "The bright moon shone above the hill.", ["bright"], "Ask which noun the word describes; here bright describes moon.", "Use comparative forms carefully: taller, not more taller.", "Which word is the adjective in: a noisy class?", "noisy"),
  "Adverbs": detail("An adverb gives more information about a verb, adjective, or another adverb.", "Many adverbs explain how, when, where, how often, or how strongly something happens.", "The runner moved quickly around the track.", ["quickly"], "Ask whether it tells how, when, where, how often, or how much.", "Not every adverb ends in -ly, and not every -ly word is an adverb.", "Which word is the adverb in: We waited patiently?", "patiently"),
  "Determiners": detail("A determiner introduces a noun.", "Determiners sit at the front of noun phrases and help show which one, whose one, or how many.", "Those three ducks crossed the path.", ["Those", "three"], "Check whether the word comes before a noun and helps identify it.", "Do not use two clashing determiners: the my dog should be my dog or the dog.", "Which word is the determiner in: The apple fell?", "The"),
  "Prepositions": detail("A preposition begins a phrase that shows a relationship such as place, time, or direction.", "The preposition works with its object to make a prepositional phrase.", "The keys are under the blue mat.", ["under"], "Look for a small relationship word followed by a noun phrase: under the blue mat.", "A preposition usually needs an object; avoid leaving it unclear.", "Which word is the preposition in: beside the river?", "beside"),
  "Conjunctions": detail("A conjunction joins words, phrases, clauses, or sentences.", "Coordinating conjunctions join equal parts; subordinating conjunctions make one clause depend on another.", "I packed lunch because the trip was long.", ["because"], "Ask what two ideas are being connected and whether one depends on the other.", "Do not join two complete sentences with only a comma.", "Which word joins the ideas in: I stayed because it rained?", "because"),
  "Phrases": detail("A phrase is a group of words without its own complete verb idea.", "Phrases build bigger meanings inside clauses and sentences, like noun phrases and prepositional phrases.", "The small dog slept in the garden.", ["The small dog", "in the garden"], "Check whether the group works together but does not make a full sentence alone.", "A phrase is not automatically a full sentence.", "Is 'under the table' a phrase or full sentence?", "phrase"),
  "Noun Phrases": detail("A noun phrase is a group built around a noun or pronoun.", "It may include determiners, adjectives, and modifiers, but the head noun is the core.", "The nervous brown rabbit hid behind the shed.", ["The nervous brown rabbit"], "Find the main noun, then include words that belong with it.", "Do not include the verb in the noun phrase.", "What is the head noun in 'the silver moon'?", "moon"),
  "CLAUSES": detail("A clause is a group of words with a verb.", "Main clauses can stand alone. Subordinate clauses need another clause to complete the meaning.", "Although it rained, we played football.", ["Although it rained", "we played"], "Find the verb, then ask if the group is a complete idea.", "Do not punctuate every subordinate clause as a sentence on its own.", "Does a clause need a verb?", "yes"),
  "Subject": detail("The subject is who or what the clause is about.", "The subject usually controls the verb and often appears before it in statements.", "The brave mouse escaped through the crack.", ["The brave mouse"], "Ask who or what is doing or being.", "Do not confuse the object with the subject.", "Who is the subject in: The cat chased the string?", "cat"),
  "Predicate": detail("The predicate says what the subject does, is, has, or experiences.", "It includes the verb phrase and any objects, complements, or modifiers linked to that verb.", "The brave mouse escaped through the crack.", ["escaped through the crack"], "Find the subject first; the predicate is what is said about it.", "Do not leave the verb out of the predicate.", "What must a predicate include?", "verb"),
  "PUNCTUATION": detail("Punctuation marks help readers hear and understand writing.", "Marks such as full stops, commas, apostrophes, and question marks organise meaning.", "Where are you going?", ["?"], "Notice sentence endings, questions, lists, speech, and ownership.", "Do not use apostrophes just because a word is plural.", "What mark ends a question?", "question mark")
};

function getTopicDetail(title) {
  const key = TOPIC_DETAILS[title] ? title : Object.keys(TOPIC_DETAILS).find(k => title.toLowerCase().includes(k.toLowerCase().replace("clauses", "clause")));
  const base = key ? TOPIC_DETAILS[key] : detail(
    `${title} needs a dedicated archived learning card.`,
    `This archived card predates the v2.0.0 strict content schema.`,
    `The small dog barked loudly in the garden.`,
    [],
    `Use the current app for the reviewed card for this topic.`,
    `Archived placeholder text was removed during the v2.0.0 content-quality cleanup.`,
    `What should grammar labels explain?`,
    `jobs`
  );
  return base;
}

const LEARNING_LEVELS = [
  ["Words", "Words are the smallest meaning bricks in grammar.", [
    lessonExample("The dog ran across the yard.", ["dog", "ran"], "Words carry meaning one by one."),
    lessonExample("Wow, the bright kite flew under the bridge.", ["Wow", "bright", "under"], "Different words do different jobs.")
  ], [["Which word names a thing: jump / pencil?", "pencil"], ["Which word shows action: sleep / blue?", "sleep"], ["Is 'the' a word?", "yes"], ["Which word describes: tiny / table?", "tiny"], ["Which word joins ideas: and / apple?", "and"]]],
  ["Word Classes", "Words have classes, also called parts of speech, because they do different jobs.", [
    lessonExample("The shiny river curves slowly through town.", ["river", "curves", "shiny", "slowly"], "Noun, verb, adjective, and adverb appear together."),
    lessonExample("This owl watched the mouse.", ["This", "owl", "watched"], "This introduces the noun owl.")
  ], [["What class names people or things?", "noun"], ["What class shows action?", "verb"], ["What class describes nouns?", "adjective"], ["What class can introduce a noun?", "determiner"], ["What class can describe a verb?", "adverb"]]],
  ["Phrases", "Phrases are groups of words that work as one unit.", [
    lessonExample("The red kite twisted in the wind.", ["The red kite", "in the wind"], "A noun phrase and a prepositional phrase work inside one sentence."),
    lessonExample("Lena has been singing very carefully.", ["has been singing", "very carefully"], "Verb and adverb phrases can contain several words.")
  ], [["Is 'the red kite' a phrase?", "yes"], ["What is the head noun in 'the red kite'?", "kite"], ["Does a phrase need to be a complete sentence?", "no"], ["What phrase begins with a preposition?", "prepositional"], ["Finish: Phrases are groups of ___.", "words"]]],
  ["Clauses", "Clauses contain a verb. Some stand alone; some need help.", [
    lessonExample("The dog barked because it heard thunder.", ["The dog barked", "because it heard thunder"], "Each highlighted group has a verb."),
    lessonExample("Although I tried, the jar stayed shut.", ["Although I tried", "the jar stayed shut"], "One clause depends on the other.")
  ], [["Does a clause contain a verb?", "yes"], ["Can a main clause stand alone?", "yes"], ["What type cannot stand alone?", "subordinate"], ["Find the verb: we laughed", "laughed"], ["Is 'because it rained' complete alone?", "no"]]],
  ["Sentences", "Sentences are complete ideas with punctuation.", [
    lessonExample("The dog barked.", ["The dog barked"], "A complete statement has a full stop."),
    lessonExample("Where is my bag?", ["Where", "?"], "A question asks for information.")
  ], [["What mark ends a statement?", "full stop"], ["Is 'The dog barked.' complete?", "yes"], ["What kind asks something?", "question"], ["What joins two main clauses in a compound sentence?", "conjunction"], ["Finish: Sentences are complete ___.", "ideas"]]],
  ["Sentence Functions", "Sentences can state, ask, command, or exclaim.", [
    lessonExample("Please pass the pear.", ["Please pass"], "A polite command tells someone what to do."),
    lessonExample("What a juicy pear!", ["What", "!"], "An exclamation shows strong feeling.")
  ], [["Which purpose asks?", "question"], ["Which purpose gives an order?", "command"], ["Which purpose tells?", "statement"], ["Which purpose shows strong feeling?", "exclamation"], ["What mark usually ends a question?", "question mark"]]],
  ["Punctuation", "Punctuation guides meaning, pauses, questions, lists, and speech.", [
    lessonExample("Hello, Sam, I need pens, glue, and card.", [",", "pens, glue, and card"], "Commas separate a greeting and items in a list."),
    lessonExample("It is Mina's book: please return it.", ["Mina's", ":"], "An apostrophe shows belonging; a colon introduces an explanation.")
  ], [["Which mark shows a question?", "question mark"], ["Which mark can show possession?", "apostrophe"], ["Which mark separates list items?", "comma"], ["Which mark ends a command strongly?", "exclamation mark"], ["Which mark can introduce a list?", "colon"]]],
  ["Mixed Mastery", "Use the whole grammar tree: words, phrases, clauses, sentences, and texts.", [
    lessonExample("Although the curious fox watched silently, the rabbit escaped.", ["Although the curious fox watched silently", "curious", "silently", "the rabbit escaped"], "A complex sentence can show many grammar jobs."),
    lessonExample("My sister's blue bike gleamed in the sun.", ["My sister's blue bike", "sister's", "blue", "in the sun"], "Possession, adjective, noun phrase, and prepositional phrase work together.")
  ], [["In 'curious fox', what class is curious?", "adjective"], ["Does 'Although we were tired' need another clause?", "yes"], ["What does sister's show?", "possession"], ["What phrase is 'in the tree'?", "prepositional"], ["Run! is what purpose?", "command"]]]
].map((level, index) => ({ id: index + 1, title: `Level ${index + 1}: ${level[0]}`, explanation: level[1], examples: level[2], quiz: level[3].map((q, i) => ({ id: i, question: q[0], answer: q[1] })) }));

const ANALYSER_SENTENCES = [
  { text: "Those bright stars twinkled above the camp.", summary: "Simple sentence: noun phrase + verb phrase + prepositional phrase.", words: [["Those", "determiner", "points to which stars we mean.", "It introduces the noun stars as a demonstrative determiner.", "It sits directly before adjectives and the noun."], ["bright", "adjective", "describes the noun stars.", "It adds a quality inside the noun phrase.", "Ask: what kind of stars?"], ["stars", "noun", "names things in the sky.", "It is the head noun and subject of the sentence.", "The verb twinkled agrees with stars."], ["twinkled", "verb", "shows what the stars did.", "It is the main verb in the predicate.", "A clause needs a verb."], ["above", "preposition", "begins a prepositional phrase.", "It shows the place relationship between stars and camp.", "It is followed by the noun phrase the camp."], ["the", "determiner", "introduces camp.", "It marks camp as a specific place.", "It comes before the noun."], ["camp", "noun", "names a place.", "It is the object of the preposition above.", "Ask: above what?"]], phrases: [{ label: "Noun phrase / subject", text: "Those bright stars", highlights: ["Those", "bright", "stars"], job: "Tells who or what the sentence is about." }, { label: "Verb phrase / predicate", text: "twinkled above the camp", highlights: ["twinkled"], job: "Says what the subject did and adds where." }, { label: "Prepositional phrase", text: "above the camp", highlights: ["above"], job: "Adds place detail to the verb." }] },
  { text: "Amira carefully placed the vase on the shelf.", summary: "Simple sentence with subject, adverb, verb, direct object, and place phrase.", words: [["Amira", "noun", "names a person.", "It is a proper noun and the subject.", "It starts with a capital letter because it is a name."], ["carefully", "adverb", "tells how Amira placed the vase.", "It modifies the verb placed.", "Ask: placed how?"], ["placed", "verb", "shows the action.", "It is a transitive verb with a direct object.", "Ask what action happens."], ["the", "determiner", "introduces vase.", "It marks vase as a specific thing.", "It comes before the noun."], ["vase", "noun", "names a thing.", "It is the direct object receiving the action.", "Ask: placed what?"], ["on", "preposition", "begins a place phrase.", "It links the vase to the shelf.", "It is followed by a noun phrase."], ["the", "determiner", "introduces shelf.", "It marks shelf as specific.", "It comes before the noun."], ["shelf", "noun", "names a thing/place.", "It is the object of the preposition on.", "Ask: on what?"]], phrases: [{ label: "Subject", text: "Amira", highlights: ["Amira"], job: "Who performs the action." }, { label: "Verb phrase", text: "carefully placed", highlights: ["carefully", "placed"], job: "Action plus how it happened." }, { label: "Direct object", text: "the vase", highlights: ["vase"], job: "Thing receiving the action." }, { label: "Prepositional phrase", text: "on the shelf", highlights: ["on"], job: "Where the vase was placed." }] },
  { text: "When the bell rang, the children lined up quietly.", summary: "Complex sentence: subordinate time clause + main clause.", words: [["When", "conjunction", "starts a subordinate time clause.", "It tells the reader the time relationship.", "The clause cannot stand alone as a complete sentence."], ["the", "determiner", "introduces bell.", "It marks bell as specific.", "It comes before the noun."], ["bell", "noun", "names a thing.", "It is the subject of the subordinate clause.", "Ask: what rang?"], ["rang", "verb", "shows the bell's action.", "It is the verb in the subordinate clause.", "A clause needs a verb."], ["the", "determiner", "introduces children.", "It marks children as a known group.", "It comes before the noun."], ["children", "noun", "names people.", "It is the subject of the main clause.", "Ask: who lined up?"], ["lined", "verb", "shows the action in lined up.", "It is part of a phrasal verb.", "The word up belongs with it."], ["up", "adverb", "completes the phrasal verb lined up.", "It helps make the action mean formed a line.", "Try removing it: the meaning changes."], ["quietly", "adverb", "tells how the children lined up.", "It modifies lined up.", "Ask: lined up how?"]], phrases: [{ label: "Subordinate clause", text: "When the bell rang", highlights: ["When", "rang"], job: "Adds time and depends on the main clause." }, { label: "Main clause", text: "the children lined up quietly", highlights: ["children", "lined up", "quietly"], job: "Can stand alone as a complete idea." }] },
  { text: "This is the picture that won the prize.", summary: "Complex sentence with a demonstrative pronoun and a relative clause.", words: [["This", "pronoun", "stands alone for this picture or thing.", "It is a demonstrative pronoun because no noun follows it.", "Replace it with a noun phrase: This picture is..."], ["is", "verb", "links the subject to the complement.", "It is a linking verb.", "It does not show an action here."], ["the", "determiner", "introduces picture.", "It marks picture as specific.", "It comes before the noun."], ["picture", "noun", "names a thing.", "It is part of the subject complement after is.", "Ask: This is what?"], ["that", "pronoun", "introduces a relative clause about picture.", "It refers back to picture.", "It comes before the verb won."], ["won", "verb", "shows the action in the relative clause.", "It tells what the picture did.", "A relative clause still has a verb."], ["the", "determiner", "introduces prize.", "It marks prize as specific.", "It comes before the noun."], ["prize", "noun", "names a thing.", "It is the direct object of won.", "Ask: won what?"]], phrases: [{ label: "Demonstrative pronoun", text: "This", highlights: ["This"], job: "Points to a whole thing without naming it." }, { label: "Complement noun phrase", text: "the picture", highlights: ["picture"], job: "Completes the meaning of is." }, { label: "Relative clause", text: "that won the prize", highlights: ["that", "won"], job: "Adds information about picture." }] }
];

const PRACTICE = {
  tap: [
    { sentence: "The green frog jumped over the log.", target: "adjective", answer: "green" },
    { sentence: "A robot danced slowly beside the stage.", target: "adverb", answer: "slowly" },
    { sentence: "Those birds sang loudly at dawn.", target: "demonstrative determiner", answer: "Those" },
    { sentence: "This is my favourite chapter.", target: "demonstrative pronoun", answer: "This" },
    { sentence: "Lena packed pencils, rulers, and glue.", target: "comma-separated list item", answer: "rulers" }
  ],
  nounPhrase: { determiners: ["the", "a", "my", "three", "these"], adjectives: ["red", "shiny", "sleepy", "brave", "ancient"], nouns: ["ball", "dragon", "cloud", "pencil", "owls"] },
  expand: ["Dog barked.", "The dog barked.", "The small dog barked.", "The small dog barked loudly.", "The small dog barked loudly in the garden.", "Although the gate was closed, the small dog barked loudly in the garden."],
  fixes: [
    ["The my dog barked.", "My dog barked.", "Use one determiner before the noun."],
    ["She run to school.", "She runs to school.", "Match the verb to she/he/it in the present tense."],
    ["I seen a bird.", "I saw a bird.", "Use saw for the simple past."],
    ["A apple fell.", "An apple fell.", "Use an before a vowel sound."],
    ["He is more taller than me.", "He is taller than me.", "Do not use more with an -er comparative."],
    ["This apples are sweet.", "These apples are sweet.", "Use these with plural nouns."],
    ["Because it was raining.", "Because it was raining, we stayed inside.", "A subordinate clause needs a main clause."],
    ["The dog barked, the cat hid.", "The dog barked, and the cat hid.", "Do not join two main clauses with only a comma."]
  ],
  zoom: ["Word: dog", "Phrase: the small dog", "Clause: the small dog barked", "Sentence: The small dog barked because it was scared.", "Paragraph idea: The small dog barked because it was scared. Its owner opened the door and comforted it."]
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
].map(([term, child, formal, example, mistake]) => {
  const keyExample = `<mark>${example}</mark>`;
  const sentence = /[.!?]$/.test(example) && example.includes(" ") ? example.replace(example, keyExample) : `Look at ${keyExample} in this grammar example.`;
  return { term, child, formal, example: sentence, mistake };
});

/* Grammar Tree Coach data store
   Keep learning content separate from app behaviour so teachers can extend it easily. */
const APP_VERSION = "v2.0.0";

const VERSION_REGISTRY = [
  { version: "v0.0.0", label: "Archive: repository starter", status: "archived", path: "archive/v0.0.0/" },
  { version: "v1.0.0", label: "Archive: first complete app", status: "archived", path: "archive/v1.0.0/" },
  { version: "v1.1.0", label: "Archive: examples + printable tree", status: "archived", path: "archive/v1.1.0/" },
  { version: "v2.0.0", label: "Current: strict learning-card content", status: "current", path: "./" },
  { version: "v2.1.0", label: "Future: classroom packs", status: "future", path: "#future" }
];

const TEACHING_PRINCIPLE = [
  "Words have classes.",
  "Phrases are groups of words.",
  "Clauses contain a verb.",
  "Sentences are complete ideas.",
  "Grammar labels explain jobs inside writing."
];

const BANNED_PLACEHOLDER_PHRASES = [
  ["is a grammar idea", "that helps words do a clear job"].join(" "),
  ["This topic fits", "into the grammar tree"].join(" "),
  ["Look at nearby", "words"].join(" "),
  ["Do not memorise the label", "without checking its job"].join(" ")
];

function topic(title, children = []) { return { title, children }; }
function slugify(text) { return String(text).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
function cardExample(sentence, explanation) { return { sentence, explanation }; }
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

function assignTopicIds(node, path = []) {
  const base = slugify(node.title) || "topic";
  const id = path.length ? `${path.join("-")}-${base}` : base;
  node.id = id;
  node.category = path.length ? path[path.length - 1] : "root";
  const childPath = node.title === "GRAMMAR" ? [] : [...path, base];
  (node.children || []).forEach(child => assignTopicIds(child, childPath));
  return node;
}
assignTopicIds(GRAMMAR_TREE);

function flattenTopics(node = GRAMMAR_TREE, list = []) {
  list.push(node);
  (node.children || []).forEach(child => flattenTopics(child, list));
  return list;
}

const TOPIC_ALIASES = {
  "words-parts-of-speech-nouns": "noun",
  "words-parts-of-speech-nouns-common-nouns": "common-noun",
  "words-parts-of-speech-nouns-common-nouns-concrete-nouns": "concrete-noun",
  "words-parts-of-speech-nouns-common-nouns-abstract-nouns": "abstract-noun",
  "words-parts-of-speech-nouns-proper-nouns": "proper-noun",
  "words-parts-of-speech-nouns-collective-nouns": "collective-noun",
  "words-parts-of-speech-nouns-compound-nouns": "compound-noun",
  "words-parts-of-speech-nouns-countable-uncountable-nouns": "countable-uncountable-noun",
  "words-parts-of-speech-pronouns": "pronoun",
  "words-parts-of-speech-pronouns-personal-pronouns": "personal-pronoun",
  "words-parts-of-speech-pronouns-possessive-pronouns": "possessive-pronoun",
  "words-parts-of-speech-pronouns-reflexive-pronouns": "reflexive-pronoun",
  "words-parts-of-speech-pronouns-relative-pronouns": "relative-pronoun",
  "words-parts-of-speech-pronouns-demonstrative-pronouns": "demonstrative-pronoun",
  "words-parts-of-speech-pronouns-interrogative-pronouns": "interrogative-pronoun",
  "words-parts-of-speech-pronouns-indefinite-pronouns": "indefinite-pronoun",
  "words-parts-of-speech-verbs": "verb",
  "words-parts-of-speech-verbs-main-verbs": "main-verb",
  "words-parts-of-speech-verbs-auxiliary-verbs": "auxiliary-verb",
  "words-parts-of-speech-verbs-modal-verbs": "modal-verb",
  "words-parts-of-speech-verbs-transitive-verbs": "transitive-verb",
  "words-parts-of-speech-verbs-intransitive-verbs": "intransitive-verb",
  "words-parts-of-speech-verbs-linking-verbs": "linking-verb",
  "words-parts-of-speech-verbs-phrasal-verbs": "phrasal-verb",
  "words-parts-of-speech-adjectives": "adjective",
  "words-parts-of-speech-adjectives-descriptive-adjectives": "descriptive-adjective",
  "words-parts-of-speech-adjectives-comparative-adjectives": "comparative-adjective",
  "words-parts-of-speech-adjectives-superlative-adjectives": "superlative-adjective",
  "words-parts-of-speech-adjectives-proper-adjectives": "proper-adjective",
  "words-parts-of-speech-adjectives-participial-adjectives": "participial-adjective",
  "words-parts-of-speech-adverbs": "adverb",
  "words-parts-of-speech-adverbs-manner": "adverb-of-manner",
  "words-parts-of-speech-adverbs-time": "adverb-of-time",
  "words-parts-of-speech-adverbs-place": "adverb-of-place",
  "words-parts-of-speech-adverbs-frequency": "adverb-of-frequency",
  "words-parts-of-speech-adverbs-degree": "adverb-of-degree",
  "words-parts-of-speech-adverbs-certainty": "adverb-of-certainty",
  "words-parts-of-speech-determiners": "determiner",
  "words-parts-of-speech-determiners-articles": "article",
  "words-parts-of-speech-determiners-articles-definite-the": "definite-article",
  "words-parts-of-speech-determiners-articles-indefinite-a-an": "indefinite-article",
  "words-parts-of-speech-determiners-demonstratives": "demonstrative",
  "words-parts-of-speech-determiners-possessives": "possessive-determiner",
  "words-parts-of-speech-determiners-quantifiers": "quantifier",
  "words-parts-of-speech-determiners-numbers": "number-determiner",
  "words-parts-of-speech-determiners-distributives": "distributive-determiner",
  "words-parts-of-speech-prepositions": "preposition",
  "words-parts-of-speech-prepositions-time": "preposition-of-time",
  "words-parts-of-speech-prepositions-place": "preposition-of-place",
  "words-parts-of-speech-prepositions-direction": "preposition-of-direction",
  "words-parts-of-speech-conjunctions": "conjunction",
  "words-parts-of-speech-conjunctions-coordinating": "coordinating-conjunction",
  "words-parts-of-speech-conjunctions-subordinating": "subordinating-conjunction",
  "words-parts-of-speech-conjunctions-correlative": "correlative-conjunction",
  "words-parts-of-speech-interjections": "interjection",
  "word-features-singular-plural": "singular-plural",
  "word-features-tense": "tense",
  "word-features-person": "person",
  "word-features-gender": "gender",
  "word-features-number": "number-feature",
  "word-features-comparison": "comparison",
  "word-features-voice": "voice",
  "phrases": "phrase",
  "phrases-noun-phrases": "noun-phrase",
  "phrases-noun-phrases-head-noun": "head-noun",
  "phrases-noun-phrases-determiners": "determiner",
  "phrases-noun-phrases-adjectives": "adjective",
  "phrases-noun-phrases-modifiers": "modifier",
  "phrases-verb-phrases": "verb-phrase",
  "phrases-verb-phrases-main-verb": "main-verb",
  "phrases-verb-phrases-helping-verbs": "helping-verb",
  "phrases-adjective-phrases": "adjective-phrase",
  "phrases-adverb-phrases": "adverb-phrase",
  "phrases-prepositional-phrases": "prepositional-phrase",
  "phrases-participial-phrases": "participial-phrase",
  "clauses": "clause",
  "clauses-main-independent-clauses": "main-clause",
  "clauses-subordinate-dependent-clauses": "subordinate-clause",
  "clauses-subordinate-dependent-clauses-relative-clauses": "relative-clause",
  "clauses-subordinate-dependent-clauses-adverbial-clauses": "adverbial-clause",
  "clauses-subordinate-dependent-clauses-noun-clauses": "noun-clause",
  "clauses-subordinate-dependent-clauses-conditional-clauses": "conditional-clause",
  "sentence-elements-subject": "subject",
  "sentence-elements-predicate": "predicate",
  "sentence-elements-object": "object",
  "sentence-elements-object-direct-object": "direct-object",
  "sentence-elements-object-indirect-object": "indirect-object",
  "sentence-elements-complement": "complement",
  "sentence-elements-modifier": "modifier",
  "sentence-types-simple": "simple-sentence",
  "sentence-types-compound": "compound-sentence",
  "sentence-types-complex": "complex-sentence",
  "sentence-types-compound-complex": "compound-complex-sentence",
  "sentence-purposes-statement-declarative": "statement",
  "sentence-purposes-question-interrogative": "question",
  "sentence-purposes-command-imperative": "command",
  "sentence-purposes-exclamation-exclamatory": "exclamation",
  "punctuation": "punctuation",
  "punctuation-full-stop": "full-stop",
  "punctuation-comma": "comma",
  "punctuation-apostrophe": "apostrophe",
  "punctuation-question-mark": "question-mark",
  "punctuation-exclamation-mark": "exclamation-mark",
  "punctuation-colon": "colon",
  "punctuation-semicolon": "semicolon",
  "punctuation-dash": "dash",
  "punctuation-hyphen": "hyphen",
  "punctuation-brackets": "brackets",
  "punctuation-quotation-marks": "quotation-marks",
  "advanced-grammar-active-voice": "active-voice",
  "advanced-grammar-passive-voice": "passive-voice",
  "advanced-grammar-direct-speech": "direct-speech",
  "advanced-grammar-indirect-speech": "indirect-speech",
  "advanced-grammar-conditionals": "conditionals",
  "advanced-grammar-relative-pronouns": "relative-pronoun",
  "advanced-grammar-cohesion": "cohesion",
  "advanced-grammar-formality": "formality",
  "advanced-grammar-register": "register"
};

const TERM_INFO = {
  "grammar": ["Grammar is the system writers use to organise words into clear meaning.", "Grammar describes word classes, phrases, clauses, sentence patterns, punctuation, and choices that shape meaning.", "The small dog barked loudly, and the reader knows who did what.", "Grammar labels explain the jobs words and groups are doing."],
  "words-parts-of-speech": ["Parts of speech are the main jobs words can do.", "A part of speech is a word class such as noun, verb, adjective, adverb, determiner, preposition, conjunction, or interjection.", "The bright bird sang softly.", "Naming the word class helps explain how each word helps the sentence."],
  "word-features": ["Word features are grammar details that change or describe a word's form or meaning.", "Features such as tense, number, person, gender, comparison, and voice help words agree and carry precise meaning.", "She walks today, but they walked yesterday.", "Features help pupils notice agreement, time, and point of view."],
  "sentence": ["A sentence is a complete written idea with suitable punctuation.", "A sentence contains at least one main clause or an understood command and is marked in writing by punctuation.", "Close the gate before the dog runs out.", "Sentences help readers know where one complete idea ends and another begins."],
  "sentence-elements": ["Sentence elements are the main jobs inside a clause.", "Subject, predicate, object, complement, and modifier describe how parts of a clause relate to the verb.", "The cat chased the string under the chair.", "Sentence elements show who did what, to whom, and with what extra detail."],
  "sentence-types": ["Sentence types describe how clauses are combined.", "Simple, compound, complex, and compound-complex sentences are classified by their main and subordinate clauses.", "I smiled, and Ravi waved because the show had ended.", "Sentence type helps writers vary rhythm and connect ideas clearly."],
  "sentence-purposes": ["Sentence purposes explain what a sentence is doing for the reader.", "Declarative, interrogative, imperative, and exclamatory sentences state, ask, command, or exclaim.", "Please close the gate.", "Purpose helps pupils choose word order and punctuation."],
  "advanced-grammar": ["Advanced grammar looks at choices that shape style, clarity, and relationships between ideas.", "Topics such as voice, speech, cohesion, formality, and register explain how writers control emphasis and audience.", "The window was broken during the storm.", "Advanced grammar helps pupils make deliberate writing choices."],
  "noun": ["A noun names a person, place, thing, animal, or idea.", "A noun is a word that can act as the head of a noun phrase and often works as a subject, object, or complement.", "The dragon guarded the treasure.", "Nouns tell readers who or what the sentence is about."],
  "common-noun": ["A common noun names a general person, place, thing, animal, or idea.", "Common nouns name classes of things rather than unique names and usually do not take capital letters unless starting a sentence.", "The teacher opened the window.", "Common nouns help writers name everyday things without using a special name."],
  "proper-noun": ["A proper noun is the special name of a person, place, organisation, day, or title.", "Proper nouns refer to specific named entities and normally begin with capital letters in English.", "Amira visited London in July.", "Capital letters help readers spot exact names."],
  "abstract-noun": ["An abstract noun names an idea, quality, feeling, or state that you cannot touch.", "Abstract nouns refer to concepts rather than physical objects.", "Courage helped Mina speak clearly.", "Abstract nouns let writers discuss thoughts, feelings, and values."],
  "concrete-noun": ["A concrete noun names something that can be seen, heard, touched, tasted, or smelled.", "Concrete nouns refer to physical people, places, animals, or things.", "The warm bread smelled delicious.", "Concrete nouns make writing easier to picture."],
  "collective-noun": ["A collective noun names a group as one thing.", "Collective nouns such as team, flock, and crowd are singular in form when the group acts as one unit.", "The choir sang beautifully.", "Collective nouns help writers talk about groups precisely."],
  "compound-noun": ["A compound noun is made from two or more words working together as one noun.", "Compound nouns may be closed, open, or hyphenated, such as toothbrush, ice cream, or passer-by.", "My toothbrush fell behind the sink.", "Compound nouns name specific things more exactly."],
  "countable-uncountable-noun": ["Countable nouns can be counted; uncountable nouns name things not usually counted one by one.", "Countable nouns have singular and plural forms, while uncountable nouns often use amount words such as some, much, or a piece of.", "Three apples rolled beside some rice.", "This helps pupils choose determiners such as many or much."],
  "pronoun": ["A pronoun stands in for a noun or noun phrase.", "Pronouns refer to people, things, ideas, or whole noun phrases and help avoid needless repetition.", "Amira found the shell, and she kept it.", "Pronouns keep writing smooth, but the reader must know what they refer to."],
  "personal-pronoun": ["A personal pronoun refers to a speaker, listener, or other person or thing.", "Personal pronouns include I, me, you, he, she, it, we, us, they, and them.", "They helped us after school.", "Personal pronouns show who is involved in the sentence."],
  "possessive-pronoun": ["A possessive pronoun shows ownership and stands alone.", "Possessive pronouns include mine, yours, his, hers, ours, and theirs; they replace a noun phrase.", "The red pencil is mine.", "Possessive pronouns prevent repeated phrases such as my pencil again and again."],
  "reflexive-pronoun": ["A reflexive pronoun points back to the subject.", "Reflexive pronouns end in -self or -selves and are used when the subject and object refer to the same person or thing.", "Lena taught herself a new song.", "They show that the action turns back to the doer."],
  "relative-pronoun": ["A relative pronoun introduces a clause that adds information about a noun.", "Relative pronouns such as who, which, and that link a relative clause to the noun it describes.", "The pupil who won the race smiled.", "Relative pronouns help add detail without starting a new sentence."],
  "demonstrative-pronoun": ["A demonstrative pronoun points to a whole person or thing: this, that, these, or those.", "It replaces a noun phrase instead of sitting before a noun.", "These are delicious, but that is too spicy.", "It helps readers know which thing is being discussed when the noun is not repeated."],
  "interrogative-pronoun": ["An interrogative pronoun asks about a person or thing.", "Who, whom, whose, which, and what can begin questions and stand for the missing answer.", "Who left the muddy boots here?", "Interrogative pronouns help form clear questions."],
  "indefinite-pronoun": ["An indefinite pronoun refers to a person or thing without saying exactly which one.", "Words such as someone, anything, everyone, and nobody refer generally rather than specifically.", "Someone knocked on the classroom door.", "They help writers discuss unknown or general people and things."],
  "verb": ["A verb shows an action, being, or having.", "A verb forms the heart of a clause and expresses action, state, occurrence, or relationship.", "Maya jumped over the puddle.", "A clause needs a verb, so finding it helps unlock the sentence."],
  "main-verb": ["A main verb carries the central action or state in a clause.", "The main verb is the lexical verb in a verb phrase; auxiliaries may support it.", "The dog has barked loudly.", "The main verb tells the key happening or state."],
  "auxiliary-verb": ["An auxiliary verb helps a main verb show tense, question form, negative form, or voice.", "Auxiliaries include be, have, and do when they support another verb.", "We are waiting by the gate.", "Auxiliaries help pupils understand verb phrases, questions, and negatives."],
  "modal-verb": ["A modal verb shows possibility, ability, permission, or obligation.", "Modal auxiliaries include can, could, may, might, must, shall, should, will, and would.", "You should check your answer.", "Modals change the strength or attitude of the verb."],
  "transitive-verb": ["A transitive verb needs a direct object to complete its meaning.", "The action of a transitive verb passes to a noun phrase object.", "Ravi kicked the ball.", "Knowing this helps pupils find objects."],
  "intransitive-verb": ["An intransitive verb does not need a direct object.", "Its meaning is complete without an object, though modifiers may add detail.", "The baby slept peacefully.", "It prevents pupils from hunting for an object that is not there."],
  "linking-verb": ["A linking verb connects the subject to more information about it.", "Linking verbs such as be, seem, become, and feel connect a subject to a complement.", "The soup smells delicious.", "Linking verbs explain states rather than actions."],
  "phrasal-verb": ["A phrasal verb is a verb plus a small word that creates a special meaning.", "The particle in a phrasal verb, such as up or off, belongs with the verb meaning.", "The children lined up quietly.", "Recognising phrasal verbs stops pupils labelling the small word in isolation."],
  "adjective": ["An adjective describes or classifies a noun or pronoun.", "Adjectives modify noun phrases by adding qualities such as size, colour, opinion, origin, or type.", "The bright moon shone above the hill.", "Adjectives make noun phrases more precise."],
  "descriptive-adjective": ["A descriptive adjective tells what a noun is like.", "It adds a quality, condition, colour, size, shape, or opinion to a noun phrase.", "The noisy engine rattled.", "Descriptive adjectives create clearer pictures for readers."],
  "comparative-adjective": ["A comparative adjective compares two people or things.", "Comparatives often use -er or more to show a higher or lower degree.", "This tower is taller than that tower.", "Comparatives help writers show differences."],
  "superlative-adjective": ["A superlative adjective compares one person or thing with a whole group.", "Superlatives often use -est or most to show the highest or lowest degree.", "Mina chose the smallest shell.", "Superlatives help writers identify extremes."],
  "proper-adjective": ["A proper adjective is formed from a proper noun and usually starts with a capital letter.", "Proper adjectives classify nouns by named origin or connection.", "We studied Roman roads.", "They show a noun's link to a specific place, person, or culture."],
  "participial-adjective": ["A participial adjective is formed from a verb but describes a noun.", "Participial adjectives often end in -ing or -ed, such as sparkling or broken.", "The broken gate creaked.", "They add detail while looking like verb forms."],
  "adverb": ["An adverb gives more information about a verb, adjective, clause, or another adverb.", "Adverbs can show manner, time, place, frequency, degree, or certainty.", "The runner moved quickly around the track.", "Adverbs sharpen how, when, where, or how strongly something happens."],
  "adverb-of-manner": ["An adverb of manner tells how something happens.", "It modifies a verb by describing the way an action is done.", "Sam whispered quietly.", "It helps readers imagine the action."],
  "adverb-of-time": ["An adverb of time tells when something happens.", "It places an action or state in time.", "We will practise tomorrow.", "It helps organise events."],
  "adverb-of-place": ["An adverb of place tells where something happens.", "It modifies a verb by adding location or direction.", "The children ran outside.", "It helps readers track movement and setting."],
  "adverb-of-frequency": ["An adverb of frequency tells how often something happens.", "It modifies a verb with frequency such as always, often, sometimes, or never.", "Maya often reads before breakfast.", "It helps describe habits and routines."],
  "adverb-of-degree": ["An adverb of degree tells how much or how strongly.", "It modifies adjectives, verbs, or adverbs to show intensity.", "The puzzle was very tricky.", "It helps writers control strength."],
  "adverb-of-certainty": ["An adverb of certainty shows how sure the writer or speaker is.", "It modifies a clause or verb phrase with words such as definitely, probably, or possibly.", "We will definitely finish today.", "It shows confidence or doubt."],
  "determiner": ["A determiner introduces a noun and helps identify it.", "Determiners come before nouns in noun phrases and show which one, whose one, how many, or how much.", "Those three ducks crossed the path.", "Determiners guide readers to the right noun."],
  "article": ["An article is one of the determiners a, an, or the used before a noun.", "Articles are determiners that mark a noun as specific or not specific.", "An owl landed on the roof.", "Articles help readers know whether a noun is new, general, or already known."],
  "definite-article": ["The definite article is the word the.", "The marks a noun as specific or already identifiable to the reader.", "The moon rose behind the trees.", "It tells readers that the writer means a particular noun."],
  "indefinite-article": ["The indefinite articles are a and an.", "A and an introduce a singular countable noun that is not yet specific to the reader.", "An acorn fell from a branch.", "They introduce new examples of something."],
  "demonstrative": ["A demonstrative points out which noun you mean: this, that, these, or those.", "As determiners, demonstratives sit before nouns; as pronouns, they can stand alone.", "These apples are ripe, but those pears are hard.", "They help readers know near/far and singular/plural choices."],
  "possessive-determiner": ["A possessive determiner shows who something belongs to and comes before a noun.", "My, your, his, her, its, our, and their are possessive determiners.", "Their coats hung by the door.", "They connect a noun to an owner without using an apostrophe."],
  "quantifier": ["A quantifier tells how much or how many.", "Quantifiers such as many, few, several, much, and some express amount in a noun phrase.", "Several pupils brought some fruit.", "Quantifiers help writers be precise about amount."],
  "number-determiner": ["A number determiner tells exact amount or order before a noun.", "Cardinal and ordinal numbers can function as determiners in noun phrases.", "Three cats slept on the first sofa.", "Numbers help readers count or order nouns."],
  "distributive-determiner": ["A distributive determiner refers to members of a group separately.", "Each, every, either, and neither can introduce a noun while focusing on individuals in a set.", "Each pupil chose a book.", "They help writers talk about group members one by one."],
  "preposition": ["A preposition begins a phrase that shows a relationship such as place, time, or direction.", "A preposition heads a prepositional phrase with an object noun phrase.", "The keys are under the blue mat.", "Prepositions connect ideas in space, time, and logic."],
  "preposition-of-time": ["A preposition of time shows when something happens.", "Words such as before, after, during, at, on, and in can introduce time phrases.", "We arrived after lunch.", "Time prepositions help sequence events."],
  "preposition-of-place": ["A preposition of place shows where something is.", "Words such as in, on, under, beside, and between introduce place phrases.", "The cat slept under the table.", "Place prepositions build clear settings."],
  "preposition-of-direction": ["A preposition of direction shows movement toward, from, or along somewhere.", "Words such as to, into, through, across, and toward introduce direction phrases.", "The fox ran across the field.", "Direction prepositions make movement clear."],
  "conjunction": ["A conjunction joins words, phrases, clauses, or sentences.", "Conjunctions connect grammatical units and show relationships such as addition, contrast, cause, or choice.", "I packed lunch because the trip was long.", "Conjunctions help writers link ideas logically."],
  "coordinating-conjunction": ["A coordinating conjunction joins equal grammar units.", "For, and, nor, but, or, yet, and so can join words, phrases, or main clauses of equal status.", "I wanted to play, but it rained.", "They help writers balance linked ideas."],
  "subordinating-conjunction": ["A subordinating conjunction begins a clause that depends on another clause.", "Words such as because, although, when, if, and while introduce subordinate clauses.", "We stayed inside because it rained.", "They show relationships such as reason, time, condition, or contrast."],
  "correlative-conjunction": ["Correlative conjunctions work in pairs.", "Pairs such as either/or, neither/nor, and both/and join balanced words, phrases, or clauses.", "Either Ravi or Mina will read aloud.", "They help writers join alternatives or paired ideas neatly."],
  "interjection": ["An interjection is a short word or phrase that shows sudden feeling.", "Interjections stand outside the main grammar of a sentence and often take commas or exclamation marks.", "Wow! The rainbow is bright.", "They show emotion, surprise, or reaction."],
  "singular-plural": ["Singular means one; plural means more than one.", "Number on nouns and verbs helps show whether the sentence is about one thing or several things.", "One bird sings, but three birds sing.", "It helps pupils match nouns, determiners, and verbs."],
  "tense": ["Tense shows when a verb happens.", "English tense and aspect use verb forms and auxiliaries to place actions in present, past, or future time and show completion or continuation.", "Maya walked yesterday, and she is walking today.", "Tense keeps writing clear about time."],
  "person": ["Person shows whether language refers to the speaker, the listener, or someone else.", "First person, second person, and third person affect pronouns and some verb forms.", "I am ready, you are ready, and she is ready.", "Person helps pupils choose pronouns and verb agreement."],
  "gender": ["Gender is a grammar feature that can show whether a word refers to male, female, neutral, or unknown/unspecified.", "In modern English, most nouns do not have grammatical gender. Gender is usually shown through meaning and pronoun choice, such as he, she, it, or they. This is different from languages such as French or Spanish, where many nouns have grammatical gender.", "The girl said she was ready.", "Understanding gender helps pupils choose suitable pronouns and avoid assuming that English nouns work like nouns in some other languages."],
  "number-feature": ["Number is a grammar feature that shows one or more than one.", "In English, number appears in nouns, pronouns, determiners, and some verb forms.", "This apple is ripe, but these apples are not.", "Number helps words agree with each other."],
  "comparison": ["Comparison shows whether a description is equal, higher, or highest.", "Adjectives and adverbs can use positive, comparative, and superlative forms.", "This path is longer than the old path.", "Comparison helps writers rank or contrast qualities."],
  "voice": ["Voice shows whether the subject does the action or receives it.", "Active and passive voice change the relationship between subject, verb, and object without necessarily changing the event.", "The goalkeeper saved the shot.", "Voice controls emphasis in a sentence."],
  "active-voice": ["Active voice puts the doer of the action as the subject.", "In active clauses, the subject typically performs the verb's action.", "The goalkeeper saved the shot.", "Active voice is often direct and clear."],
  "passive-voice": ["Passive voice puts the receiver of the action as the subject.", "Passive clauses use a form of be plus a past participle, and the doer may appear in a by-phrase or be omitted.", "The shot was saved by the goalkeeper.", "Passive voice is useful when the receiver matters most or the doer is unknown."],
  "phrase": ["A phrase is a group of words that works as one unit but does not contain a complete clause by itself.", "Phrases can act as nouns, verbs, adjectives, adverbs, or prepositional groups inside clauses.", "The small dog slept in the garden.", "Phrases let writers build detail inside clauses."],
  "noun-phrase": ["A noun phrase is a group built around a noun or pronoun.", "It may include determiners, adjectives, and modifiers, but the head noun or pronoun is the core.", "The nervous brown rabbit hid behind the shed.", "Noun phrases name participants, objects, and ideas in sentences."],
  "head-noun": ["The head noun is the main noun in a noun phrase.", "Other words in the noun phrase depend on the head noun and describe or identify it.", "The nervous brown rabbit hid.", "Finding the head noun helps pupils see what the phrase is mainly about."],
  "verb-phrase": ["A verb phrase is built around a main verb.", "It may include auxiliaries, modals, negatives, and particles that work with the main verb.", "The children have been waiting quietly.", "Verb phrases show the action or state and its time or attitude."],
  "helping-verb": ["A helping verb supports the main verb in a verb phrase.", "Helping verbs include auxiliaries and modals such as is, have, do, can, and must.", "Sam is reading a mystery.", "Helping verbs build tense, questions, negatives, and possibility."],
  "adjective-phrase": ["An adjective phrase acts like an adjective.", "It modifies a noun or pronoun and may contain an adjective with its own modifiers or complements.", "The box was full of shells.", "Adjective phrases add richer description."],
  "adverb-phrase": ["An adverb phrase acts like an adverb.", "It modifies a verb, adjective, adverb, or whole clause.", "The team worked very carefully.", "Adverb phrases give fuller information about manner, time, place, or degree."],
  "prepositional-phrase": ["A prepositional phrase begins with a preposition and includes its object.", "The preposition plus its object and modifiers acts as a unit in the sentence.", "The cat slept under the table.", "Prepositional phrases add place, time, direction, or other relationships."],
  "participial-phrase": ["A participial phrase begins with a participle and adds information about a noun.", "It uses an -ing or -ed verb form with its own objects or modifiers but acts adjectivally.", "Shivering in the wind, the puppy waited.", "Participial phrases add compact detail about nouns."],
  "clause": ["A clause is a group of words with a verb.", "A clause contains a predicate and usually a subject; it may be main or subordinate.", "Although it rained, we played football.", "Clauses are the building blocks of sentences."],
  "main-clause": ["A main clause can stand alone as a complete sentence.", "An independent clause contains a subject and predicate and expresses a complete idea.", "We played football after lunch.", "Main clauses carry the central message."],
  "subordinate-clause": ["A subordinate clause has a verb but cannot stand alone as a complete sentence.", "It depends on a main clause and often begins with a subordinating conjunction or relative pronoun.", "Because it rained, we stayed inside.", "Subordinate clauses add reasons, times, conditions, or extra information."],
  "relative-clause": ["A relative clause adds information about a noun.", "It is a subordinate clause often introduced by who, which, that, whose, where, or when.", "The book that you lent me is exciting.", "Relative clauses help combine description with a noun."],
  "adverbial-clause": ["An adverbial clause adds information such as time, reason, condition, place, or contrast.", "It is a subordinate clause that modifies a verb phrase or whole clause.", "When the bell rang, the pupils lined up.", "Adverbial clauses explain circumstances around the main idea."],
  "noun-clause": ["A noun clause works like a noun inside a sentence.", "It is a subordinate clause that can act as a subject, object, or complement.", "I know that the answer is correct.", "Noun clauses let whole ideas fill noun jobs."],
  "conditional-clause": ["A conditional clause gives a condition for another idea.", "It often begins with if or unless and works with a main clause to show result.", "If it rains, we will read indoors.", "Conditional clauses help writers explain possibilities and consequences."],
  "subject": ["The subject is who or what the clause is about.", "The subject usually controls verb agreement and often comes before the verb in statements.", "The brave mouse escaped through the crack.", "Finding the subject helps pupils identify the main participant."],
  "predicate": ["The predicate says what the subject does, is, has, or experiences.", "It includes the verb phrase and any objects, complements, or modifiers linked to that verb.", "The brave mouse escaped through the crack.", "The predicate carries the main information about the subject."],
  "object": ["An object receives or is affected by the verb's action.", "Objects are complements of verbs and are often noun phrases.", "The cat chased the string.", "Objects help explain what or whom the action affects."],
  "direct-object": ["A direct object receives the action directly.", "It is the noun phrase answering what or whom after a transitive verb.", "Ravi kicked the ball.", "Direct objects complete many action verbs."],
  "indirect-object": ["An indirect object receives the direct object or benefits from the action.", "It often appears between the verb and direct object or in a to/for phrase.", "Mina gave Sam a sticker.", "Indirect objects show who receives something."],
  "complement": ["A complement completes the meaning of a verb, subject, or object.", "Complements are required by some verbs and can describe or identify another element.", "The soup smells delicious.", "Complements stop the sentence feeling unfinished."],
  "modifier": ["A modifier adds extra detail to another word or group.", "Modifiers can be words, phrases, or clauses that describe, limit, or qualify meaning.", "The bird in the tree sang sweetly.", "Modifiers make writing more specific."],
  "simple-sentence": ["A simple sentence has one main clause.", "It contains one independent clause, though that clause may contain phrases and compound parts.", "The bird in the tree sang sweetly.", "Simple sentences can be clear and powerful."],
  "compound-sentence": ["A compound sentence joins two or more main clauses.", "The clauses are usually linked by a coordinating conjunction or semicolon.", "The rain stopped, and the sun appeared.", "Compound sentences show equal ideas side by side."],
  "complex-sentence": ["A complex sentence has a main clause and at least one subordinate clause.", "It combines independent and dependent clauses to show relationships such as time, reason, or condition.", "Although it was late, we finished the game.", "Complex sentences help writers explain how ideas depend on each other."],
  "compound-complex-sentence": ["A compound-complex sentence has at least two main clauses and one subordinate clause.", "It combines coordination and subordination in one sentence.", "Because it rained, we stayed inside, and Maya made soup.", "It helps writers connect several related ideas accurately."],
  "statement": ["A statement tells the reader something.", "A declarative sentence makes a statement and usually ends with a full stop.", "The library closes at five o'clock.", "Statements are the most common way to give information."],
  "question": ["A question asks for information or confirmation.", "An interrogative sentence often uses question word order or a question word and ends with a question mark.", "Where did you put the map?", "Questions invite an answer."],
  "command": ["A command tells someone to do something.", "An imperative sentence often has an implied subject, you, and begins with a base verb.", "Please close the gate.", "Commands help writers give instructions clearly."],
  "exclamation": ["An exclamation shows strong feeling.", "An exclamatory sentence expresses surprise, excitement, anger, or another strong emotion and often ends with an exclamation mark.", "What a brilliant goal!", "Exclamations add emotion when used carefully."],
  "punctuation": ["Punctuation marks help readers understand how writing is organised.", "Punctuation includes marks such as full stops, commas, apostrophes, question marks, and colons.", "Wait, Sam, before you cross the road.", "Punctuation guides meaning, pauses, questions, lists, and ownership."],
  "full-stop": ["A full stop ends a statement or many commands.", "It marks the end of a complete declarative or imperative sentence.", "We arrived before lunch.", "Full stops help readers separate complete ideas."],
  "comma": ["A comma separates parts of a sentence.", "Commas can separate list items, introductory elements, names in direct address, or clauses where needed for clarity.", "Yes, Mina, I packed pens, glue, and card.", "Commas help readers group information correctly."],
  "apostrophe": ["An apostrophe can show missing letters or possession.", "Apostrophes mark contractions and possessive noun forms in English.", "Mina's bag isn't on the hook.", "Apostrophes clarify ownership and contractions."],
  "question-mark": ["A question mark ends a direct question.", "It replaces a full stop at the end of an interrogative sentence or direct question.", "Where is the library?", "Question marks tell readers to hear the sentence as a question."],
  "exclamation-mark": ["An exclamation mark shows strong feeling or force.", "It marks exclamations, urgent commands, or strong reactions.", "Stop! The glass is falling!", "It signals emotion or urgency, so it should not be overused."],
  "colon": ["A colon introduces something that explains, expands, or lists what came before.", "A colon can introduce a list, explanation, quotation, or result after an independent clause.", "Bring three things: pens, glue, and card.", "Colons prepare readers for extra information."],
  "semicolon": ["A semicolon links closely related main clauses.", "It is stronger than a comma and weaker than a full stop; both sides should be able to stand as sentences.", "It rained all morning; the match was cancelled.", "Semicolons show a close connection between complete ideas."],
  "dash": ["A dash marks a break, extra thought, or sudden change.", "Dashes can set off parenthetical information or emphasise an added idea.", "The answer was clear — we had to leave.", "Dashes can create emphasis, but too many make writing choppy."],
  "hyphen": ["A hyphen joins parts of some words.", "Hyphens appear in some compound words, prefixes, numbers, and compound modifiers.", "The well-known author visited school.", "Hyphens can prevent misreading."],
  "brackets": ["Brackets hold extra information inside a sentence.", "Parentheses add an aside, explanation, or clarification that is not essential to the main sentence.", "The fossil (found in 2020) is on display.", "Brackets let writers add quiet extra detail."],
  "quotation-marks": ["Quotation marks show direct speech or quoted words.", "They mark the exact words someone said or words taken from another source.", "Mina said, “I found the key.”", "Quotation marks help readers separate spoken or quoted words from narration."],
  "direct-speech": ["Direct speech gives the exact words someone says.", "It uses quotation marks and often a reporting clause.", "Ravi said, “I can help.”", "Direct speech makes dialogue clear and lively."],
  "indirect-speech": ["Indirect speech reports what someone said without quoting the exact words.", "It usually changes pronouns, tense, and word order from the original speech.", "Ravi said that he could help.", "Indirect speech summarises speech smoothly."],
  "conditionals": ["Conditionals show that one idea depends on another.", "Conditional sentences often use if or unless clauses to connect condition and result.", "If you stir the paint, the colour will mix.", "Conditionals help writers explain possibilities, rules, and results."],
  "cohesion": ["Cohesion is how parts of a text stick together.", "Pronouns, repeated key words, conjunctions, adverbials, and paragraph links create cohesion.", "Mina found a shell. She placed it carefully in her bag.", "Cohesion helps readers follow ideas across sentences."],
  "formality": ["Formality is how serious, official, or relaxed language sounds.", "Writers choose vocabulary, contractions, sentence structures, and tone to suit the situation.", "Please return the form by Friday.", "Formality helps writing fit its purpose and audience."],
  "register": ["Register is the style of language chosen for a particular audience, purpose, or situation.", "Register includes levels of formality, technical vocabulary, and tone.", "Dear Councillor, I am writing to request a safer crossing.", "Register helps writers sound appropriate for the context."],
  "emotion": ["An emotion interjection shows a sudden feeling.", "Words such as hooray, ouch, and alas can express emotion outside the main clause.", "Ouch! That nettle stung me.", "It shows the speaker's reaction quickly."],
  "surprise": ["A surprise interjection shows that something is unexpected.", "Words such as wow, oh, and goodness can signal surprise.", "Wow! The magician vanished.", "It helps readers hear a sudden reaction."],
  "greeting": ["A greeting interjection opens contact with someone.", "Words such as hello, hi, and hey can stand apart from the rest of a sentence.", "Hello, Sam, welcome back.", "It helps show social interaction in speech or writing."]
};

const CARD_OVERRIDES = {
  "gender": {
    simpleMeaning: "Gender is a grammar feature that can show whether a word refers to male, female, neutral, or unknown/unspecified.",
    formalMeaning: "In modern English, most nouns do not have grammatical gender. Gender is usually shown through meaning and pronoun choice, such as he, she, it, or they. This is different from languages such as French or Spanish, where many nouns have grammatical gender.",
    whyItMatters: "Understanding gender helps pupils choose suitable pronouns and avoid assuming that English nouns work like nouns in some other languages.",
    examples: [
      cardExample("The girl said she was ready.", "She points back to the girl, a female person."),
      cardExample("The boy said he was ready.", "He points back to the boy, a male person."),
      cardExample("The robot moved because it was switched on.", "It is the usual pronoun for an ordinary object or machine."),
      cardExample("Alex forgot their book.", "Their can refer to someone unspecified or to a person who uses they/them pronouns.")
    ],
    nonExamples: [cardExample("The table is happy because she is clean.", "In normal English, “table” is not treated as female. We usually use “it”.")],
    howToSpot: ["Look for pronouns such as he, she, it, and they.", "Ask whether the noun refers to a male person, female person, thing, animal, or someone unspecified.", "Remember that most English objects use “it”."],
    commonMistakes: ["Thinking every English noun has masculine or feminine gender.", "Using “he” or “she” for ordinary objects.", "Confusing natural gender with grammatical gender."],
    miniQuiz: { question: "Which pronoun usually refers to “the girl”?", options: ["he", "she", "it", "them"], answer: "she", explanation: "“She” is commonly used for a female person." },
    teacherPrompt: "Ask the child: “Which noun does the pronoun point back to, and does the pronoun choice make sense?”"
  }
};

function articleFor(text) { return /^[aeiou]/i.test(text) ? "an" : "a"; }
function makeLearningCard(node) {
  const alias = TOPIC_ALIASES[node.id] || slugify(node.title);
  const info = TERM_INFO[alias] || TERM_INFO[slugify(node.title)] || TERM_INFO.grammar;
  const readable = node.title.replace(/ \(.+\)/, "");
  const base = {
    id: node.id,
    title: node.title,
    category: node.category,
    simpleMeaning: info[0],
    formalMeaning: info[1],
    whyItMatters: info[3],
    examples: [cardExample(info[2], `This sentence shows ${readable.toLowerCase()} in context.`)],
    nonExamples: [cardExample("The label does not fit if the word or group is doing a different job.", `A word should only be called ${articleFor(readable)} ${readable.toLowerCase()} when it matches the definition above.`)],
    howToSpot: [`Find ${readable.toLowerCase()} by checking its job in the sentence.`, "Use the example sentence to prove the label, not just the word's shape.", "Ask what the word or group is doing for the reader."],
    commonMistakes: [`Do not label every similar-looking word as ${articleFor(readable)} ${readable.toLowerCase()}; check the sentence job.`, "Do not ignore nearby words that may change the label.", "Do not confuse the example with the definition."],
    miniQuiz: { question: `Which option best matches ${readable}?`, options: [readable, "Paragraph", "Handwriting", "Spelling list"], answer: readable, explanation: `${readable} is the grammar feature explained on this card.` },
    teacherPrompt: `Ask the child: “What evidence in the sentence proves this is ${readable.toLowerCase()}?”`,
    ageLevel: node.id.includes("advanced") || node.id.includes("compound-complex") || node.id.includes("passive") ? "advanced" : node.id.split("-").length > 3 ? "middle" : "easy",
    status: "complete"
  };
  return { ...base, ...(CARD_OVERRIDES[alias] || {}) };
}

const LEARNING_CARDS = [...flattenTopics().map(makeLearningCard), makeLearningCard({ id: "sentence", title: "Sentence", category: "sentence-types" })];
const LEARNING_CARD_BY_ID = Object.fromEntries(LEARNING_CARDS.map(card => [card.id, card]));
function getLearningCard(id) { return LEARNING_CARD_BY_ID[id] || null; }
function getTopicIdForTitle(title) {
  const found = flattenTopics().find(node => node.title === title);
  return found ? found.id : slugify(title);
}

function validateLearningCards() {
  const topics = flattenTopics();
  const missingCards = topics.filter(topic => !LEARNING_CARD_BY_ID[topic.id]).map(topic => ({ id: topic.id, title: topic.title }));
  const cardIssues = LEARNING_CARDS.map(card => {
    const text = JSON.stringify(card).toLowerCase();
    const issues = [];
    if (!card.simpleMeaning || card.simpleMeaning.length < 30) issues.push("simpleMeaning missing or too short");
    if (card.title !== "GRAMMAR" && card.simpleMeaning === TERM_INFO.grammar[0]) issues.push("simpleMeaning too generic");
    if (!card.formalMeaning) issues.push("formalMeaning missing");
    if (!card.examples || !card.examples.length) issues.push("examples missing");
    if (!card.howToSpot || !card.howToSpot.length) issues.push("howToSpot missing");
    if (!card.commonMistakes || !card.commonMistakes.length) issues.push("commonMistakes missing");
    if (!card.miniQuiz || !card.miniQuiz.question || !card.miniQuiz.options || !card.miniQuiz.answer || !card.miniQuiz.explanation) issues.push("miniQuiz missing");
    const banned = BANNED_PLACEHOLDER_PHRASES.filter(phrase => text.includes(phrase.toLowerCase()));
    if (banned.length) issues.push(`banned placeholder phrase: ${banned.join(", ")}`);
    if (card.status !== "complete") issues.push("status needs review");
    return { id: card.id, title: card.title, issues };
  }).filter(item => item.issues.length);
  return {
    totalCards: LEARNING_CARDS.length,
    completeCards: LEARNING_CARDS.filter(card => card.status === "complete" && !cardIssues.some(issue => issue.id === card.id)).length,
    cardsNeedingReview: cardIssues,
    missingCards,
    bannedPlaceholderCards: cardIssues.filter(item => item.issues.some(issue => issue.includes("banned placeholder phrase")))
  };
}

const CONTENT_QUALITY_REPORT = validateLearningCards();

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

const GLOSSARY_EXAMPLES = {
  "noun": "The <mark>river</mark> curved through the valley.",
  "pronoun": "Mina smiled because <mark>she</mark> had solved the puzzle.",
  "verb": "The fox <mark>jumped</mark> over the log.",
  "adjective": "The <mark>bright</mark> moon lit the path.",
  "adverb": "Sam walked <mark>quietly</mark> past the nursery.",
  "determiner": "<mark>The</mark> owl landed on <mark>my</mark> fence.",
  "article": "<mark>An</mark> owl landed on the roof.",
  "demonstrative": "<mark>That</mark> book belongs on this shelf.",
  "possessive": "<mark>Mina's</mark> hat blew across the playground.",
  "quantifier": "<mark>Many</mark> apples fell from the tree.",
  "number": "<mark>Three</mark> cats slept on the sofa.",
  "preposition": "The ball rolled <mark>under</mark> the bed.",
  "conjunction": "We stayed inside <mark>because</mark> it rained.",
  "interjection": "<mark>Wow!</mark> The rainbow is bright.",
  "phrase": "<mark>The blue car</mark> stopped outside school.",
  "noun phrase": "<mark>The tiny mouse</mark> hid behind the box.",
  "verb phrase": "The children <mark>have been waiting</mark> patiently.",
  "adjective phrase": "The jar was <mark>full of beans</mark>.",
  "adverb phrase": "The team worked <mark>very quickly</mark>.",
  "prepositional phrase": "The rabbit slept <mark>in the garden</mark>.",
  "clause": "<mark>We smiled</mark> when the music started.",
  "main clause": "<mark>The sun rose</mark> before we left.",
  "subordinate clause": "We went indoors <mark>because it rained</mark>.",
  "relative clause": "The runner <mark>who won the race</mark> waved.",
  "subject": "<mark>The cat</mark> slept on the mat.",
  "predicate": "The cat <mark>slept on the mat</mark>.",
  "object": "Ravi kicked <mark>the ball</mark>.",
  "direct object": "Lena read <mark>a book</mark>.",
  "indirect object": "Mina gave <mark>Sam</mark> a gift.",
  "complement": "The soup is <mark>hot</mark>.",
  "modifier": "The bird <mark>with stripes</mark> sang.",
  "simple sentence": "<mark>Birds sing.</mark>",
  "compound sentence": "<mark>I ran, and she walked.</mark>",
  "complex sentence": "<mark>When it rained, we left.</mark>",
  "punctuation": "Stop<mark>!</mark> Are you ready<mark>?</mark>",
  "apostrophe": "<mark>Mina's</mark> bag is on the hook.",
  "comma": "Yes<mark>,</mark> please pass the glue.",
  "full stop": "We arrived<mark>.</mark>",
  "colon": "Bring this<mark>:</mark> glue, card, and scissors.",
  "semicolon": "It rained<mark>;</mark> we stayed inside."
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
].map(([term, childMeaning, formalMeaning, example, commonMistake]) => ({
  term,
  childMeaning,
  formalMeaning,
  example: GLOSSARY_EXAMPLES[term] || `The grammar example uses <mark>${example}</mark> to show ${term} clearly.`,
  commonMistake
}));

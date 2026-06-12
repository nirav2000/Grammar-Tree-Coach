/* Grammar Tree Coach application logic: navigation, rendering, quizzes, and local progress. */
const STORAGE_KEY = "grammarTreeCoach.progress.v1";
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

const defaultProgress = { lessonsCompleted: [], quizScores: {}, bestScore: 0, lastActivity: "Not started yet", masteredTopics: [], needsPractice: [] };
let progress = loadProgress();
let teacherMode = false;

function loadProgress() {
  try { return { ...defaultProgress, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) }; }
  catch { return { ...defaultProgress }; }
}
function saveProgress(activity = "Learning") {
  progress.lastActivity = `${activity} on ${new Date().toLocaleString()}`;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  renderProgress();
}
function normalise(text) { return String(text).trim().toLowerCase(); }
function escapeHtml(text) { return String(text).replace(/[&<>"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char])); }
function escapeRegExp(text) { return String(text).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
function highlightText(text, highlights = []) {
  let output = escapeHtml(text);
  highlights.filter(Boolean).sort((a, b) => b.length - a.length).forEach(term => {
    const escapedTerm = escapeRegExp(escapeHtml(term));
    const pattern = /\w/.test(term) ? `\\b(${escapedTerm})\\b` : `(${escapedTerm})`;
    output = output.replace(new RegExp(pattern, "gi"), '<mark>$1</mark>');
  });
  return output;
}
function exampleMarkup(example) {
  if (typeof example === "string") return escapeHtml(example);
  return `${highlightText(example.sentence, example.highlights || [])}<span class="example-note">${escapeHtml(example.note || "")}</span>`;
}

function showSection(id) {
  $$(".panel").forEach(panel => panel.classList.toggle("active", panel.id === id));
  saveProgress(`Opened ${id}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function initNavigation() {
  $$("[data-section]").forEach(button => button.addEventListener("click", () => showSection(button.dataset.section)));
  const printButton = $("#printTree");
  if (printButton) printButton.addEventListener("click", () => {
    const closedBranches = $$("#treeRoot details:not([open])");
    closedBranches.forEach(branch => branch.open = true);
    saveProgress("Printed grammar tree");
    window.print();
    closedBranches.forEach(branch => branch.open = false);
  });
  $("#teacherToggle").addEventListener("change", event => {
    teacherMode = event.target.checked;
    document.body.classList.toggle("teacher-on", teacherMode);
    saveProgress(teacherMode ? "Enabled teacher notes" : "Disabled teacher notes");
  });
}

function initVersionTools() {
  $("#versionBadge").textContent = APP_VERSION;
  $("#footerVersion").textContent = APP_VERSION;
  const select = $("#versionSelect");
  select.innerHTML = VERSION_REGISTRY.map(item => `<option value="${item.path}" ${item.version === APP_VERSION ? "selected" : ""}>${item.label}</option>`).join("");
  select.addEventListener("change", () => {
    const selected = VERSION_REGISTRY[select.selectedIndex];
    if (selected.status === "future") {
      alert("That future version is planned in the shared version history, but it has not been released yet.");
      select.value = "./";
      return;
    }
    window.location.href = selected.path;
  });
  fetch("../../VERSION_HISTORY.md").then(response => response.text()).then(text => { $("#versionHistoryPreview").textContent = text; }).catch(() => { $("#versionHistoryPreview").textContent = "VERSION_HISTORY.md could not be loaded in this browser context."; });
}

function renderPrinciples() {
  $("#principles").innerHTML = TEACHING_PRINCIPLE.map(line => `<span>${line}</span>`).join("");
}

function renderTreeNode(node) {
  const hasChildren = node.children && node.children.length;
  if (!hasChildren) return `<li><button class="leaf" data-topic="${escapeHtml(node.title)}">${escapeHtml(node.title)}</button></li>`;
  return `<li><details ${node.title === "GRAMMAR" ? "open" : ""}><summary data-topic="${escapeHtml(node.title)}">${escapeHtml(node.title)}</summary><ul>${node.children.map(renderTreeNode).join("")}</ul></details></li>`;
}
function renderGrammarMap() {
  $("#treeRoot").innerHTML = `<ul>${renderTreeNode(GRAMMAR_TREE)}</ul>`;
  $("#treeRoot").addEventListener("click", event => {
    const target = event.target.closest("[data-topic]");
    if (target) showLearningCard(target.dataset.topic);
  });
  showLearningCard("Nouns");
}
function showLearningCard(title) {
  const detail = getTopicDetail(title);
  $("#learningCard").innerHTML = `<h2>${escapeHtml(title)}</h2><dl>
    <dt>Simple meaning</dt><dd>${detail.meaning}</dd>
    <dt>Deeper explanation</dt><dd>${detail.deeper}</dd>
    <dt>Example sentence</dt><dd><strong>${highlightText(detail.example, detail.highlights)}</strong></dd>
    <dt>How to spot it</dt><dd>${detail.spot}</dd>
    <dt>Common mistake</dt><dd>${detail.mistake}</dd>
  </dl><div class="teacher-note"><strong>Teaching tip:</strong> Ask: “What job is this doing in the sentence?” For ${escapeHtml(title)}, ask the child to prove the label using nearby words.</div>
  <div class="quiz-row"><label>${detail.quiz}</label><input id="topicAnswer" aria-label="Mini quiz answer"><button id="topicCheck">Check mini quiz</button><p id="topicFeedback" class="score"></p></div>`;
  $("#topicCheck").addEventListener("click", () => {
    const correct = normalise($("#topicAnswer").value).includes(normalise(detail.answer));
    $("#topicFeedback").textContent = correct ? "Correct! You spotted the grammar job." : `Try again. Hint: the answer includes “${detail.answer}”.`;
    if (correct && !progress.masteredTopics.includes(title)) progress.masteredTopics.push(title);
    if (!correct && !progress.needsPractice.includes(title)) progress.needsPractice.push(title);
    saveProgress(`Tried ${title} mini quiz`);
  });
}

function renderLevels() {
  $("#levels").innerHTML = LEARNING_LEVELS.map(level => `<article class="card level"><h3>${level.title}</h3><p>${level.explanation}</p><strong>Example sentences</strong><ul>${level.examples.map(ex => `<li>${exampleMarkup(ex)}</li>`).join("")}</ul><div>${level.quiz.map(q => `<div class="quiz-row"><label for="level-${level.id}-${q.id}">${q.question}</label><input id="level-${level.id}-${q.id}" data-answer="${escapeHtml(q.answer)}"></div>`).join("")}</div><button data-check-level="${level.id}">Check Level ${level.id}</button><p id="level-score-${level.id}" class="score"></p><div class="teacher-note"><strong>Teaching tip:</strong> Ask pupils to explain how this level connects to the one above and below it in the grammar tree.</div></article>`).join("");
  $$('[data-check-level]').forEach(button => button.addEventListener("click", () => checkLevel(Number(button.dataset.checkLevel))));
}
function checkLevel(levelId) {
  const inputs = $$(`#levels input[id^="level-${levelId}-"]`);
  const score = inputs.reduce((sum, input) => sum + (normalise(input.value).includes(normalise(input.dataset.answer)) ? 1 : 0), 0);
  progress.quizScores[`Level ${levelId}`] = score;
  progress.bestScore = Math.max(progress.bestScore, score);
  if (score >= 4 && !progress.lessonsCompleted.includes(levelId)) progress.lessonsCompleted.push(levelId);
  $(`#level-score-${levelId}`).textContent = `Score: ${score}/${inputs.length}. ${score >= 4 ? "Level completed!" : "Keep practising and try again."}`;
  saveProgress(`Checked Level ${levelId}`);
}

function renderAnalyser() {
  const select = $("#sentenceSelect");
  select.innerHTML = ANALYSER_SENTENCES.map((s, i) => `<option value="${i}">${s.text}</option>`).join("");
  select.addEventListener("change", () => showSentence(Number(select.value)));
  showSentence(0);
}
function showSentence(index) {
  const sentence = ANALYSER_SENTENCES[index];
  $("#wordButtons").innerHTML = sentence.words.map((word, i) => `<button data-word-index="${i}" data-class="${word[1]}">${word[0]}</button>`).join("");
  $("#phrasePanel").innerHTML = `<h3>Phrase and clause groups</h3><ul>${sentence.phrases.map(p => typeof p === "string" ? `<li>${escapeHtml(p)}</li>` : `<li><strong>${escapeHtml(p.label)}:</strong> ${highlightText(p.text, p.highlights || [])}<br><span>${escapeHtml(p.job)}</span></li>`).join("")}</ul>`;
  $("#analysisPanel").textContent = "Choose a word to begin.";
  const summary = sentence.summary ? `<p class="analysis-summary"><strong>Sentence pattern:</strong> ${sentence.summary}</p>` : "";
  $("#analysisPanel").innerHTML = `${summary}<p>Choose a word to begin.</p>`;
  $$("#wordButtons button").forEach(button => button.addEventListener("click", () => {
    const word = sentence.words[Number(button.dataset.wordIndex)];
    const [text, wordClass, reason, job = "", clue = ""] = word;
    $("#analysisPanel").innerHTML = `${summary}<p><strong>${escapeHtml(text)}</strong> is a <strong>${escapeHtml(wordClass)}</strong> because it ${escapeHtml(reason)}</p>${job ? `<p><strong>Job in this sentence:</strong> ${escapeHtml(job)}</p>` : ""}${clue ? `<p><strong>Spotting clue:</strong> ${escapeHtml(clue)}</p>` : ""}<div class="teacher-note"><strong>Suggested prompt:</strong> “What clue helped you decide that ${escapeHtml(text)} is a ${escapeHtml(wordClass)}?”</div>`;
    saveProgress(`Analysed ${text}`);
  }));
}

function renderPractice() {
  renderTapActivity(); renderNounPhraseActivity(); renderExpandActivity(); renderFixActivity(); renderZoomActivity();
}
function renderTapActivity() {
  const item = PRACTICE.tap[Math.floor(Math.random() * PRACTICE.tap.length)];
  $("#tapActivity").innerHTML = `<h3>A. Tap the Word Class</h3><p>Tap the <strong>${item.target}</strong> in: ${item.sentence}</p><div class="choice-row">${item.sentence.replace(/[.?!]/g, "").split(" ").map(w => `<button class="secondary" data-tap="${w}">${w}</button>`).join("")}</div><p class="score" id="tapFeedback"></p>`;
  $$('[data-tap]').forEach(button => button.addEventListener("click", () => {
    const correct = normalise(button.dataset.tap) === normalise(item.answer);
    $("#tapFeedback").textContent = correct ? "Correct!" : `Not quite. Look for ${item.target}: ${item.answer}.`;
    saveProgress("Tap word class practice");
  }));
}
function renderNounPhraseActivity() {
  const p = PRACTICE.nounPhrase;
  $("#nounPhraseActivity").innerHTML = `<h3>B. Build a Noun Phrase</h3><p>Choose determiner + adjective + noun.</p>${["determiners", "adjectives", "nouns"].map(key => `<select data-np="${key}">${p[key].map(x => `<option>${x}</option>`).join("")}</select>`).join(" ")}<p id="npOutput" class="score"></p>`;
  const update = () => { $("#npOutput").textContent = $$('[data-np]').map(s => s.value).join(" "); saveProgress("Built noun phrase"); };
  $$('[data-np]').forEach(select => select.addEventListener("change", update)); update();
}
function renderExpandActivity() {
  let step = 0;
  $("#expandActivity").innerHTML = `<h3>C. Expand the Sentence</h3><p id="expandText" class="score"></p><button id="expandNext">Add detail</button>`;
  const update = () => { $("#expandText").textContent = PRACTICE.expand[step]; };
  $("#expandNext").addEventListener("click", () => { step = Math.min(step + 1, PRACTICE.expand.length - 1); update(); saveProgress("Expanded sentence"); }); update();
}
function renderFixActivity() {
  $("#fixActivity").innerHTML = `<h3>D. Fix the Mistake</h3>${PRACTICE.fixes.map((f, i) => `<p><strong>${f[0]}</strong></p><button data-fix="${i}">Show correction</button><p id="fix-${i}" class="score"></p>`).join("")}`;
  $$('[data-fix]').forEach(button => button.addEventListener("click", () => { const f = PRACTICE.fixes[button.dataset.fix]; $(`#fix-${button.dataset.fix}`).textContent = `${f[1]} — ${f[2]}`; saveProgress("Fixed mistake"); }));
}
function renderZoomActivity() {
  $("#zoomActivity").innerHTML = `<h3>E. Zoom In / Zoom Out</h3><ol>${PRACTICE.zoom.map(z => `<li>${z}</li>`).join("")}</ol><p class="teacher-note"><strong>Prompt:</strong> Ask the child what changed at each zoom level.</p>`;
}

function renderGlossary() {
  const draw = () => {
    const query = normalise($("#glossarySearch").value);
    const items = GLOSSARY.filter(g => !query || [g.term, g.child, g.formal, g.example].some(v => normalise(v).includes(query)));
    $("#glossaryList").innerHTML = items.map(g => `<article class="card term"><h3>${g.term}</h3><p><strong>Child-friendly:</strong> ${g.child}</p><p><strong>Formal:</strong> ${g.formal}</p><p><strong>Example sentence:</strong> ${g.example}</p><p><strong>Common mistake:</strong> ${g.mistake}</p><div class="teacher-note"><strong>Suggested prompt:</strong> “Can you make your own sentence using ${g.term}?”</div></article>`).join("");
  };
  $("#glossarySearch").addEventListener("input", draw); draw();
}

function renderProgress() {
  const scores = Object.entries(progress.quizScores);
  $("#progressCards").innerHTML = `<div class="card"><h3>Lessons completed</h3><p class="score">${progress.lessonsCompleted.length}/8</p></div><div class="card"><h3>Quiz scores</h3><p>${scores.length ? scores.map(([k, v]) => `${k}: ${v}/5`).join("<br>") : "No quizzes checked yet."}</p></div><div class="card"><h3>Best score</h3><p class="score">${progress.bestScore}/5</p></div><div class="card"><h3>Last activity</h3><p>${progress.lastActivity}</p></div><div class="card"><h3>Mastered topics</h3><p>${progress.masteredTopics.length ? progress.masteredTopics.join(", ") : "Complete mini quizzes to add topics."}</p></div><div class="card"><h3>Topics needing practice</h3><p>${progress.needsPractice.length ? progress.needsPractice.join(", ") : "Nothing yet."}</p></div>`;
}
function initReset() {
  $("#resetProgress").addEventListener("click", () => { if (confirm("Reset progress stored in this browser?")) { progress = { ...defaultProgress }; localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); renderProgress(); } });
}

document.addEventListener("DOMContentLoaded", () => {
  initNavigation(); initVersionTools(); renderPrinciples(); renderGrammarMap(); renderLevels(); renderAnalyser(); renderPractice(); renderGlossary(); renderProgress(); initReset();
});

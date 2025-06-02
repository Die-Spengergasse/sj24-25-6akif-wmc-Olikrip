const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5080/api';

export async function getAllModules() {
    const res = await fetch(`${BASE_URL}/modules`);
    if (!res.ok) throw new Error('Fehler beim Laden der Module');
    return res.json();
}

export async function getTopicsByModule(moduleGuid) {
    const res = await fetch(`${BASE_URL}/topics?assignedModule=${moduleGuid}`);
    if (!res.ok) throw new Error('Fehler beim Laden der Topics');
    return res.json();
}

export async function getQuestions(moduleGuid, topicGuid) {
    const res = await fetch(`${BASE_URL}/questions?moduleGuid=${moduleGuid}&topicGuid=${topicGuid}`);
    if (!res.ok) throw new Error('Fehler beim Laden der Fragen');
    return res.json();
}

export async function checkAnswers(questionGuid, checkedAnswers) {
    const payload = { checkedAnswers };
    const res = await fetch(`${BASE_URL}/questions/${questionGuid}/checkanswers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Fehler bei der Antwortüberprüfung');
    return res.json();
}

export { getAllModules, getTopicsByModule, getQuestionsByTopic };
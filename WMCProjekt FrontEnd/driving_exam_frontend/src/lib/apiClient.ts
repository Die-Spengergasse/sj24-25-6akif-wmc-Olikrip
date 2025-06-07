const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5080/api';

export interface Module {
    guid: string;
    name: string;
}

export interface Topic {
    guid: string;
    name: string;
}

export interface AnswerOption {
    guid: string;
    text: string;
}

export interface Question {
    guid: string;
    number: number;
    text: string;
    points: number;
    imageUrl: string | null;
    moduleGuid: string;
    topicGuid: string;
    answers: AnswerOption[];
}

export interface CheckResult {
    pointsReachable: number;
    pointsReached: number;
    checkResult: {
        [answerGuid: string]: boolean;
    };
}

export async function getAllModules(): Promise<Module[]> {
    const res = await fetch(`${BASE_URL}/modules`);
    if (!res.ok) throw new Error('Fehler beim Laden der Module');
    return res.json();
}

export async function getTopicsByModule(moduleGuid: string): Promise<Topic[]> {
    const res = await fetch(`${BASE_URL}/topics?assignedModule=${moduleGuid}`);
    if (!res.ok) throw new Error('Fehler beim Laden der Topics');
    return res.json();
}

export async function getQuestions(
    moduleGuid: string,
    topicGuid: string
): Promise<Question[]> {
    const res = await fetch(
        `${BASE_URL}/questions?moduleGuid=${moduleGuid}&topicGuid=${topicGuid}`
    );
    if (!res.ok) throw new Error('Fehler beim Laden der Fragen');
    return res.json();
}

export async function checkAnswers(
    questionGuid: string,
    checkedAnswers: { guid: string; isChecked: boolean }[]
): Promise<CheckResult> {
    const payload = { checkedAnswers };
    const res = await fetch(`${BASE_URL}/questions/${questionGuid}/checkanswers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Fehler bei der Antwort berpr fung');
    return res.json();
}
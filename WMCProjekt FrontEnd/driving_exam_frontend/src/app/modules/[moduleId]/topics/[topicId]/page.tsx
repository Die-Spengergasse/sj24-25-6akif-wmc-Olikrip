'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getQuestions, checkAnswers, Question, CheckResult } from '@/lib/apiClient';

interface TopicQuestionsPageProps {
    params: { moduleId: string; topicId: string };
}

export default function TopicQuestionsPage({ params }: TopicQuestionsPageProps) {
    const { moduleId, topicId } = params;
    const router = useRouter();

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState<{ [guid: string]: boolean }>({});
    const [checkResult, setCheckResult] = useState<CheckResult['checkResult'] | null>(null);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        async function fetchQuestions() {
            try {
                const data = await getQuestions(moduleId, topicId);
                const shuffledQuestions = data.map((q) => ({
                    ...q,
                    answers: shuffleArray(q.answers),
                }));
                setQuestions(shuffledQuestions);
            } catch (err) {
                console.error(err);
            }
        }

        if (moduleId && topicId) {
            fetchQuestions();
        }
    }, [moduleId, topicId]);

    function shuffleArray<T>(arr: T[]): T[] {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    if (!moduleId || !topicId) return <p>Lädt…</p>;
    if (questions.length === 0) return <p>Keine Fragen gefunden.</p>;
    if (currentIndex < 0 || currentIndex >= questions.length)
        return <p>Ungültiger Fragen-Index</p>;

    const currentQuestion = questions[currentIndex];

    function handleCheckboxChange(answerGuid: string) {
        setSelected((prev) => ({
            ...prev,
            [answerGuid]: !prev[answerGuid],
        }));
    }

    async function handleCheck() {
        // Payload aufbauen
        const payloadArray = currentQuestion.answers.map((ans) => ({
            guid: ans.guid,
            isChecked: !!selected[ans.guid],
        }));

        try {
            const result = await checkAnswers(currentQuestion.guid, payloadArray);
            setCheckResult(result.checkResult);
            setIsChecked(true);
        } catch (err) {
            console.error(err);
            alert('Fehler bei der Antwortüberprüfung');
        }
    }

    function handleNextQuestion() {
        setCurrentIndex((prev) => prev + 1);
        setSelected({});
        setCheckResult(null);
        setIsChecked(false);
    }
    const isLastQuestion = currentIndex === questions.length - 1;

    return (
        <div>
            <h2>
                Frage {currentIndex + 1} von {questions.length}
            </h2>
            <p style={{ margin: '1rem 0', fontWeight: 'bold' }}>{currentQuestion.text}</p>

            {/* 6) Bild anzeigen, falls imageUrl vorhanden */}
            {currentQuestion.imageUrl && (
                <img
                    src={currentQuestion.imageUrl}
                    alt="Fragenbild"
                    style={{ maxWidth: '300px', marginBottom: '1rem' }}
                />
            )}

            {/* 7) Antwortoptionen mit Checkboxes */}
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                {currentQuestion.answers.map((ans) => {
                    // 8) Wenn bereits geprüft: Farben festlegen
                    let style: React.CSSProperties = {};
                    if (isChecked && checkResult) {
                        const richtig = checkResult[ans.guid]; // true: der User hat korrekt gewählt/ nicht gewählt?
                        const userChecked = !!selected[ans.guid];
                        // 1) userChecked=true & richtig=true  → hellgrün
                        if (userChecked && richtig) style = { backgroundColor: '#d4edda' };
                        // 2) userChecked=true & richtig=false → hellrot
                        else if (userChecked && !richtig) style = { backgroundColor: '#f8d7da' };
                        // 3) userChecked=false & richtig=true → gelb (User hat das anklicken müssen)
                        else if (!userChecked && richtig) style = { backgroundColor: '#fff3cd' };
                        // 4) userChecked=false & richtig=false → keine Hervorhebung
                    }

                    return (
                        <li key={ans.guid} style={{ marginBottom: '0.75rem', padding: '0.5rem', ...style }}>
                            <label>
                                <input
                                    type="checkbox"
                                    disabled={isChecked} // nach Check nicht mehr umschaltbar
                                    checked={!!selected[ans.guid]}
                                    onChange={() => handleCheckboxChange(ans.guid)}
                                    style={{ marginRight: '0.5rem' }}
                                />
                                {ans.text}
                            </label>
                        </li>
                    );
                })}
            </ul>

            {/* 9) Buttons: „Antwort prüfen“ oder „Nächste Frage“ */}
            <div style={{ marginTop: '1rem' }}>
                {!isChecked && (
                    <button onClick={handleCheck} style={{ marginRight: '0.5rem' }}>
                        Antwort prüfen
                    </button>
                )}
                {isChecked && !isLastQuestion && (
                    <button onClick={handleNextQuestion}>Nächste Frage →</button>
                )}
                {isChecked && isLastQuestion && (
                    <button disabled>Letzte Frage erreicht</button>
                )}
            </div>

            {/* 10) Zurück-Button */}
            <div style={{ marginTop: '2rem' }}>
                <button onClick={() => router.back()}>← Zurück zu Themen</button>
            </div>
        </div>
    );
}

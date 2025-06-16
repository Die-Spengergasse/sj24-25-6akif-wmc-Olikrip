'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    getQuestions,
    checkAnswers,
    Question,
    CheckResult,
} from '@/lib/apiClient';
import Loader from '@/components/Loader';
import QuestionCard from '@/components/QuestionCard';
import QuestionNavigator from '@/components/QuestionNavigator';

export default function TopicQuestionsPage() {
    const { moduleId, topicId } = useParams() as {
        moduleId: string;
        topicId: string;
    };
    const router = useRouter();

    const [questions, setQuestions] = useState<Question[] | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState<Record<string, boolean>>({});
    const [checkResult, setCheckResult] = useState<CheckResult['checkResult'] | null>(
        null
    );
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        getQuestions(moduleId, topicId)
            .then((data) => {
                // Antworten mischen
                const shuffled = data.map((q) => ({
                    ...q,
                    answers: q.answers.sort(() => Math.random() - 0.5),
                }));
                setQuestions(shuffled);
            })
            .catch(() => setQuestions([]));
    }, [moduleId, topicId]);

    if (questions === null) return <Loader />;
    if (questions.length === 0) return <p>Keine Fragen gefunden.</p>;

    const question = questions[currentIndex];

    function toggleAnswer(guid: string) {
        setSelected((s) => ({ ...s, [guid]: !s[guid] }));
    }

    async function handleCheck() {
        const payload = question.answers.map((a) => ({
            guid: a.guid,
            isChecked: !!selected[a.guid],
        }));
        const result = await checkAnswers(question.guid, payload);
        setCheckResult(result.checkResult);
        setIsChecked(true);
    }

    function handleNext() {
        setCurrentIndex((i) => i + 1);
        setSelected({});
        setCheckResult(null);
        setIsChecked(false);
    }

    return (
        <div>
            <h2>
                Frage {currentIndex + 1} von {questions.length}
            </h2>

            <QuestionCard
                question={question}
                selected={selected}
                onToggle={toggleAnswer}
                checkResult={checkResult}
                isChecked={isChecked}
            />

            <QuestionNavigator
                currentIndex={currentIndex}
                total={questions.length}
                isChecked={isChecked}
                onCheck={handleCheck}
                onNext={handleNext}
            />

            <button
                onClick={() => router.push(`/modules/${moduleId}`)}
                style={{ marginTop: '2rem' }}
            >
                ← Zurück zu Themen
            </button>
        </div>
    );
}
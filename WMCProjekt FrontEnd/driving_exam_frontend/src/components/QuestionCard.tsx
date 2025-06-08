import { CheckResult, Question } from '@/lib/apiClient';

interface QuestionCardProps {
    question: Question;
    selected: Record<string, boolean>;
    onToggle: (answerGuid: string) => void;
    checkResult: CheckResult['checkResult'] | null;
    isChecked: boolean;
}

export default function QuestionCard({
    question,
    selected,
    onToggle,
    checkResult,
    isChecked,
}: QuestionCardProps) {
    return (
        <div>
            <p style={{ margin: '1rem 0', fontWeight: 'bold' }}>{question.text}</p>

            {question.imageUrl && (
                <img
                    src={question.imageUrl}
                    alt="Fragenbild"
                    style={{ maxWidth: '300px', marginBottom: '1rem' }}
                />
            )}

            <ul style={{ listStyle: 'none', padding: 0 }}>
                {question.answers.map((ans) => {
                    let style: React.CSSProperties = {};
                    if (isChecked && checkResult) {
                        const correct = checkResult[ans.guid];
                        const user = !!selected[ans.guid];
                        if (user && correct) style = { backgroundColor: '#d4edda' };
                        else if (user && !correct) style = { backgroundColor: '#f8d7da' };
                        else if (!user && correct) style = { backgroundColor: '#fff3cd' };
                    }
                    return (
                        <li
                            key={ans.guid}
                            style={{ marginBottom: '0.75rem', padding: '0.5rem', ...style }}
                        >
                            <label>
                                <input
                                    type="checkbox"
                                    checked={!!selected[ans.guid]}
                                    disabled={isChecked}
                                    onChange={() => onToggle(ans.guid)}
                                    style={{ marginRight: '0.5rem' }}
                                />
                                {ans.text}
                            </label>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
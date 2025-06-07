interface QuestionNavigatorProps {
    currentIndex: number;
    total: number;
    isChecked: boolean;
    onCheck: () => void;
    onNext: () => void;
}

export default function QuestionNavigator({
    currentIndex,
    total,
    isChecked,
    onCheck,
    onNext,
}: QuestionNavigatorProps) {
    const isLast = currentIndex + 1 === total;

    return (
        <div style={{ marginTop: '1rem' }}>
            {!isChecked ? (
                <button onClick={onCheck} style={{ marginRight: '0.5rem' }}>
                    Antwort prüfen
                </button>
            ) : !isLast ? (
                <button onClick={onNext}>Nächste Frage →</button>
            ) : (
                <button disabled>Letzte Frage erreicht</button>
            )}
        </div>
    );
}
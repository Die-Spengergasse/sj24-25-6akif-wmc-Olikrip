import Link from 'next/link';
import { getTopicsByModule, Topic } from '@/lib/apiClient';

interface ModulePageProps {
    params: { moduleId: string };
}

export default async function ModulePage({ params }: ModulePageProps) {
    const { moduleId } = params;
    let topics: Topic[] = [];

    try {
        topics = await getTopicsByModule(moduleId);
    } catch (err) {
        console.error(err);
    }

    return (
        <div>
            <h2>Themen zum Modul</h2>
            {topics.length === 0 && <p>Keine Themen gefunden.</p>}
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                {topics.map((topic) => (
                    <li key={topic.guid} style={{ marginBottom: '0.75rem' }}>
                        <Link
                            href={`/modules/${moduleId}/topics/${topic.guid}`}
                            style={{ fontSize: '1rem' }}
                        >
                            {topic.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <button onClick={() => window.history.back()}>? Zurück zu Module</button>
        </div>
    );
}
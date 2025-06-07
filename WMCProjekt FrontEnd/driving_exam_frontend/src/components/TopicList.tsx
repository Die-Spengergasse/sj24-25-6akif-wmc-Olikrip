import Link from 'next/link';
import { Topic } from '@/lib/apiClient';

interface TopicListProps {
    moduleId: string;
    topics: Topic[];
}

export default function TopicList({ moduleId, topics }: TopicListProps) {
    return (
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {topics.map((t) => (
                <li key={t.guid} style={{ marginBottom: '0.75rem' }}>
                    <Link href={`/modules/${moduleId}/topics/${t.guid}`}>
                        {t.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getTopicsByModule, Topic } from '@/lib/apiClient';
import TopicList from '@/components/TopicList';
import Loader from '@/components/Loader';

interface Props {
    params: { moduleId: string };
}

export default function ModulePage({ params }: Props) {
    const { moduleId } = params;
    const router = useRouter();
    const [topics, setTopics] = useState<Topic[] | null>(null);

    useEffect(() => {
        getTopicsByModule(moduleId)
            .then((data) => setTopics(data))
            .catch(() => setTopics([]));
    }, [moduleId]);

    if (topics === null) return <Loader />;

    return (
        <div>
            <h2>Themen dieses Moduls</h2>
            <TopicList moduleId={moduleId} topics={topics} />

            <button onClick={() => router.push('/')} style={{ marginTop: '2rem' }}>
                ← Zurück zu Modulen
            </button>
        </div>
    );
}
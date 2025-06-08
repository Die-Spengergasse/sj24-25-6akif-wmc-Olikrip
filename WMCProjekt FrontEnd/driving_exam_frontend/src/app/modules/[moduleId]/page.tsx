'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getTopicsByModule, Topic } from '@/lib/apiClient';
import TopicList from '@/components/TopicList';
import Loader from '@/components/Loader';


export default function ModulePage()
{
    const { moduleId } = useParams() as { moduleId: string };
    const router = useRouter();

    const [topics, setTopics] = useState<Topic[] | null>(null);

    useEffect(() => {
        if (!moduleId) return;
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
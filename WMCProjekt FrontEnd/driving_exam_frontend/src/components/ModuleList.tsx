import Link from 'next/link';
import { Module } from '@/lib/apiClient';

interface ModuleListProps {
    modules: Module[];
}

export default function ModuleList({ modules }: ModuleListProps) {
    return (
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {modules.map((mod) => (
                <li key={mod.guid} style={{ marginBottom: '0.75rem' }}>
                    <Link href={`/modules/${mod.guid}`}>{mod.name}</Link>
                </li>
            ))}
        </ul>
    );
}
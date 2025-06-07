import Link from 'next/link';
import { getAllModules, Module } from '@/lib/apiClient';

export default async function HomePage() {
    // 1) Server-side fetch
    let modules: Module[] = [];
    try {
        modules = await getAllModules();
    } catch (err) {
        console.error(err);
    }

    return (
        <div>
            <h2>Module</h2>
            {modules.length === 0 && <p>Keine Module gefunden.</p>}
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                {modules.map((mod) => (
                    <li key={mod.guid} style={{ marginBottom: '0.75rem' }}>
                        <Link href={`/modules/${mod.guid}`} style={{ fontSize: '1.1rem' }}>
                            {mod.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
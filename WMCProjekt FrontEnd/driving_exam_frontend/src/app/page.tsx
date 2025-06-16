import { getAllModules } from '@/lib/apiClient';
import ModuleList from '@/components/ModuleList';

export default async function HomePage() {
    const modules = await getAllModules();

    return (
        <div>
            <h2>Module</h2>
            <ModuleList modules={modules} />
        </div>
    );
}
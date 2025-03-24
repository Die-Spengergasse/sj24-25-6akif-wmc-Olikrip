'use client'  // Da wir usePathname vom Router verwenden.

import styles from './Navbar.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTodoAppState } from '@/app/context/TodoAppContext'

export default function Navbar() {
    const pathname = usePathname();
    const { activeUser, actions } = useTodoAppState(); 

    return (
        <nav className={styles.nav}>
            <Link href="/" className={pathname === '/' ? styles.active : ''}>Home</Link>
            <Link href="/categories" className={pathname === '/categories' ? styles.active : ''}>Categories</Link>
            <Link href="/todos" className={pathname === '/todos' ? styles.active : ''}>Todos</Link>
            <Link href="/about" className={pathname === '/about' ? styles.active : ''}>About</Link>

            
            {activeUser && (
                <span>
                    👤 {activeUser}
                    {activeUser !== "Guest" && (
                        <button onClick={() => actions.setActiveUser(null)}>
                            Logout</button>
                    )}
                </span>
            )}
        </nav>
    );
}
import './styles/globals.css';
import { ReactNode } from 'react';
import Link from 'next/link';

export const metadata = {
    title: 'Führerscheinprüfung-Übung',
    description: 'Next.js-Frontend für Führerscheinprüfung-Übung',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="de">
            <head />
            <body>
                <header style={{ backgroundColor: '#0070f3', padding: '1rem' }}>
                    <div className="container">
                        <h1 style={{ color: 'white' }}>Führerscheinprüfung</h1>
                        <nav style={{ marginTop: '0.5rem' }}>
                            <Link href="/" style={{ color: 'white', marginRight: '1rem' }}>
                                Module
                            </Link>
                        </nav>
                    </div>
                </header>

                <main className="container">{children}</main>

                <footer
                    style={{
                        backgroundColor: '#f1f1f1',
                        padding: '1rem',
                        marginTop: '2rem',
                        textAlign: 'center',
                    }}
                >
                    © 2025 HTL Spengergasse
                </footer>
            </body>
        </html>
    );
}
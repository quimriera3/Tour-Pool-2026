import './globals.css';

export const metadata = {
  metadataBase: new URL('https://www.grandtourpool.com'),
  title: 'Mallorca Friends Tour 2026 | Classificacions en directe',
  description: 'Tres etapes reals, vuit amics, 382 km de ciclisme i sis classificacions. Mallorca Friends Tour 2026: perfils GPS, ports, esprints, premis i classificacions en directe.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Mallorca Friends Tour 2026',
    description: '10–12 d’octubre de 2026. 3 etapes, 8 corredors i 6 classificacions en directe.',
    type: 'website',
    locale: 'ca_ES',
    url: 'https://www.grandtourpool.com/'
  }
};

export default function RootLayout({ children }) {
  return <html lang="ca"><body>{children}</body></html>;
}

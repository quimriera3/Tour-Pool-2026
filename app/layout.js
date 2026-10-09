import './globals.css';

export const metadata = {
  metadataBase: new URL('https://www.grandtourpool.com'),
  title: 'Mallorca Friends Tour 2026 | Tres dies, vuit ciclistes',
  description: 'Tres etapes reals, vuit amics, 381 km de ciclisme i totes les classificacions. Mallorca Friends Tour 2026: perfils GPS, ports, esprints, premis i classificacions en directe.',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Mallorca Friends Tour 2026',
    description: '10–12 octubre 2026. Tres dies. Vuit amics. Cap pietat.',
    type: 'website',
    locale: 'ca_ES',
    url: 'https://www.grandtourpool.com/'
  }
};

export default function RootLayout({ children }) {
  return <html lang="ca"><body>{children}</body></html>;
}

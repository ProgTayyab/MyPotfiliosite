import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import { portfolioConfig } from './config/portfolio';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(portfolioConfig.seo.url),
  title: portfolioConfig.seo.title,
  description: portfolioConfig.seo.description,
  keywords: portfolioConfig.seo.keywords,
  authors: [{ name: portfolioConfig.personal.name }],
  creator: portfolioConfig.personal.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: portfolioConfig.seo.url,
    title: portfolioConfig.seo.title,
    description: portfolioConfig.seo.description,
    siteName: portfolioConfig.personal.name,
    images: [
      {
        url: portfolioConfig.seo.image,
        width: 1200,
        height: 630,
        alt: portfolioConfig.personal.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: portfolioConfig.seo.title,
    description: portfolioConfig.seo.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from 'next'
import { Montserrat, Open_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const openSans = Open_Sans({ 
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Metalúrgica Promet | 60 Años de Excelencia en Soldadura y Mecanizado Industrial',
  description: 'Líder en soldadura industrial, mecanizado de precisión, fabricación de estructuras metálicas y mantenimiento industrial en Argentina. 60 años de experiencia, calidad certificada y atención personalizada.',
  keywords: [
    'metalúrgica argentina',
    'soldadura industrial',
    'mecanizado de precisión',
    'estructuras metálicas',
    'mantenimiento industrial',
    'fabricación metal',
    'taller metalúrgico',
    'soldadura MIG',
    'soldadura TIG',
    'torno CNC',
    'fresado industrial',
  ],
  authors: [{ name: 'Metalúrgica Promet' }],
  creator: 'Metalúrgica Promet',
  publisher: 'Metalúrgica Promet',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://metalurgicapromet.com.ar',
    siteName: 'Metalúrgica Promet',
    title: 'Metalúrgica Promet | 60 Años de Excelencia Industrial',
    description: 'Líder en soldadura industrial, mecanizado de precisión y fabricación de estructuras metálicas. 60 años transformando metal en soluciones.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Metalúrgica Promet - 60 años de excelencia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Metalúrgica Promet | 60 Años de Excelencia',
    description: 'Soldadura industrial, mecanizado de precisión y estructuras metálicas.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#003366',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://metalurgicapromet.com.ar',
  name: 'Metalúrgica Promet',
  description: 'Empresa líder en soldadura industrial, mecanizado de precisión, fabricación de estructuras metálicas y mantenimiento industrial con 60 años de experiencia.',
  url: 'https://metalurgicapromet.com.ar',
  telephone: '+54-11-1234-5678',
  email: 'info@metalurgicapromet.com.ar',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Industrial 1234',
    addressLocality: 'Buenos Aires',
    addressRegion: 'Buenos Aires',
    postalCode: '1234',
    addressCountry: 'AR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -34.6037,
    longitude: -58.3816,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '13:00',
    },
  ],
  priceRange: '$$',
  image: 'https://metalurgicapromet.com.ar/og-image.jpg',
  sameAs: [
    'https://www.facebook.com/metalurgicapromet',
    'https://www.instagram.com/metalurgicapromet',
    'https://www.linkedin.com/company/metalurgicapromet',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '127',
  },
  foundingDate: '1964',
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    value: '50+',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Argentina',
  },
  serviceType: [
    'Soldadura Industrial',
    'Mecanizado de Precisión',
    'Fabricación de Estructuras Metálicas',
    'Mantenimiento Industrial',
    'Corte y Plegado',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${montserrat.variable} ${openSans.variable} bg-background`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-serif antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

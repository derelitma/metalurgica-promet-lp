import type { Metadata, Viewport } from 'next'
import { Montserrat, Open_Sans, Barlow_Condensed, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Metalúrgica Promet LP | Corte, Plegado y Cilindrado de Chapas en La Plata | Carpintería Metálica | 60 años',
  description:
    'Corte y plegado de chapas de 0.5mm a chapa 25. Carpintería metálica completa. Racks, portones, escaleras y techos. Más de 60 años en La Plata. Presupuesto en el día.',
  keywords: [
    'portones metálicos La Plata',
    'puertas metálicas',
    'ventanas metálicas',
    'escaleras metálicas',
    'techos metálicos',
    'estructuras metálicas',
    'carpintería metálica',
    'trabajos en metal La Plata',
    'corte de chapas La Plata',
    'plegado de chapas La Plata',
    'cilindrado de chapas',
    'procesamiento de chapas',
    'plegadora La Plata',
    'cilindrado industrial',
  ],
  authors: [{ name: 'Metalúrgica Promet LP' }],
  creator: 'Metalúrgica Promet LP',
  publisher: 'Metalúrgica Promet LP',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://metalurgicapromet.com.ar',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://metalurgicapromet.com.ar',
    siteName: 'Metalúrgica Promet LP',
    title: 'Metalúrgica Promet LP | Corte, Plegado y Cilindrado de Chapas en La Plata | Carpintería Metálica',
    description:
      'Corte y plegado de chapas de 0.5mm a chapa 25. Carpintería metálica completa. Racks, portones, escaleras y techos. Más de 60 años en La Plata. Presupuesto en el día.',
    images: [
      {
        url: 'https://metalurgicapromet.com.ar/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Metalúrgica Promet LP',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PrometLP',
    creator: '@PrometLP',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  },
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
  name: 'Metalúrgica Promet LP',
  alternateName: 'Promet La Plata',
  description:
    'Fabricación e instalación de portones, puertas, ventanas, escaleras y techos metálicos a medida. Corte, plegado y cilindrado de chapas. Más de 60 años de trayectoria en La Plata.',
  foundingDate: '1960',
  url: 'https://metalurgicapromet.com.ar',
  telephone: '+5492215551234',
  email: 'info@metalurgicapromet.com.ar',
  priceRange: '$$',
  currenciesAccepted: 'ARS',
  paymentAccepted: ['Cash', 'Transfer', 'CreditCard'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle 43 entre 148 y 149',
    addressLocality: 'La Plata',
    addressRegion: 'Buenos Aires',
    postalCode: '1900',
    addressCountry: 'AR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -34.9214,
    longitude: -57.9545,
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
  areaServed: [
    { '@type': 'City', name: 'La Plata' },
    { '@type': 'City', name: 'Berisso' },
    { '@type': 'City', name: 'Ensenada' },
    { '@type': 'Place', name: 'GBA Sur' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios de carpintería metálica y procesamiento de chapas',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Portones metálicos a medida',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Puertas metálicas',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Ventanas metálicas',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Escaleras metálicas',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Techos y estructuras metálicas',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Corte de chapas',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Plegado de chapas',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Cilindrado de chapas',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Racks y estanterías metálicas',
        },
      },
    ],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '47',
  },
  sameAs: [
    'https://www.facebook.com/metalurgicapromet',
    'https://www.instagram.com/metalurgicapromet',
    'https://wa.me/5492215551234',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    telephone: '+5492215551234',
    areaServed: ['AR'],
    availableLanguage: ['es'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${openSans.variable} ${barlowCondensed.variable} ${inter.variable} bg-white`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="color-scheme" content="light" />
        <meta name="geo.region" content="AR-B" />
        <meta name="geo.placename" content="La Plata" />
        <meta name="geo.position" content="-34.9214;-57.9545" />
        <meta name="ICBM" content="-34.9214, -57.9545" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://wa.me" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`font-sans bg-white text-[#111318] antialiased`}
        suppressHydrationWarning
      >
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

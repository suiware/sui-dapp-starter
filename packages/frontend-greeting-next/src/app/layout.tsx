import { type Metadata } from 'next'
import Header from '~~/components/layout/Header'
import Body from './components/layout/Body'
import Extra from './components/layout/Extra'
import Footer from './components/layout/Footer'
import { APP_DESCRIPTION, APP_NAME } from './config/main'
import ClientProviders from './providers/ClientProviders'
import './styles/index.css'

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <ClientProviders>
          <div className="flex min-h-screen flex-col items-center justify-center gap-6">
            <Header />
            <Body>{children}</Body>
            <Footer />
            <Extra />
          </div>
        </ClientProviders>
      </body>
    </html>
  )
}

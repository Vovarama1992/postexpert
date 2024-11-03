import { authOptions } from '@/app/api/authOptions'
import { Layout } from '@/components/ui/Layout'
import { AuthProvider } from '@/context'
import TranslationProvider from '@/context/Translation/TranslationProvider'
import { $api, getMenus, getTranslations } from '@/lib'
import { LayoutData } from '@/types/layout'
import { NextUIProvider } from '@nextui-org/react'
import type { Metadata } from 'next'
import { Session } from 'next-auth'
import { getServerSession } from 'next-auth/next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Inter } from 'next/font/google'
import React from 'react'
import '../globals.css'

const inter = Inter({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  // TODO: Динамический заголовок и description, имя юзера
  title: 'DashboardWidget Postexpert',
  description: 'DashboardWidget user Postexpert',
  icons: {
    icon: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        sizes: '16x16',
        url: '/favicon/favicon.ico',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon/favicon-32x32.png',
      },
      {
        rel: 'mask-icon',
        type: 'image/png',
        color: '#ffffff',
        url: '/favicon/safari-pinned-tab.svg',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        url: '/favicon/apple-touch-icon.png',
      },
    ],
  },
  manifest: '/favicon/site.webmanifest',
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const translations = await getTranslations(locale)
  const menus = await getMenus(locale)

  const messages = await getMessages({
    locale,
  })

  const session: Session | undefined | null = await getServerSession(authOptions as any)

  const { data } = await $api.get<{ data: LayoutData }>('/site/pages/layout', {
    headers: {
      locale,
    },
  })

  return (
    <html lang={locale}>
      <TranslationProvider menus={menus} translation={translations}>
        <body className={inter.variable}>
          <NextIntlClientProvider messages={messages}>
            <NextUIProvider aria-label='test'>
              <AuthProvider session={session}>
                <Layout layoutData={data.data} closeBanner={false}>
                  {children}
                </Layout>
              </AuthProvider>
            </NextUIProvider>
          </NextIntlClientProvider>
        </body>
      </TranslationProvider>
    </html>
  )
}

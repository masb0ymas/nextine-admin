import { RouterTransition } from '@core/components/RouterTransition'
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { BRAND } from 'config/env'
import { getCookie, setCookie } from 'cookies-next'
import getSiteLayout from 'layouts/core'
import { GetServerSidePropsContext } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useState } from 'react'

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme)

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark')
    setColorScheme(nextColorScheme)
    setCookie('mantine-color-scheme', nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    })
  }

  const siteLayout = getSiteLayout(props)

  return (
    <>
      <Head>
        <title>{BRAND}</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme, fontFamily: 'Poppins' }}
          withGlobalStyles
          withNormalizeCSS
        >
          {/* nprogress loader */}
          <RouterTransition />

          {/* notification provider */}
          <NotificationsProvider position="top-right" zIndex={2077}>
            {/* render site layout */}
            {siteLayout}
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
})

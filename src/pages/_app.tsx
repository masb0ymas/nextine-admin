import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { getCookie, setCookie } from 'cookies-next'
import _ from 'lodash'
import NextApp, { AppContext, AppProps } from 'next/app'
import Head from 'next/head'
import { useState } from 'react'
import slugify from 'slugify'
import { BRAND } from '~/config/env'
import { RouterTransition } from '~/core/components/RouterTransition'
import getSiteLayout from '~/layouts/core'

const brand = _.toLower(slugify(BRAND))
const cookieName = `${brand}-color-scheme`

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme)

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark')
    setColorScheme(nextColorScheme)
    setCookie(cookieName, nextColorScheme, {
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
          <Notifications position="top-right" zIndex={2077} />

          {/* modal provider */}
          <ModalsProvider>
            {/* render site layout */}
            {siteLayout}
            {/* render site layout */}
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  )
}

App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext)
  return {
    ...appProps,
    colorScheme: getCookie(cookieName, appContext.ctx) || 'light',
  }
}

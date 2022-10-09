import matchPath from '@core/helpers/matchPath'
import globalRoutes from 'layouts/routes'
import { AppProps } from 'next/app'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
    },
  },
})

function WrapperReactQuery(props: any) {
  const { children } = props

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  )
}

export const DefaultLayoutContext = React.createContext<
  {
    exact: boolean
    path: string
    layout: React.Component
  } & any
>({
  exact: undefined,
  path: undefined,
  layout: undefined,
})

/**
 *
 * @param props
 * @returns
 */
function getSiteLayout(props: AppProps) {
  const { Component, pageProps, router } = props
  const { route } = router

  const routes: any[] = globalRoutes

  for (let i = 0; i < routes.length; i += 1) {
    const curRoute = routes[i]
    const { exact, path, layout: PageLayout, ...layoutProps } = curRoute
    const match = matchPath(route, { path, exact })

    if (match) {
      return (
        <DefaultLayoutContext.Provider value={curRoute}>
          <WrapperReactQuery>
            {PageLayout ? (
              <PageLayout {...props} layoutProps={layoutProps} />
            ) : (
              <Component {...pageProps} key={router.route} />
            )}
          </WrapperReactQuery>
        </DefaultLayoutContext.Provider>
      )
    }
  }

  return (
    <DefaultLayoutContext.Provider value={pageProps}>
      <WrapperReactQuery>
        <Component {...pageProps} key={router.route} />
      </WrapperReactQuery>
    </DefaultLayoutContext.Provider>
  )
}

export default getSiteLayout

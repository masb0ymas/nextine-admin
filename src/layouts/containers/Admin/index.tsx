/* eslint-disable react/jsx-no-constructed-context-values */
import { ColorSchemeToggle } from '@core/components/ColorSchemeToggle/ColorSchemeToggle'
import {
  AppShell,
  Burger,
  Code,
  createStyles,
  Group,
  Header,
  Loader,
  MediaQuery,
  Navbar,
  ScrollArea,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { BRAND } from 'config/env'
import { ReactComponentLike } from 'prop-types'
import React, { useState } from 'react'
import FooterLayout from './Footer'
import { NavbarMenus } from './Sidebar/NavbarMenu'
import UserFooter from './Sidebar/UserFooter'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = createStyles((theme, _params, _getRef) => ({
  version: {
    backgroundColor: theme.fn.lighten(
      theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
        .background!,
      0.1,
    ),
    color: theme.white,
    fontWeight: 700,
  },

  inner: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
  },
}))

interface IProps {
  Component: ReactComponentLike
}

const AdminContext = React.createContext<
  {
    stateLayoutLoading: [boolean, (loading: boolean) => void]
  } & any
>({
  stateLayoutLoading: [false, () => {}],
})

/**
 *
 * @param props
 * @returns
 */
function AdminContainer(props: IProps) {
  const { Component } = props

  const stateLayoutLoading = useState(false)
  const [isLayoutLoading] = stateLayoutLoading

  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  const { classes } = useStyles()

  return (
    <AdminContext.Provider value={{ stateLayoutLoading }}>
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 300 }}
          >
            <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
              <NavbarMenus />
            </Navbar.Section>

            <Navbar.Section>
              <UserFooter />
            </Navbar.Section>
          </Navbar>
        }
        header={
          <Header height={70} p="md">
            <div className={classes.inner}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <Group position="apart" spacing="lg">
                <Text style={{ fontSize: 22, fontWeight: 600 }}>{BRAND}</Text>
                <Code className={classes.version}>v0.0.1</Code>
              </Group>

              <Group>
                <ColorSchemeToggle styleGroup={{ marginTop: 0 }} />
              </Group>
            </div>
          </Header>
        }
        footer={<FooterLayout />}
      >
        {isLayoutLoading && <Loader />}
        {/* start render component */}

        <Component {...props} />

        {/* end render component */}
      </AppShell>
    </AdminContext.Provider>
  )
}

export default AdminContainer

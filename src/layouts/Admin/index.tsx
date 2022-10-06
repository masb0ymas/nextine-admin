import {
  AppShell,
  Burger,
  Code,
  createStyles,
  Group,
  Header,
  MediaQuery,
  Navbar,
  ScrollArea,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { BRAND } from 'config/env'
import { useState } from 'react'
import FooterLayout from './Footer'
import { NavbarMenus } from './NavbarMenu'

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
}))

function AdminLayout() {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)

  const { classes } = useStyles()

  return (
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

          <Navbar.Section>{/* Footer with user */}</Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          <div
            style={{ display: 'flex', alignItems: 'center', height: '100%' }}
          >
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
          </div>
        </Header>
      }
      footer={<FooterLayout />}
    >
      <Text>Resize app to see responsive navbar in action</Text>
    </AppShell>
  )
}

export default AdminLayout

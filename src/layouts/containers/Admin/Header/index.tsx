import {
  Burger,
  Code,
  createStyles,
  Group,
  Header,
  MediaQuery,
  Text,
  useMantineTheme,
} from '@mantine/core'
import React from 'react'
import { BRAND } from '~/config/env'
import { ColorSchemeToggle } from '~/core/components/ColorSchemeToggle/ColorSchemeToggle'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const useStyles = createStyles((theme, _params, _getRef) => ({
  version: {
    backgroundColor: theme.fn.lighten(
      theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
        .background!,
      0.1
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

interface AdminHeaderLayoutProps {
  opened: boolean
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
}

function AdminHeaderLayout(props: AdminHeaderLayoutProps) {
  const { opened, setOpened } = props

  const theme = useMantineTheme()
  const { classes } = useStyles()

  return (
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
  )
}

export default AdminHeaderLayout

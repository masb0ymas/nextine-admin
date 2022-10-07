import { ColorSchemeToggle } from '@core/components/ColorSchemeToggle/ColorSchemeToggle'
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
import { BRAND } from 'config/env'
import React, { useState } from 'react'

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

function HeaderLayout() {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)

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
          <Text style={{ fontSize: 18, fontWeight: 600 }}>{BRAND}</Text>
          <Code className={classes.version}>v3.1.2</Code>
        </Group>

        <Group>
          <ColorSchemeToggle />
        </Group>
      </div>
    </Header>
  )
}

export default HeaderLayout

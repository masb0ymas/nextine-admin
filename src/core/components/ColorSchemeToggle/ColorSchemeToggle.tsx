import { ActionIcon, Group, useMantineColorScheme } from '@mantine/core'
import { IconMoonStars, IconSun } from '@tabler/icons-react'
import { CSSProperties } from 'react'

interface ColorSchemeToggleProps {
  styleGroup: CSSProperties
}

export function ColorSchemeToggle({
  styleGroup,
}: Partial<ColorSchemeToggleProps>) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <Group position="center" mt="xl" style={styleGroup}>
      <ActionIcon
        onClick={() => toggleColorScheme()}
        size="xl"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          color:
            theme.colorScheme === 'dark'
              ? theme.colors.yellow[4]
              : theme.colors.blue[6],
        })}
      >
        {colorScheme === 'dark' ? (
          <IconSun size={20} stroke={1.5} />
        ) : (
          <IconMoonStars size={20} stroke={1.5} />
        )}
      </ActionIcon>
    </Group>
  )
}

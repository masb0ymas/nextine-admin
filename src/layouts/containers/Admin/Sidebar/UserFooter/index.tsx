import {
  Avatar,
  Box,
  Group,
  Menu,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import {
  IconChevronLeft,
  IconChevronRight,
  IconLogout,
  IconUser,
} from '@tabler/icons'
import React from 'react'

function UserFooter() {
  const theme = useMantineTheme()
  const match = useMediaQuery('(max-width: 980px)')

  // const defaultPicture =
  //   'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80'
  const githubPicture =
    'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'

  async function handleLogout() {
    console.log('OKe')
  }

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `1px solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      }}
    >
      <UnstyledButton
        sx={{
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        }}
      >
        <Menu transition="pop" withArrow position={match ? 'top-end' : 'right'}>
          <Menu.Target>
            <Group>
              <Avatar src={githubPicture} radius="xl" />
              <Box sx={{ flex: 1 }}>
                <Text size="sm" weight={500}>
                  Hi, Super Admin
                </Text>
                <Text color="dimmed" size="xs">
                  super.admin@mail.com
                </Text>
              </Box>

              {theme.dir === 'ltr' ? (
                <IconChevronRight size={18} />
              ) : (
                <IconChevronLeft size={18} />
              )}
            </Group>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              aria-label="profile"
              icon={<IconUser size={16} stroke={1.5} />}
            >
              Profile
            </Menu.Item>
            <Menu.Item
              aria-label="logout"
              icon={<IconLogout size={16} stroke={1.5} />}
              color="red"
              onClick={() => handleLogout()}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </UnstyledButton>
    </Box>
  )
}

export default UserFooter

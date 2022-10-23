import { useAuthSession } from '@core/hooks/useAuthSession/useAuthSession'
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
import { showNotification } from '@mantine/notifications'
import {
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconLogout,
  IconUser,
  IconX,
} from '@tabler/icons'
import { useMutation } from '@tanstack/react-query'
import { LOCAL_STORAGE_SESSION } from 'config/env'
import useVerifySession from 'data/query/useVerifySession'
import AuthRepository from 'data/repository/AuthRepository'
import _ from 'lodash'
import Router from 'next/router'
import React from 'react'

// const defaultPicture =
//   'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80'
const githubPicture =
  'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'

function UserFooter() {
  const theme = useMantineTheme()
  const match = useMediaQuery('(max-width: 980px)')

  const userAuth = useAuthSession()
  const { remove } = useVerifySession()

  const postLogout = useMutation(() =>
    AuthRepository.logout({ UserId: String(userAuth?.data?.id) }),
  )

  async function handleLogout() {
    try {
      const response = await postLogout.mutateAsync()
      const message = _.get(response, 'data.message', '')

      // remove session
      localStorage.removeItem(LOCAL_STORAGE_SESSION)
      remove() // remove cache react query

      // show notif
      showNotification({
        title: `See you again!`,
        message,
        disallowClose: true,
        color: 'green',
        icon: <IconCheck size={16} />,
      })

      // direct success login
      Router.push('/login')
    } catch (error) {
      const errMessage = _.get(error, 'response.data.message', '')

      showNotification({
        title: 'Error',
        message: errMessage,
        icon: <IconX size={16} />,
        color: 'red',
      })
    }
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
                  {`Hi, ${userAuth?.data?.fullName}`}
                </Text>
                <Text color="dimmed" size="xs">
                  {userAuth?.data?.email}
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

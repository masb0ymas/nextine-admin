import { ColorSchemeToggle } from '@core/components/ColorSchemeToggle/ColorSchemeToggle'
import MyLoadingOverlay from '@core/components/MyLoadingOverlay'
import { useAuthSession } from '@core/hooks/useAuthSession/useAuthSession'
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons'
import { useMutation } from '@tanstack/react-query'
import { LOCAL_STORAGE_SESSION } from 'config/env'
import { LoginAttributes } from 'data/entities/User'
import AuthRepository from 'data/repository/AuthRepository'
import _ from 'lodash'
import Link from 'next/link'
import Router from 'next/router'
import { useState } from 'react'

function LoginPage() {
  const [visible, setVisible] = useState(false)

  const userAuth = useAuthSession()

  const form = useForm({
    initialValues: { password: '', email: '' },

    // functions will be used to validate values at corresponding key
    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : 'Invalid email',
      password: (value: string) =>
        value.length < 8 ? 'Password must have at least 8 letters' : null,
    },
  })

  const postLogin = useMutation((data: LoginAttributes) =>
    AuthRepository.login(data),
  )

  const onFormSubmit = async () => {
    setVisible(true)
    try {
      const response = await postLogin.mutateAsync(form.values)
      const message = _.get(response, 'data.message', '') as string
      const fullName = _.get(response, 'data.fullName', 'John Doe') as string
      const accessToken = _.get(response, 'data.accessToken', {}) as string

      // save session
      localStorage.setItem(LOCAL_STORAGE_SESSION, accessToken)

      // show notif
      showNotification({
        title: `Welcome back, ${fullName}`,
        message,
        disallowClose: true,
        color: 'green',
        icon: <IconCheck size={16} />,
      })

      // direct success login
      Router.push('/admin/dashboard')
    } catch (error) {
      const errMessage = _.get(error, 'response.data.message', '')

      console.log(error, errMessage)
    } finally {
      setVisible(false)
    }
  }

  if (!_.isEmpty(userAuth.data)) {
    Router.push('/admin/dashboard')
  }

  return (
    <Container size={420} my={100}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        {`Do not have an account yet? `}
        <Anchor<'a'>
          href="#"
          size="sm"
          onClick={(event) => event.preventDefault()}
        >
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <MyLoadingOverlay visible={visible} />
        <form onSubmit={form.onSubmit(onFormSubmit)}>
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            {...form.getInputProps('email')}
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            {...form.getInputProps('password')}
          />

          <Group position="apart" mt="md">
            <Checkbox label="Remember me" />

            <Link href="/forgot-password" passHref>
              <Anchor<'a'> size="sm">Forgot password?</Anchor>
            </Link>
          </Group>

          <Button fullWidth mt="xl" type="submit" loading={visible}>
            Sign in
          </Button>
        </form>
      </Paper>

      <ColorSchemeToggle />
    </Container>
  )
}

export default LoginPage

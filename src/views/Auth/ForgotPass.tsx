import { ColorSchemeToggle } from '@core/components/ColorSchemeToggle/ColorSchemeToggle'
import {
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { IconArrowLeft, IconCheck } from '@tabler/icons'
import Link from 'next/link'

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 26,
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column-reverse',
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
}))

export function ForgotPassPage() {
  const { classes } = useStyles()

  return (
    <Container size={460} my={100}>
      <Title className={classes.title} align="center">
        Forgot your password?
      </Title>
      <Text color="dimmed" size="sm" align="center">
        Enter your email to get a reset link
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <TextInput label="Your email" placeholder="me@mantine.dev" required />

        <Group position="apart" mt="lg" className={classes.controls}>
          <Link href="/login" passHref>
            <Anchor color="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <IconArrowLeft size={12} stroke={1.5} />
                <Box ml={5}>Back to login page</Box>
              </Center>
            </Anchor>
          </Link>
          <Button
            className={classes.control}
            onClick={() =>
              showNotification({
                title: 'Request Reset Password',
                message: 'Please check your email for the next steps',
                icon: <IconCheck size={16} />,
              })
            }
          >
            Reset password
          </Button>
        </Group>
      </Paper>

      <ColorSchemeToggle />
    </Container>
  )
}

export default ForgotPassPage

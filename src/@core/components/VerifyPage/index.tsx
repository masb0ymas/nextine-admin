import { Avatar, Center, createStyles, Stack, Text } from '@mantine/core'

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.colors.blue,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  },

  avatar: {
    height: '20vmin',
    width: '20vmin',
    borderRadius: '72px',
    pointerEvents: 'none',
    background: 'white',
    fontSize: '20vmin',
    lineHeight: '20vmin',
    animation: 'pulse infinite 1.5s linear',
  },

  anim: {
    animation: 'pulse infinite 0.6s linear',
  },

  '@global': {
    '@keyframes pulse': {
      '0%': {
        transform: 'scale(0.7)',
        boxShadow: '0 0 0 0 rgba(255, 255, 255, 0.7)',
      },

      '70%': {
        transform: 'scale(0.8)',
        boxShadow: '0 0 0 10px rgba(255, 255, 255, 0)',
      },

      '100%': {
        transform: 'scale(0.7)',
        boxShadow: '0 0 0 0 rgba(255, 255, 255, 0)',
      },
    },
  },
}))

interface VerifyPageProps {
  isLoading: boolean
}

function VerifyPage(props: VerifyPageProps) {
  const { isLoading = true } = props

  const { classes, cx } = useStyles()

  const githubPicture =
    'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'

  return (
    <div className={classes.wrapper}>
      <Center>
        <Stack spacing="xs" align="center">
          <Avatar
            src={githubPicture}
            className={cx(classes.avatar, { [classes.anim]: isLoading })}
          />
          <Text size="lg">Wait a moment . . .</Text>
        </Stack>
      </Center>
    </div>
  )
}

export default VerifyPage

import { createStyles, Container, Group, ActionIcon, Text } from '@mantine/core'
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from '@tabler/icons'

const useStyles = createStyles((theme) => ({
  footer: {
    position: 'initial',
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
  },
}))

function FooterLayout() {
  const { classes } = useStyles()

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text
          className={classes.link}
          style={{ fontSize: 18, fontWeight: 600 }}
        >
          My App
        </Text>

        <Group spacing={0} className={classes.links} position="right" noWrap>
          <ActionIcon size="lg">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  )
}

export default FooterLayout

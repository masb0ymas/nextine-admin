import {
  Anchor,
  Code,
  createStyles,
  Group,
  Navbar,
  NavLink,
  Text,
} from '@mantine/core'
import {
  IconDatabase,
  IconGauge,
  IconLogout,
  IconSettings,
  IconUser,
} from '@tabler/icons'
import _ from 'lodash'
import Link from 'next/link'
import { useState } from 'react'

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon')
  console.log(icon)

  return {
    navbar: {
      backgroundColor: theme.fn.variant({
        variant: 'filled',
        color: theme.primaryColor,
      }).background,
    },

    version: {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
          .background!,
        0.1,
      ),
      color: theme.white,
      fontWeight: 700,
    },

    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
          .background!,
        0.1,
      )}`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
          .background!,
        0.1,
      )}`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.white,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
            .background!,
          0.1,
        ),
      },
    },

    linkBorder: {
      ...theme.fn.focusStyles(),
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      paddingLeft: 40,
      fontSize: theme.fontSizes.sm,
      color: theme.white,
      borderLeft: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,

      '&:hover': {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
            .background!,
          0.1,
        ),
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.white,
      opacity: 0.75,
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
            .background!,
          0.15,
        ),
        [`& .${icon}`]: {
          opacity: 0.9,
        },
      },
    },
  }
})

const data = [
  { label: 'Dashboard', icon: IconGauge, link: '/admin/dashboard' },
  {
    label: 'Settings',
    icon: IconSettings,
    links: [
      {
        label: 'Account',
        icon: IconUser,
        link: '/admin/settings/account',
      },
      {
        label: 'Master Data',
        icon: IconDatabase,
        link: '/admin/settings/master',
      },
    ],
  },
]

function SiderbarLayout() {
  const { classes, cx } = useStyles()
  const [active, setActive] = useState('Billing')

  const links = data.map((item) => (
    <NavLink
      key={item.label}
      label={item.label}
      component="a"
      href={item.link}
      icon={<item.icon className={classes.linkIcon} stroke={1.5} />}
      childrenOffset={20}
      defaultOpened={false}
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
    >
      {!_.isEmpty(item.links) &&
        _.isArray(item.links) &&
        item.links.map((child) => (
          <NavLink
            key={item.label}
            label={child.label}
            component="a"
            href={child.link}
            // icon={<child.icon className={classes.linkIcon} stroke={1.5} />}
            className={cx(classes.linkBorder, {
              [classes.linkActive]: child.label === active,
            })}
          />
        ))}
    </NavLink>

    // <a
    //   className={cx(classes.link, {
    //     [classes.linkActive]: item.label === active,
    //   })}
    //   href={item.link}
    //   key={item.label}
    //   onClick={(event) => {
    //     event.preventDefault()
    //     setActive(item.label)
    //   }}
    // >
    //   <item.icon className={classes.linkIcon} stroke={1.5} />
    //   <span>{item.label}</span>
    // </a>
  ))

  return (
    <Navbar
      height="100vh"
      width={{ sm: 250 }}
      p="md"
      className={classes.navbar}
    >
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Text
            className={classes.link}
            style={{ fontSize: 18, fontWeight: 600 }}
          >
            My App
          </Text>
          <Code className={classes.version}>v3.1.2</Code>
        </Group>

        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Link href="/login" passHref>
          <Anchor<'a'> size="sm" className={classes.link}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            Logout
          </Anchor>
        </Link>
      </Navbar.Section>
    </Navbar>
  )
}

export default SiderbarLayout

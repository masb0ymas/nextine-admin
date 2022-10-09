import { createStyles, NavLink } from '@mantine/core'
import useMenuSidebar, { MainLinkProps } from 'data/query/useMenuSidebar'
import _ from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const useStyles = createStyles((theme) => ({
  link: {
    fontWeight: 500,
    display: 'block',
    textDecoration: 'none',
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    paddingLeft: '20px',
    marginLeft: '20px',
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    borderLeft: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    width: 'auto',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },
}))

function MainLink(item: MainLinkProps) {
  const { classes } = useStyles()
  const router = useRouter()

  return (
    <Link href={item.link ?? '#'} passHref key={item.label}>
      <NavLink
        key={item.label}
        label={item.label}
        icon={item.icon}
        component="a"
        childrenOffset={0}
        active={router.pathname === item.link}
      >
        {!_.isEmpty(item.links) &&
          _.isArray(item.links) &&
          item.links.map((child) => (
            <Link href={child.link ?? '#'} passHref key={child.label}>
              <NavLink
                key={child.label}
                label={child.label}
                component="a"
                className={classes.link}
                active={router.pathname === child.link}
              />
            </Link>
          ))}
      </NavLink>
    </Link>
  )
}

export function NavbarMenus() {
  const queryMenuSidebar = useMenuSidebar()
  const { data } = queryMenuSidebar

  const links = data.map((link) => <MainLink {...link} key={link.label} />)
  return <div>{links}</div>
}

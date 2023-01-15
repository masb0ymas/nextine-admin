import PageHeader from '@core/components/PageHeader'
import { capitalizeFirstLetter } from '@core/helpers/String'
import { Divider, Paper, Tabs } from '@mantine/core'
import { IconAdjustmentsAlt, IconUsers } from '@tabler/icons'
import { useRouter } from 'next/router'
import SettingRoleTab from './Role'
import SettingUserTab from './User'

function AccountPage() {
  const router = useRouter()
  const baseUrl = `/admin/settings/account`

  const subTitle = capitalizeFirstLetter(
    (router.query.tabs as string) || 'Users'
  )

  return (
    <Paper shadow="sm" p="xl" radius="md">
      <PageHeader title="Account" subTitle={subTitle} />

      <Divider variant="dashed" />

      <Tabs
        keepMounted={false}
        variant="pills"
        radius="md"
        my="sm"
        defaultValue="user"
        value={router.query.tabs as string}
        onTabChange={(value) => router.push(`${baseUrl}?tabs=${value}`)}
        styles={(theme) => ({
          tab: {
            ...theme.fn.focusStyles(),
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.blue[0],
            color:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[0]
                : theme.colors.gray[9],
          },
        })}
      >
        <Tabs.List>
          <Tabs.Tab value="user" icon={<IconUsers size={14} />}>
            Users
          </Tabs.Tab>

          <Tabs.Tab value="role" icon={<IconAdjustmentsAlt size={14} />}>
            Role
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="user" pt="xs">
          <SettingUserTab />
        </Tabs.Panel>

        <Tabs.Panel value="role" pt="xs">
          <SettingRoleTab />
        </Tabs.Panel>
      </Tabs>
    </Paper>
  )
}

export default AccountPage

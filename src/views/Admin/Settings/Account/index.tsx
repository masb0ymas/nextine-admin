import { Paper, Tabs } from '@mantine/core'
import { IconAdjustmentsAlt, IconClock, IconUsers } from '@tabler/icons'

function AccountPage() {
  return (
    <Paper shadow="sm" p="md" radius={12}>
      <Tabs variant="pills" radius="md" defaultValue="users">
        <Tabs.List>
          <Tabs.Tab value="users" icon={<IconUsers size={14} />}>
            Users
          </Tabs.Tab>
          <Tabs.Tab value="role" icon={<IconAdjustmentsAlt size={14} />}>
            Role
          </Tabs.Tab>
          <Tabs.Tab value="session" icon={<IconClock size={14} />}>
            Session
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="users" pt="xs">
          Users tab content
        </Tabs.Panel>

        <Tabs.Panel value="role" pt="xs">
          Role tab content
        </Tabs.Panel>

        <Tabs.Panel value="session" pt="xs">
          Session tab content
        </Tabs.Panel>
      </Tabs>
    </Paper>
  )
}

export default AccountPage

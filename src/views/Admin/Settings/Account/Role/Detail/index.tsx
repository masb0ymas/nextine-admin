/* eslint-disable react/no-danger */
import { useStyleModal } from '@core/components/MyModal/MyModal'
import { formatDateTime } from '@core/helpers/Date'
import { Divider, Group, Stack, Text } from '@mantine/core'
import { RoleEntity } from 'data/entities/Role'

function DetailSettingRoleModal({ data }: { data: RoleEntity }) {
  const { classes } = useStyleModal()

  return (
    <div>
      <Divider variant="solid" />

      <Stack mt="md">
        <Group>
          <Text className={classes.modalLabel} size="sm">
            Nama
          </Text>
          <Text size="sm">{data.name}</Text>
        </Group>

        <Group>
          <Text className={classes.modalLabel} size="sm">
            Created At
          </Text>
          <Text size="sm">{formatDateTime(data.createdAt)}</Text>
        </Group>
      </Stack>
    </div>
  )
}

export default DetailSettingRoleModal

/* eslint-disable react/no-danger */
import { useStyleModal } from '@core/components/MyModal/MyModal'
import { formatDateTime } from '@core/helpers/Date'
import formatPhone from '@core/helpers/Phone'
import { Divider, Group, Stack, Text } from '@mantine/core'
import { UserEntity } from 'data/entities/User'

function DetailSettingUserModal({ data }: { data: UserEntity }) {
  const { classes } = useStyleModal()

  return (
    <div>
      <Divider variant="solid" />

      <Stack mt="md">
        <Group>
          <Text className={classes.modalLabel} size="sm">
            Fullname
          </Text>
          <Text size="sm">{data.fullname}</Text>
        </Group>

        <Group>
          <Text className={classes.modalLabel} size="sm">
            email
          </Text>
          <Text size="sm">{data.email}</Text>
        </Group>

        <Group>
          <Text className={classes.modalLabel} size="sm">
            Phone
          </Text>
          <Text size="sm">{formatPhone(data.phone) ?? '-'}</Text>
        </Group>

        <Group>
          <Text className={classes.modalLabel} size="sm">
            Role
          </Text>
          <Text size="sm">{data.Role?.name}</Text>
        </Group>

        <Group>
          <Text className={classes.modalLabel} size="sm">
            Tanggal daftar
          </Text>
          <Text size="sm">{formatDateTime(data.createdAt)}</Text>
        </Group>
      </Stack>
    </div>
  )
}

export default DetailSettingUserModal

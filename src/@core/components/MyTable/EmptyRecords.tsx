import { Center, Stack, Text, ThemeIcon } from '@mantine/core'
import { IconDatabaseOff } from '@tabler/icons'

function EmptyRecords() {
  return (
    <Center>
      <Stack align="center">
        <ThemeIcon variant="light" radius="xl" size="xl" color="gray">
          <IconDatabaseOff />
        </ThemeIcon>

        <Text>No records</Text>
      </Stack>
    </Center>
  )
}

export default EmptyRecords

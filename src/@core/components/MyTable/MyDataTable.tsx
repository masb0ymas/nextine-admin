import {
  Box,
  createStyles,
  Divider,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { openModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { IconEdit, IconTrash, IconTrashX } from '@tabler/icons'
import { UserRelationEntity } from 'data/entities/User'
import useUser from 'data/query/useUser'
import dayjs from 'dayjs'
import { DataTable } from 'mantine-datatable'
import { useState } from 'react'

const useStyles = createStyles((theme) => ({
  modal: { width: 800 },
  modalTitle: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    fontWeight: 700,
  },
  modalLabel: { width: 150, fontWeight: 600 },
}))

const PAGE_SIZE = 10

function MyDataTable() {
  const [page, setPage] = useState(1)

  const queryUser = useUser()
  const { data, isFetching, total } = queryUser
  const newData = data ?? []

  const [selectedRecords, setSelectedRecords] = useState<UserRelationEntity[]>(
    [],
  )

  const {
    breakpoints: { xs: xsBreakpoint },
  } = useMantineTheme()
  const aboveXsMediaQuery = `(min-width: ${xsBreakpoint}px)`

  const { classes } = useStyles()

  return (
    // place the data table in a height-restricted container to make it vertically-scrollable
    <Box sx={{ height: 320 }} mt={10}>
      <DataTable
        withBorder={false}
        borderRadius="sm"
        withColumnBorders
        striped={false}
        highlightOnHover
        verticalAlignment="top"
        verticalSpacing="md"
        horizontalSpacing="md"
        fetching={isFetching}
        columns={[
          {
            accessor: 'fullName',
            title: 'Fullname',
            width: 150,
            ellipsis: true,
          },
          {
            accessor: 'email',
            visibleMediaQuery: aboveXsMediaQuery,
          },
          {
            accessor: 'Role.name',
            title: 'Role',
            width: 150,
            visibleMediaQuery: aboveXsMediaQuery,
          },
          {
            accessor: 'phone',
            title: 'Phone',
            width: 130,
            visibleMediaQuery: aboveXsMediaQuery,
          },
          {
            accessor: 'createdAt',
            title: 'Register At',
            textAlignment: 'right',
            render: ({ createdAt }) => dayjs(createdAt).format('DD MMMM YYYY'),
          },
        ]}
        records={newData}
        page={page}
        onPageChange={setPage}
        totalRecords={total}
        recordsPerPage={PAGE_SIZE}
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
        onRowClick={({ fullName, email, Role, createdAt }) =>
          openModal({
            title: `User Detail`,
            classNames: { modal: classes.modal, title: classes.modalTitle },
            children: (
              <div>
                <Divider variant="dashed" />

                <Stack mt="md">
                  <Group>
                    <Text className={classes.modalLabel} size="sm">
                      Fullname
                    </Text>
                    <Text size="sm">{fullName}</Text>
                  </Group>

                  <Group>
                    <Text className={classes.modalLabel} size="sm">
                      email
                    </Text>
                    <Text size="sm">{email}</Text>
                  </Group>

                  <Group>
                    <Text className={classes.modalLabel} size="sm">
                      Role
                    </Text>
                    <Text size="sm">{Role?.name}</Text>
                  </Group>

                  <Group>
                    <Text className={classes.modalLabel} size="sm">
                      Register At
                    </Text>
                    <Text size="sm">
                      {dayjs(createdAt).format('DD MMMM YYYY')}
                    </Text>
                  </Group>
                </Stack>
              </div>
            ),
          })
        }
        rowContextMenu={{
          borderRadius: 'md',
          items: ({ id }) => [
            {
              key: 'edit',
              icon: <IconEdit size={14} />,
              title: `Edit`,
              onClick: () =>
                showNotification({
                  color: 'orange',
                  message: `Should edit this record`,
                }),
            },
            {
              key: 'delete',
              title: `Delete`,
              icon: <IconTrashX size={14} />,
              color: 'red',
              onClick: () =>
                showNotification({
                  color: 'red',
                  message: `Should delete this record`,
                }),
            },
            { key: 'divider-1', divider: true },
            {
              key: 'deleteMany',
              hidden:
                selectedRecords.length <= 1 ||
                !selectedRecords.map((r) => r.id).includes(id),
              title: `Delete ${selectedRecords.length} selected records`,
              icon: <IconTrash size={14} />,
              color: 'red',
              onClick: () =>
                showNotification({
                  color: 'red',
                  message: `Should delete ${selectedRecords.length} records`,
                }),
            },
          ],
        }}
      />
    </Box>
  )
}

export default MyDataTable

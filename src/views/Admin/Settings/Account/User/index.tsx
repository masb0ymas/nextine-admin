/* eslint-disable @typescript-eslint/no-unused-vars */
import formatPhone from '@core/helpers/Phone'
import useDebounce from '@core/hooks/useDebounce/useDebounce'
import {
  ActionIcon,
  Button,
  Checkbox,
  createStyles,
  Divider,
  Grid,
  Group,
  Input,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { openModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import {
  IconEdit,
  IconPlus,
  IconSearch,
  IconTrash,
  IconTrashX,
} from '@tabler/icons'
import { UserRelationEntity } from 'data/entities/User'
import useUser from 'data/query/useUser'
import dayjs from 'dayjs'
import {
  DataTable,
  DataTableColumn,
  DataTableContextMenuItemProps,
} from 'mantine-datatable'
import { useEffect, useState } from 'react'

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

function UserPage() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [name, setName] = useState(undefined)

  const debouncedName = useDebounce(name, 500)

  const [selectedRecords, setSelectedRecords] = useState<UserRelationEntity[]>(
    [],
  )

  const { classes } = useStyles()

  const queryUser = useUser()
  const { data, refetch, isFetching, total, helpers } = queryUser
  const newData = data ?? []

  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    helpers.setQuery((helper) => {
      helper.query.set('page', undefined)
      helper.filtered.set('fullName', debouncedName)
    })
  }, [debouncedName])

  const {
    breakpoints: { xs: xsBreakpoint },
  } = useMantineTheme()
  const aboveXsMediaQuery = `(min-width: ${xsBreakpoint}px)`

  const columns: DataTableColumn<UserRelationEntity>[] = [
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
      accessor: 'phone',
      title: 'Phone',
      width: 170,
      visibleMediaQuery: aboveXsMediaQuery,
      render: (info) => formatPhone(info.phone),
    },
    {
      accessor: 'isActive',
      title: 'Active',
      textAlignment: 'center',
      width: 100,
      render: (info) => <Checkbox checked={info.isActive} />,
    },
    {
      accessor: 'isBlocked',
      title: 'Blocked',
      textAlignment: 'center',
      width: 100,
      render: (info) => <Checkbox checked={info.isBlocked} />,
    },
    {
      accessor: 'Role.name',
      title: 'Role',
      width: 150,
      visibleMediaQuery: aboveXsMediaQuery,
    },
    {
      accessor: 'createdAt',
      title: 'Register At',
      textAlignment: 'right',
      width: 180,
      render: (info) => dayjs(info?.createdAt).format('DD MMMM YYYY'),
    },
    {
      accessor: 'actions',
      title: <Text mr="xs">Actions</Text>,
      textAlignment: 'center',
      render: (info) => (
        <Group spacing={4} position="center" noWrap>
          <ActionIcon color="blue" onClick={() => console.log('Edit', info.id)}>
            <IconEdit size={18} />
          </ActionIcon>
          <ActionIcon
            color="red"
            onClick={() => console.log('Delete', info.id)}
          >
            <IconTrash size={18} />
          </ActionIcon>
        </Group>
      ),
    },
  ]

  function showModalContent(info: UserRelationEntity) {
    return openModal({
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
              <Text size="sm">{info.fullName}</Text>
            </Group>

            <Group>
              <Text className={classes.modalLabel} size="sm">
                email
              </Text>
              <Text size="sm">{info.email}</Text>
            </Group>

            <Group>
              <Text className={classes.modalLabel} size="sm">
                Role
              </Text>
              <Text size="sm">{info.Role?.name}</Text>
            </Group>

            <Group>
              <Text className={classes.modalLabel} size="sm">
                Register At
              </Text>
              <Text size="sm">
                {dayjs(info.createdAt).format('DD MMMM YYYY')}
              </Text>
            </Group>
          </Stack>
        </div>
      ),
    })
  }

  return (
    <div>
      <Grid my={12}>
        <Grid.Col span={3}>
          <Input
            icon={<IconSearch size={16} />}
            placeholder="Search..."
            onChange={(e: any) => setName(e.target.value)}
          />
        </Grid.Col>
        <Grid.Col span="auto" />
        <Grid.Col span={2} style={{ textAlign: 'right' }}>
          <Button leftIcon={<IconPlus size={18} />}>Add</Button>
        </Grid.Col>
      </Grid>

      <Divider variant="dotted" />

      <DataTable
        minHeight={350}
        withBorder={false}
        borderRadius="sm"
        withColumnBorders
        striped={false}
        highlightOnHover
        verticalAlignment="top"
        verticalSpacing="md"
        horizontalSpacing="md"
        noRecordsText="No records to show"
        fetching={isFetching}
        columns={columns}
        records={newData}
        page={page}
        onPageChange={setPage}
        totalRecords={total}
        recordsPerPage={pageSize}
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
        onRowClick={(info) => showModalContent(info)}
        rowContextMenu={{
          borderRadius: 'md',
          items: (info) => [
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
              hidden:
                selectedRecords.length !== 0 && selectedRecords.length > 1,
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
                !selectedRecords.map((r) => r.id).includes(info.id),
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
    </div>
  )
}

export default UserPage

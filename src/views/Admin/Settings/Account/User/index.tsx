import { useStyleModal } from '@core/components/MyModal/MyModal'
import MyTable from '@core/components/MyTable/MyTable'
import { formatDateTime } from '@core/helpers/Date'
import formatPhone from '@core/helpers/Phone'
import useDebounce from '@core/hooks/useDebounce/useDebounce'
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Input,
  useMantineTheme,
} from '@mantine/core'
import { openModal } from '@mantine/modals'
import { IconPlus, IconSearch } from '@tabler/icons'
import { useMutation } from '@tanstack/react-query'
import { UserEntity } from 'data/entities/User'
import useUser from 'data/query/User/useUser'
import UserRepository from 'data/repository/UserRepository'
import { queryClient } from 'layouts/core'
import { DataTableColumn } from 'mantine-datatable'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import DetailSettingUserModal from './Detail'

function SettingUserTab() {
  const { classes } = useStyleModal()

  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)

  const [name, setName] = useState(undefined)
  const debouncedName = useDebounce(name, 500)

  const baseURL = '/admin/settings/account/user'

  const queryData = useUser({
    query: {
      defaultValue: {
        page,
        pageSize,
      },
    },
  })
  const { helpers } = queryData

  useEffect(() => {
    helpers.setQuery((helper) => {
      helper.query.set('page', undefined)
      helper.filtered.set('fullname', debouncedName)
    })
  }, [debouncedName])

  useEffect(() => {
    helpers.setQuery((helper) => {
      helper.query.set('page', page ?? 1)
    })
  }, [page])

  const {
    breakpoints: { xs: xsBreakpoint },
  } = useMantineTheme()
  const aboveXsMediaQuery = `(min-width: ${xsBreakpoint}px)`

  // Mutation Delete
  const softDelete = useMutation(
    (id: string) => UserRepository.softDelete(id),
    {
      onSettled() {
        queryClient.invalidateQueries(['/user'])
      },
    }
  )

  // Mutation Multiple Delete
  const multipleSoftDelete = useMutation(
    (listChecked: string | string[]) =>
      UserRepository.multipleSoftDelete({ ids: listChecked }),
    {
      onSettled() {
        queryClient.invalidateQueries(['/user'])
      },
    }
  )

  const columns: DataTableColumn<UserEntity>[] = [
    {
      accessor: 'fullname',
      title: 'Nama lengkap',
      textAlignment: 'center',
      width: 300,
      ellipsis: true,
    },
    {
      accessor: 'email',
      title: 'Email',
      textAlignment: 'center',
      width: 300,
    },
    {
      accessor: 'phone',
      title: 'Phone',
      textAlignment: 'center',
      width: 170,
      visibleMediaQuery: aboveXsMediaQuery,
      render: (info) => formatPhone(info.phone),
    },
    {
      accessor: 'isActive',
      title: 'Aktif',
      textAlignment: 'center',
      width: 100,
      render: (info) => <Checkbox checked={info.isActive} />,
    },
    {
      accessor: 'isBlocked',
      title: 'Block',
      textAlignment: 'center',
      width: 100,
      render: (info) => <Checkbox checked={info.isBlocked} />,
    },
    {
      accessor: 'Role.name',
      title: 'Role',
      width: 150,
      textAlignment: 'center',
      visibleMediaQuery: aboveXsMediaQuery,
    },
    {
      accessor: 'createdAt',
      title: 'Tanggal daftar',
      textAlignment: 'center',
      width: 180,
      render: (info) => formatDateTime(info.createdAt),
    },
  ]

  return (
    <div>
      <Divider variant="dashed" />

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
          <Link href={`${baseURL}/users/add`}>
            <Button leftIcon={<IconPlus size={18} />}>Add</Button>
          </Link>
        </Grid.Col>
      </Grid>

      <Divider variant="dotted" />

      <MyTable<UserEntity>
        baseURL={baseURL}
        columns={columns}
        query={queryData}
        page={page}
        onPageChange={setPage}
        recordsPerPage={pageSize}
        showModalDetail={(info: UserEntity) => {
          openModal({
            centered: true,
            title: `Detail User`,
            classNames: { modal: classes.modal, title: classes.modalTitle },
            children: <DetailSettingUserModal data={info} />,
          })
        }}
        // @ts-expect-error
        softDelete={softDelete}
        // @ts-expect-error
        multipleSoftDelete={multipleSoftDelete}
      />
    </div>
  )
}

export default SettingUserTab

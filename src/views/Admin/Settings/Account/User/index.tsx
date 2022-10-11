import MyTable from '@core/components/MyTable/MyTable'
import formatPhone from '@core/helpers/Phone'
import {
  Button,
  Checkbox,
  Grid,
  Input,
  Pagination,
  ThemeIcon,
} from '@mantine/core'
import { IconEdit, IconEyeCheck, IconPlus, IconSearch } from '@tabler/icons'
import { createColumnHelper } from '@tanstack/react-table'
import { UserRelationEntity } from 'data/entities/User'

const data: UserRelationEntity[] = [
  {
    id: 'acd85619-3138-46b3-abef-0d20b6a3cd5e',
    fullName: 'Upin',
    isActive: true,
    phone: '+6281234567890',
    Role: { name: 'Super Admin' },
    email: 'super.admin@mail.com',
  },
  {
    id: '759cdf37-8ce4-45a8-8fc6-5d5c7c11d0cb',
    fullName: 'Ipin',
    isActive: true,
    phone: '+6281234567890',
    Role: { name: 'Admin' },
    email: 'admin@mail.com',
  },
  {
    id: 'a5bb8503-44d6-4219-be6e-3f295dd193fd',
    fullName: 'Ehsan',
    isActive: false,
    phone: null,
    Role: { name: 'User' },
    email: 'user@mail.com',
  },
  {
    id: 'de8de118-82aa-4684-aea7-2a0da99e8508',
    fullName: 'Fizi',
    isActive: true,
    phone: null,
    Role: { name: 'Guest' },
    email: 'guest@mail.com',
  },
  {
    id: '0f802cd0-b669-4b12-a787-86e805e9d982',
    fullName: 'Mail',
    isActive: true,
    phone: null,
    Role: { name: 'Owner' },
    email: 'owner@mail.com',
  },
  {
    id: 'acd85619-3138-46b3-abef-0d20b6a3cd5e',
    fullName: 'Mei mei',
    isActive: true,
    phone: '+6281234567890',
    Role: { name: 'Super Admin' },
    email: 'super.admin@mail.com',
  },
  {
    id: '759cdf37-8ce4-45a8-8fc6-5d5c7c11d0cb',
    fullName: 'Susanti',
    isActive: true,
    phone: '+6281234567890',
    Role: { name: 'Admin' },
    email: 'admin@mail.com',
  },
  {
    id: 'a5bb8503-44d6-4219-be6e-3f295dd193fd',
    fullName: 'Ijat',
    isActive: false,
    phone: null,
    Role: { name: 'User' },
    email: 'user@mail.com',
  },
  {
    id: 'de8de118-82aa-4684-aea7-2a0da99e8508',
    fullName: 'Tok Abah',
    isActive: true,
    phone: null,
    Role: { name: 'Guest' },
    email: 'guest@mail.com',
  },
  {
    id: '0f802cd0-b669-4b12-a787-86e805e9d982',
    fullName: 'Kak Ros',
    isActive: true,
    phone: null,
    Role: { name: 'Owner' },
    email: 'owner@mail.com',
  },
]

function UserPage() {
  const columnHelper = createColumnHelper<UserRelationEntity>()

  const columns = [
    columnHelper.accessor('id', {
      header: 'No',
      size: 10,
      cell: (info) => info.row.index + 1,
    }),
    columnHelper.accessor('fullName', {
      header: 'Fullname',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('phone', {
      header: 'Phone',
      cell: (info) => {
        const value = info.getValue()
        return formatPhone(value)
      },
    }),
    columnHelper.accessor('isActive', {
      header: 'Active',
      size: 10,
      cell: (info) => {
        const value = info.getValue()
        return <Checkbox checked={value} readOnly />
      },
    }),
    columnHelper.accessor('Role', {
      header: 'Role',
      cell: (info) => {
        const value = info.getValue()
        return value?.name
      },
    }),
    columnHelper.accessor('id', {
      header: 'Detail',
      size: 10,
      cell: (info) => {
        const value = info.getValue()
        console.log(value)

        return (
          <ThemeIcon variant="light" radius="md" size="md" color="teal">
            <IconEyeCheck />
          </ThemeIcon>
        )
      },
    }),
    columnHelper.accessor('id', {
      header: 'Edit',
      size: 10,
      cell: (info) => {
        const value = info.getValue()
        console.log(value)

        return (
          <ThemeIcon variant="light" radius="md" size="md">
            <IconEdit />
          </ThemeIcon>
        )
      },
    }),
  ]

  return (
    <div>
      <Grid my={12}>
        <Grid.Col span={3}>
          <Input icon={<IconSearch size={16} />} placeholder="Search..." />
        </Grid.Col>
        <Grid.Col span="auto" />
        <Grid.Col span={2} style={{ textAlign: 'right' }}>
          <Button leftIcon={<IconPlus size={18} />}>Add</Button>
        </Grid.Col>
      </Grid>

      <MyTable data={data} columns={columns} />

      <Pagination mt="md" total={10} position="right" />
    </div>
  )
}

export default UserPage

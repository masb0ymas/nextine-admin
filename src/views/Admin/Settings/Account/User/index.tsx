import {
  Button,
  Checkbox,
  createStyles,
  Grid,
  Input,
  Pagination,
  Table,
} from '@mantine/core'
import { IconPlus, IconSearch } from '@tabler/icons'

const elements = [
  {
    fullName: 'Upin',
    isActive: true,
    Role: 'Super Admin',
    email: 'super.admin@mail.com',
  },
  { fullName: 'Ipin', isActive: true, Role: 'Admin', email: 'admin@mail.com' },
  { fullName: 'Ehsan', isActive: false, Role: 'User', email: 'user@mail.com' },
  { fullName: 'Fizi', isActive: true, Role: 'Guest', email: 'guest@mail.com' },
  { fullName: 'Mail', isActive: true, Role: 'Owner', email: 'owner@mail.com' },
]

const useStyles = createStyles(() => ({
  th: {
    width: 40,
    textAlign: 'center',
    justifyContent: 'center',
  },

  td: {
    width: 40,
    textAlign: 'center',
    justifyContent: 'center',
  },
}))

function UserPage() {
  const { classes } = useStyles()

  const rows = elements.map((element, index) => (
    <tr key={element.email}>
      <td className={classes.td}>{index + 1}</td>
      <td>{element.fullName}</td>
      <td>{element.email}</td>
      <td className={classes.td}>
        <Checkbox checked={element.isActive} />
      </td>
      <td>{element.Role}</td>
    </tr>
  ))

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

      <Table highlightOnHover withColumnBorders verticalSpacing="sm">
        <thead>
          <tr>
            <th className={classes.th}>No.</th>
            <th>Full Name</th>
            <th>email</th>
            <th className={classes.th}>Active</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>

      <Pagination mt="md" total={10} position="right" />
    </div>
  )
}

export default UserPage

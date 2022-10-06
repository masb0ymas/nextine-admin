import { Container } from '@mantine/core'
import FooterLayout from './Footer'
import SiderbarLayout from './Sidebar'

function AdminLayout() {
  return (
    <Container my={0} mx={0} py={0} px={0} style={{ maxWidth: '100vw' }}>
      <SiderbarLayout />

      <FooterLayout />
    </Container>
  )
}

export default AdminLayout

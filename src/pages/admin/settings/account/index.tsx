import { NextPageContext } from 'next'
import AccountPage from 'views/Admin/Settings/Account'

export const getServerSideProps = async (ctx: NextPageContext) => ({
  props: {
    query: ctx.query,
  },
})

export default AccountPage

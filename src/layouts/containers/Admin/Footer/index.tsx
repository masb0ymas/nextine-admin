import { Center, Footer } from '@mantine/core'
import { BRAND } from 'config/env'
import React from 'react'

function FooterLayout() {
  const dateNow = new Date()
  const yearNow = dateNow.getFullYear()

  return (
    <Footer height={60} p="md" style={{ fontSize: 14 }}>
      <Center>
        &copy; {`${yearNow} Created By`}&nbsp;
        <b>{BRAND}</b>
      </Center>
    </Footer>
  )
}

export default FooterLayout

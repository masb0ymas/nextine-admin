import React from 'react'
import { ColorSchemeToggle } from '@core/components/ColorSchemeToggle/ColorSchemeToggle'
import { Welcome } from '@core/components/Welcome/Welcome'

function HomePage() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
    </>
  )
}

export default HomePage

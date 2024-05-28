import React, { useState, useEffect } from 'react'
import { Link, useLocation } from '@fs/zion-router'

export default function Navigation() {
  const [selectedTab, setSelectedTab] = useState('Home')

  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === '/') {
      setSelectedTab('Home')
    } else if (pathname === '/vending-machine') {
      setSelectedTab('Vending Machine')
    } else if (pathname === '/dad-jokes') {
      setSelectedTab('Dad Jokes')
    }
  }, [pathname])

  return (
    <nav>
      <NavLink name="Home" path="/" selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <NavLink
        name="Vending Machine"
        path="/vending-machine"
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <NavLink name="Dad Jokes" path="/dad-jokes" selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    </nav>
  )
}

function NavLink({ name, path, selectedTab, setSelectedTab }) {
  return (
    <Link to={path} onClick={() => setSelectedTab(name)}>
      <span is-selected={selectedTab === name}>{name}</span>
    </Link>
  )
}

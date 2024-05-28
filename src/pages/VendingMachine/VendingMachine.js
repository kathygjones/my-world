import React, { useState } from 'react'
import { BillboardButton, BillboardActionChip, Button, H1, H2, Row, Separator } from '@fs/zion-ui'
import { useRouteMatch, Switch, Route } from '@fs/zion-router'
import { i18n } from '@fs/zion-locale'
import { Arrow } from '@fs/zion-icon'

import Background from './Background'
import Product from './Product'

export default function VendingMachine() {
  const { path } = useRouteMatch()

  return (
    <>
      <Separator size="lg" />
      <H1 centered>{i18n.t('VendingMachine.title.snackCentral', 'Welcome to Snack Central!')}</H1>
      <Separator />
      <Switch>
        <Route exact path={path} component={Home} />
        <Route path={`${path}/products`} component={Products} />
      </Switch>
    </>
  )
}

function Home() {
  const { url } = useRouteMatch()
  return (
    <Row alignX="center">
      <BillboardButton centered color="red" to={`${url}/products`}>
        Buy something
      </BillboardButton>
      <Background />
    </Row>
  )
}

function Products() {
  const products = ['soda', 'chips', 'candy', 'gum']
  const { url, path } = useRouteMatch()
  const [selectedChip, setSelectedChip] = useState('')
  return (
    <>
      <H2 centered size="H3">
        {i18n.t('VendingMachine.products.header', 'What do you have a hankering for?')}
      </H2>
      <Separator />
      <Row alignX="center">
        <Button Icon={Arrow} iconDirection="backward" to="/vending-machine">
          {i18n.t('VendingMachine.products.back', 'Back')}
        </Button>
        {products.map((product) => (
          <BillboardActionChip
            color="blue"
            key={product}
            label={i18n.t(`VendingMachine.products.${product}`, product[0].toUpperCase() + product.slice(1))}
            to={`${url}/${product}`}
            emphasis={selectedChip === product ? 'high' : 'low'}
            onClick={() => setSelectedChip(product)}
          />
        ))}
      </Row>
      <Switch>
        <Route path={`${path}/:product`} component={Product} />
      </Switch>
    </>
  )
}

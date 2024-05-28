import React from 'react'
import { useParams } from '@fs/zion-router'
import { H2, Separator } from '@fs/zion-ui'

export default function Product() {
  const { product } = useParams()

  return (
    <>
      <Separator />
      <H2 centered>{product[0].toUpperCase() + product.slice(1)}</H2>
    </>
  )
}

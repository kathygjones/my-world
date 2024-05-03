import React from 'react'
import { LayoutBand, Separator, H5 } from '@fs/zion-ui'

const Banner = ({ message, color }) => (
  <LayoutBand color={color}>
    <Separator />
    <H5 centered>{message}</H5>
    <Separator />
  </LayoutBand>
)

export default React.memo(Banner)

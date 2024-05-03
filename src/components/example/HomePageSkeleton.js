import React from 'react'
import { LayoutBand, Skeleton, useContainerWidth, Separator, FlowGrid } from '@fs/zion-ui'

const HomePageSkeleton = () => {
  // Initiate state variables and hooks
  const atWidth = useContainerWidth()

  return (
    <LayoutBand>
      <Separator size="xxl" />
      <FlowGrid columnCount={atWidth({ md: 2 })}>
        <div>
          <Separator size="xxl" />
          <Skeleton.Image height={300} />
          <Separator size="xxl" />
        </div>
        <Skeleton.Image height={600} />
      </FlowGrid>
      <Separator />
      <FlowGrid columnCount={atWidth({ md: 4 })}>
        <Skeleton.Image height={375} />
        <Skeleton.Image height={375} />
        <Skeleton.Image height={375} />
        <Skeleton.Image height={375} />
      </FlowGrid>
    </LayoutBand>
  )
}

export default HomePageSkeleton
